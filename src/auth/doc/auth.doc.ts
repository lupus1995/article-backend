import {ApiProperty} from '@nestjs/swagger';

export class AuthDoc {
    @ApiProperty()
    email: string;
    @ApiProperty()
    password: string;
}
