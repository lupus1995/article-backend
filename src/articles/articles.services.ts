import {Injectable} from '@nestjs/common';
import {InjectRepository} from '@nestjs/typeorm';
import {ArticleEntity} from './entities/article.entity';
import {CommentEntity} from './entities/comment.entity';
import {Repository, UpdateResult} from 'typeorm';
import {Article, ArticleDto} from './dto/article.dto';
import {Comment} from './dto/comment.dto';
import moment = require('moment');
import slugify from 'slugify';

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
            .orderBy({id: 'DESC'})
            .skip(offset === 0 ? offset : (offset - 1) * limit)
            .loadRelationCountAndMap('articles.commentsCount', 'articles.comments')
            .getMany();
    }

    async getCommentsFromArticle({
                                     article,
                                     limit = 5,
                                     offset,
                                     useOffsetAndLimitInSkip,
                                 }: {
        article: Article,
        limit: number,
        offset: number,
        useOffsetAndLimitInSkip: boolean,
    }): Promise<CommentEntity[]> {
        return await this.commentsRepository.find({
            order: {
                id: 'DESC',
            },
            take: limit,
            skip: useOffsetAndLimitInSkip ? offset * limit : offset,
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

    async saveArticle(data: ArticleDto): Promise<Article | undefined> {
        const time = moment(new Date()).format('YYYY-MM-DD HH:mm:ss');
        const {title, article, description, authorId} = data;
        const slug: string = slugify(title);
        const createdAd = time;
        const updatedAt = time;
        const newArticle: Article = {title, article, description, authorId, slug, createdAd, updatedAt};
        return await this.articleRepository.save(newArticle);
    }

    async updateArticle(data: ArticleDto): Promise<UpdateResult> {
        const time = moment(new Date()).format('YYYY-MM-DD HH:mm:ss');
        const {title, article: dataArticle, description, authorId, id} = data;
        const article = await this.articleRepository.findOne(id);
        article.slug = slugify(title);
        article.updatedAt = time;
        article.title = title;
        article.article = dataArticle;
        article.description = description;
        article.authorId = authorId;
        return await this.articleRepository.update(id, article);
    }

}
