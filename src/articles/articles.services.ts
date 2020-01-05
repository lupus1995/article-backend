import {BadRequestException, Injectable} from '@nestjs/common';
import {InjectRepository} from '@nestjs/typeorm';
import {ArticleEntity} from './entities/article.entity';
import {CommentEntity} from './entities/comment.entity';
import {Repository} from 'typeorm';
import {Article} from './dto/article.dto';

@Injectable()
export class ArticlesServices {
    constructor(
        @InjectRepository(ArticleEntity)
        readonly articleRepository: Repository<ArticleEntity>,
        @InjectRepository(CommentEntity)
        readonly commentsRepository: Repository<CommentEntity>) {
    }

    async getArticle({slug}: { slug: string }): Promise<Article> {
        const article = await this.articleRepository
            .createQueryBuilder('articles')
            .where('articles.slug = :slug', {slug})
            .loadRelationCountAndMap('articles.commentsCount', 'articles.comments')
            .getOne();

        if (!article) {
            throw new BadRequestException({code: 3});
        }

        return article;
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
            take: limit,
            skip: offset * limit,
            where: {articleId: article.id},
        });
    }

}
