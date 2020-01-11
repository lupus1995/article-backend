import {Controller, Get, Post, UseGuards, Request, Body, Headers} from '@nestjs/common';
import {AppService} from './app.service';
import {AuthGuard} from '@nestjs/passport';
import {AuthService} from './auth/auth.service';

@Controller()
export class AppController {
    constructor(
        private readonly appService: AppService,
        private readonly authService: AuthService,
    ) {
    }

    @UseGuards(AuthGuard('local'))
    @Post('auth/login')
    async login(@Request() req) {
        const login = await this.authService.login(req.user);
        return {user: req.user, login};
    }

    @UseGuards(AuthGuard('jwt'))
    @Get('profile')
    getProfile(@Request() req) {
        return req.user;
    }

    @Post('refresh-token')
    @UseGuards(AuthGuard('jwt'))
    async refreshToken(@Body('token') token: string) {
        const decode: any = this.authService.jwtService.decode(token);
        const user = await this.authService.getUserByEmail(decode.email);
        const login = await this.authService.login(user);
        return {user, login};
    }
}
