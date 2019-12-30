import {Controller, Get, Post, UseGuards, Request} from '@nestjs/common';
import {AppService} from './app.service';
import {AuthGuard} from '@nestjs/passport';

@Controller()
export class AppController {
    constructor(private readonly appService: AppService) {
    }

    @UseGuards(AuthGuard('local'))
    @Post('auth/login')
    async login(@Request() req) {
        console.log(888888);
        return req.user;
    }
}
