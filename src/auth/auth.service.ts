import {Injectable} from '@nestjs/common';
import {UsersService} from '../users/users.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
    constructor(private readonly usersService: UsersService) {
    }

    async validateUser(username: string, pass: string): Promise<any> {
        const user = await this.usersService.findOne(username);
        if (user && user.password === pass) {
            const { password, ...result } = user;
            return result;
        }
        return null;
    }

    // async validateUser(email: string, pass: string): Promise<any> {
    //     const user = await this.usersService.userRepository.findOne(email);
    //     const checkUser = await bcrypt.compare(pass, user.password);
    //     if (checkUser) {
    //         return user;
    //     }
    //     return null;
    // }
}
