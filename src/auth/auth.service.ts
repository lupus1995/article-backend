import {HttpException, HttpStatus, Injectable} from '@nestjs/common';
import {UsersService} from '../users/users.service';
import * as bcrypt from 'bcrypt';
import {JwtService} from '@nestjs/jwt';
import {User} from '../users/entities/user.entity';
import {errorAuth} from '../ErrorCodes';

@Injectable()
export class AuthService {
    constructor(
        private readonly usersService: UsersService,
        private readonly jwtService: JwtService,
    ) {
    }

    async validateUser(email: string, pass: string): Promise<User|null> {
        const user = await this.usersService.userRepository.findOne({email});
        if (!user) {
            throw new HttpException({code: errorAuth}, HttpStatus.BAD_REQUEST);
        }
        const checkUser = await bcrypt.compare(pass, user.password);
        if (checkUser) {
            return user;
        }
        return null;
    }

    async login(user: User) {
        const payload = { email: user.email, sub: user.id };
        return {
            access_token: this.jwtService.sign(payload),
        };
    }
}
