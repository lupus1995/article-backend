import {CommentEntity} from '../entities/comment.entity';
import {IsNotEmpty, IsNumber, IsNumberString, IsOptional, MaxLength, MinLength, Validate} from 'class-validator';
import {maxLengthMessage, minLengthMessage} from '../constants';
import {CheckAuthorValidator} from '../validators/check-author.validator';
import {ArticleTitleUniq} from '../validators/article-title-uniq.validator';

export class ArticleDto {
    id?: number;
    @IsNotEmpty()
    @IsNumber()
    @Validate(CheckAuthorValidator, {message: 'User not found'})
    authorId: number;
    @IsNotEmpty()
    @MinLength(5, {message: minLengthMessage('title')})
    @MaxLength(255, {message: maxLengthMessage('title')})
    @Validate(ArticleTitleUniq, {message: 'The title is not unique'})
    title: string;
    @IsNotEmpty()
    @MinLength(5, {message: minLengthMessage('article')})
    @MaxLength(255, {message: maxLengthMessage('article')})
    article: string;
    @IsOptional()
    @MinLength(5, {message: minLengthMessage('description')})
    @MaxLength(255, {message: maxLengthMessage('description')})
    description: string;
}

export interface Article {
    id?: number;
    title: string;
    article: string;
    description: string;
    slug: string;
    authorId: number;
    createdAd?: string;
    updatedAt?: string;
    comments?: CommentEntity[];
    commentsCount?: number;
    articleCount?: number;
}
