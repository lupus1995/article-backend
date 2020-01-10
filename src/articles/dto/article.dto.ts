import {CommentEntity} from '../entities/comment.entity';
import {IsNotEmpty, IsOptional, MaxLength, MinLength, ValidateIf} from 'class-validator';
import {maxLengthMessage, minLengthMessage} from '../constants';

export class ArticleDto {
    @IsNotEmpty()
    @MinLength(5, {message: minLengthMessage('title')})
    @MaxLength(255, {message: maxLengthMessage('title')})
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
