import {Injectable} from '@nestjs/common';
import {InjectRepository} from '@nestjs/typeorm';
import {User} from './entities/user.entity';
import {Repository} from 'typeorm';

@Injectable()
export class UsersService {
    private readonly users: any;
    constructor(
        @InjectRepository(User)
        public readonly userRepository: Repository<User>) {
    }
}
