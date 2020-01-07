import {IsNotEmpty, IsNumberString, MaxLength, MinLength, Validate} from 'class-validator';
import {CheckArticlePipe} from '../pipes/CheckArticlePipe';
import {errorParamsOrExistArticle, errorParamsOrExistArticleMessage} from '../../ErrorCodes';

export class CommentDto {
    readonly slug: string;
    @IsNotEmpty()
    @MinLength(5, {message: 'The comment is short. Minimum 5 characters'})
    @MaxLength(255, {message: 'The comment is long. The maximum number of characters is 255'})
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
