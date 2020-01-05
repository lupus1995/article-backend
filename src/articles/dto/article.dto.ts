import {CommentEntity} from '../entities/comment.entity';

export class ArticleDto {
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
