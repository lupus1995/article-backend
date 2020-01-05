import {ArticleEntity} from '../entities/article.entity';

export interface Comment {
    id?: number;
    articleId: number;
    comment: string;
    createdAd: string;
    article?: ArticleEntity;
}
