import {IsNotEmpty, IsNumberString, MaxLength, MinLength, Validate} from 'class-validator';
import {CheckArticlePipe} from '../pipes/CheckArticlePipe';

export class CommentDto {
    readonly slug: string;
    @IsNotEmpty()
    @MinLength(5)
    @MaxLength(255)
    readonly comment: string;
    @IsNumberString()
    @Validate(CheckArticlePipe, {message: '3'})
    readonly articleId: number;
}

export interface Comment {
    articleId: number;
    comment: string;
    createdAd: string;
}
