import {Body, Controller, Get, Param, Post, Query, UsePipes} from '@nestjs/common';
import {ArticlesServices} from './articles.services';
import {CommentsValidationPipe} from './pipes/CommentsValidationPipe';
import {Article} from './dto/article.dto';
import {CommentEntity} from './entities/comment.entity';
import {ArticlesValidationPipe} from './pipes/ArticlesValidationPipe';
import {CommentDto, Comment} from './dto/comment.dto';
import moment = require('moment');

export interface PaginationInterface {
    limit: number;
    offset: number;
}

@Controller('articles')
export class ArticlesController {
    constructor(
        private readonly articlesServices: ArticlesServices,
    ) {
    }

    @Get()
    @UsePipes(ArticlesValidationPipe)
    async findAll(@Query() query: PaginationInterface) {
        const {limit, offset} = query;
        const [articles, countArticles] = await Promise.all([
            this.articlesServices.getArticles({limit, offset}),
            this.articlesServices.articleRepository.createQueryBuilder('alias').getCount(),
        ]);

        return {
            articles,
            countArticles,
            prevPage: offset === 0 ? offset : offset - 1,
            nextPage: +offset + 1,
            loadMore: countArticles - (+offset * limit) > 0,
        };
    }

    @Get(':slug')
    async getArticle(@Param('slug') slug: string) {
        const limit = 5;
        const offset = 0;
        const article: Article = await this.articlesServices.getArticle({slug});
        const comments: CommentEntity[] = await this.articlesServices.getCommentsFromArticle({article, limit, offset});
        const {commentsCount} = article;
        return {
            article, comments: {
                comments,
                countComments: commentsCount,
                nextPage: 2,
                loadMore: commentsCount - limit * offset > 0,
            },
        };
    }

    @Get(':slug/comments/:page')
    @UsePipes(CommentsValidationPipe)
    async getComments(@Param() params: { slug: string, page: number }) {
        const {slug, page} = params;
        const limit = 5;
        const offset = page - 1;
        const article = await this.articlesServices.getArticle({slug});
        const comments: CommentEntity[] = await this.articlesServices.getCommentsFromArticle({article, offset, limit});
        const {commentsCount} = article;
        return {
            comments,
            countComments: commentsCount,
            nextPage: page + 1,
            prevPage: page - 1,
            loadMore: commentsCount - limit * (offset + 1) > 0,
        };
    }

    @Post(':slug/comments')
    async saveComment(@Param('slug') slug: string, @Body() data: CommentDto) {
        const {articleId, comment} = data;
        try {
            return await this.articlesServices.saveComment({articleId, comment});
        } catch (e) {
            console.log(e);
        }
    }
}
