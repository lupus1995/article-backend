// import {Injectable, UnauthorizedException} from '@nestjs/common';
// import {PassportStrategy} from '@nestjs/passport';
// import {Strategy} from 'passport-local';
// import {AuthService} from './auth.service';
//
// @Injectable()
// export class LocalStrategy extends PassportStrategy(Strategy) {
//     constructor(
//         private readonly authService: AuthService,
//     ) {
//         super();
//     }
//
//     async validate(email: string, password: string): Promise<any> {
//         console.log(5555555);
//         const user = await this.authService.validateUser(email, password);
//         // if (!user) {
//         //     throw new UnauthorizedException();
//         // }
//         return user;
//     }
//
// }

import {Strategy} from 'passport-local';
import {PassportStrategy} from '@nestjs/passport';
import {Injectable, UnauthorizedException} from '@nestjs/common';
import {AuthService} from './auth.service';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
    constructor(private readonly authService: AuthService) {
        super();
    }

    async validate(username: string, password: string): Promise<any> {
        console.log(5555555, username, password);
        const user = await this.authService.validateUser(username, password);
        if (!user) {
            throw new UnauthorizedException();
        }
        return user;
    }
}
