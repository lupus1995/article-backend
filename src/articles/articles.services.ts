import {Injectable} from '@nestjs/common';
import {InjectRepository} from '@nestjs/typeorm';
import {ArticleEntity} from './entities/article.entity';
import {CommentEntity} from './entities/comment.entity';
import {Repository} from 'typeorm';
import {Article} from './dto/article.dto';
import {Comment} from './dto/comment.dto';
import moment = require('moment');

@Injectable()
export class ArticlesServices {
    constructor(
        @InjectRepository(ArticleEntity)
        readonly articleRepository: Repository<ArticleEntity>,
        @InjectRepository(CommentEntity)
        readonly commentsRepository: Repository<CommentEntity>) {
    }

    getArticles({limit, offset}: { limit: number, offset: number }): Promise<Article[]> {
        return this.articleRepository
            .createQueryBuilder('articles')
            .select(['articles.id', 'articles.slug', 'articles.title', 'articles.description'])
            .take(limit)
            .skip(offset === 0 ? offset : (offset - 1) * limit)
            .loadRelationCountAndMap('articles.commentsCount', 'articles.comments')
            .getMany();
    }

    async getCommentsFromArticle({
                                     article,
                                     limit = 5,
                                     offset = 0,
                                 }: {
        article: Article,
        limit: number,
        offset: number,
    }): Promise<CommentEntity[]> {
        return await this.commentsRepository.find({
            order: {
                id: 'DESC',
            },
            take: limit,
            skip: offset * limit,
            where: {articleId: article.id},
        });
    }

    async saveComment({articleId, comment}: { articleId: number, comment: string }): Promise<CommentEntity> {
        const newComment: Comment = {
            articleId,
            comment,
            createdAd: moment(new Date()).format('YYYY-MM-DD HH:mm:ss'),
        };
        return await this.commentsRepository.save(newComment);
    }

}
