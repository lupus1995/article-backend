import {Column} from 'typeorm';

export class CommentDto {
    readonly slug: string;
    readonly comment: string;
    readonly articleId: number;
}

export interface Comment {
    articleId: number;
    comment: string;
    createdAd: string,
}
