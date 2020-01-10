import {ArgumentMetadata, Injectable, PipeTransform} from '@nestjs/common';
import {UsersService} from '../../users/users.service';
import {app} from '../../main';

@Injectable()
export class Login implements PipeTransform {
    private readonly usersService: UsersService;

    constructor() {
        this.usersService = app.get(UsersService);
    }

    transform(value: { email: string, password: string }, metadata: ArgumentMetadata): any {
        const {email, password} = value;
        const user = this.usersService.userRepository.findOne({email});
        console.log(user);
        return value;
    }
}
