import {ApiProperty} from '@nestjs/swagger';

export class PaginationArticle {
    @ApiProperty({ required: false })
    limit: number;
    @ApiProperty({ required: false })
    offset: number;
}
