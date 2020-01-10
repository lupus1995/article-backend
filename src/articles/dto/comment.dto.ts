import {IsNotEmpty, IsNumberString, MaxLength, MinLength, Validate} from 'class-validator';
import {CheckArticlePipe} from '../pipes/CheckArticlePipe';
import {errorParamsOrExistArticleMessage} from '../../ErrorCodes';
import {maxLengthMessage, minLengthMessage} from '../constants';

export class CommentDto {
    readonly slug: string;
    @IsNotEmpty()
    @MinLength(5, {message: minLengthMessage('comments')})
    @MaxLength(255, {message: maxLengthMessage('comments')})
    readonly comment: string;
    @IsNumberString()
    @Validate(CheckArticlePipe, {message: errorParamsOrExistArticleMessage})
    readonly articleId: number;
}

export interface Comment {
    articleId: number;
    comment: string;
    createdAd: string;
}
