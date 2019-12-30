import {Module} from '@nestjs/common';
import {AuthService} from './auth.service';
import {UsersModule} from '../users/users.module';
import {PassportModule} from '@nestjs/passport';
import {LocalStrategy} from './local.strategy';
import {User} from '../users/entities/user.entity';
import {TypeOrmModule} from '@nestjs/typeorm';

@Module({
    imports: [UsersModule, PassportModule],
    providers: [AuthService, LocalStrategy],
})
export class AuthModule {
}
