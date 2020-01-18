import {ApiProperty} from '@nestjs/swagger';

export class TokenDoc {
    @ApiProperty()
    token: string;
}
