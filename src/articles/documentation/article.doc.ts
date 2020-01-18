import {ApiProperty} from '@nestjs/swagger';

export class ArticleDoc {
    @ApiProperty()
    title: string;
    @ApiProperty()
    article: string;
    @ApiProperty({ required: false })
    description: string;
    @ApiProperty()
    authorId: number;
}
