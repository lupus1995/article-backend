import {Injectable} from '@nestjs/common';
import {InjectRepository} from '@nestjs/typeorm';
import {UserEntity} from './entities/user.entity';
import {Repository} from 'typeorm';

@Injectable()
export class UsersService {
    private readonly users: any;
    constructor(
        @InjectRepository(UserEntity)
        public readonly userRepository: Repository<UserEntity>) {
    }
}
