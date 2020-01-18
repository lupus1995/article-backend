import {IsNotEmpty, IsNumberString, MaxLength, MinLength, Validate} from 'class-validator';
import {CheckArticleValidator} from '../validators/check-article.validator';
import {errorParamsOrExistArticleMessage} from '../../ErrorCodes';
import {maxLengthMessage, minLengthMessage} from '../constants';
import {ApiProperty} from '@nestjs/swagger';

export class CommentDto {
    @ApiProperty()
    readonly slug: string;
    @ApiProperty()
    @IsNotEmpty()
    @MinLength(5, {message: minLengthMessage('comments')})
    @MaxLength(255, {message: maxLengthMessage('comments')})
    readonly comment: string;
    @ApiProperty()
    @IsNumberString()
    @Validate(CheckArticleValidator, {message: errorParamsOrExistArticleMessage})
    readonly articleId: number;
}

export interface Comment {
    articleId: number;
    comment: string;
    createdAd: string;
}


