import {Body, Controller, Get, Param, Post, Query, UseFilters, UsePipes} from '@nestjs/common';
import {ArticlesServices} from './articles.services';
import {CommentsValidationPipe} from './pipes/CommentsValidationPipe';
import {Article} from './dto/article.dto';
import {CommentEntity} from './entities/comment.entity';
import {ArticlesValidationPipe} from './pipes/ArticlesValidationPipe';
import {CommentDto} from './dto/comment.dto';
import {HttpExceptionFilter} from './http-exception.filter';
import {ExistArticlePipe} from './pipes/ExistArticlePipe';

export interface PaginationInterface {
    limit: number;
    offset: number;
}

const defaultLimitArticleAndComments = 5;

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
    @UsePipes(ExistArticlePipe)
    async getArticle(@Param() article: Article) {
        const limit = defaultLimitArticleAndComments;
        const offset = 0;
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
    @UsePipes(CommentsValidationPipe, ExistArticlePipe)
    async getComments(@Param() params: { article: Article, page: number }) {
        const {page, article} = params;
        const limit = defaultLimitArticleAndComments;
        const offset = page - 1;
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
    @UseFilters(HttpExceptionFilter)
    async saveComment(@Param('slug') slug: string, @Body() data: CommentDto) {
        const {articleId, comment} = data;
        return await this.articlesServices.saveComment({articleId, comment});
    }
}
