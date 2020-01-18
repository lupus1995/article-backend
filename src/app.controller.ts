import {Controller, Get, Post, UseGuards, Request, Body, Headers} from '@nestjs/common';
import {AppService} from './app.service';
import {AuthGuard} from '@nestjs/passport';
import {AuthService} from './auth/auth.service';
import {ApiBadRequestResponse, ApiBearerAuth, ApiBody, ApiCreatedResponse, ApiHeader, ApiOkResponse, ApiUnauthorizedResponse} from '@nestjs/swagger';
import {AuthDoc} from './auth/doc/auth.doc';
import {errorAuthMessage} from './ErrorCodes';
import {TokenDoc} from './auth/doc/token.doc';

@Controller()
export class AppController {
    constructor(
        private readonly appService: AppService,
        private readonly authService: AuthService,
    ) {
    }

    @UseGuards(AuthGuard('local'))
    @Post('auth/login')
    @ApiBody({type: AuthDoc, description: 'Login'})
    @ApiBadRequestResponse({
        description: errorAuthMessage,
    })
    @ApiUnauthorizedResponse({description: 'Unauthorized'})
    @ApiCreatedResponse({description: 'Response token'})
    async login(@Request() req) {
        const login = await this.authService.login(req.user);
        return {user: req.user, login};
    }

    @ApiUnauthorizedResponse({description: 'Unauthorized'})
    @ApiBearerAuth('auth')
    @ApiHeader({name: 'Authorization', description: 'Auth token', allowEmptyValue: true, required: true})
    @ApiOkResponse({description: 'Get data about user'})
    @UseGuards(AuthGuard('jwt'))
    @Get('profile')
    getProfile(@Request() req) {
        return req.user;
    }

    @Post('refresh-token')
    @ApiBearerAuth('auth')
    @ApiHeader({name: 'Authorization', description: 'Auth token', allowEmptyValue: true, required: true})
    @ApiUnauthorizedResponse({description: 'Unauthorized'})
    @ApiCreatedResponse({description: 'Example for update token user'})
    @UseGuards(AuthGuard('jwt'))
    @ApiBody({type: TokenDoc, description: 'Class from documentation for description field in body request'})
    async refreshToken(@Body('token') token: string) {
        const decode: any = this.authService.jwtService.decode(token);
        const user = await this.authService.getUserByEmail(decode.email);
        const login = await this.authService.login(user);
        return {user, login};
    }
}
