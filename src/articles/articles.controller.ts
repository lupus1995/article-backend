import {Body, Controller, Get, HttpStatus, Param, Post, Query, UseFilters, UseGuards, UsePipes, Headers, Put, Delete} from '@nestjs/common';
import {ArticlesServices} from './articles.services';
import {CommentsValidationPipe} from './pipes/comments-validation.pipe';
import {Article, ArticleDto} from './dto/article.dto';
import {CommentEntity} from './entities/comment.entity';
import {ArticlesParamsValidationPipe} from './pipes/articles-params-validation.pipe';
import {CommentDto} from './dto/comment.dto';
import {HttpExceptionFilter} from './filters/http-exception.filter';
import {ExistArticlePipe} from './pipes/exist-article.pipe';
import {TrimCommentPipe} from './pipes/trim-comment.pipe';
import {RefreshGuard} from 'src/auth/guards/refresh.guard';
import {DescriptionPipe} from './pipes/description.pipe';
import {ArticleValidationPipe} from './pipes/article-validation.pipe';
import {AuthService} from '../auth/auth.service';
import {CheckCommentPipe} from './pipes/check-comment.pipe';
import {ArticleEntity} from './entities/article.entity';

export interface PaginationInterface {
    limit: number;
    offset: number;
}

const defaultLimitArticleAndComments = 5;

@Controller('articles')
export class ArticlesController {
    constructor(
        private readonly articlesServices: ArticlesServices,
        private readonly authService: AuthService,
    ) {
    }

    @Get()
    @UsePipes(ArticlesParamsValidationPipe)
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

    @Post()
    @UseGuards(RefreshGuard)
    async createArticle(@Body(DescriptionPipe, ArticleValidationPipe) article: Article) {
        try {
            await this.articlesServices.saveArticle(article);
            const user = await this.authService.usersService.userRepository.findOne({id: article.authorId});
            await this.authService.jwtService.sign(user);
            return {
                statusCode: HttpStatus.CREATED,
            };
        } catch (e) {
            return {
                statusCode: HttpStatus.BAD_REQUEST,
                message: e.message,
            };
        }
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

    @Put(':slug')
    @UseGuards(RefreshGuard)
    async updateArticle(@Body(DescriptionPipe, ArticleValidationPipe) article: Article) {
        return await this.articlesServices.updateArticle(article);
    }

    @Delete(':slug')
    @UseGuards(RefreshGuard)
    async deleteArticle(@Param(ExistArticlePipe) article: ArticleEntity) {
        await this.articlesServices.articleRepository.remove(article);
        return {
            statusCode: HttpStatus.OK,
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

    @Delete(':slug/comments/:id')
    @UseGuards(RefreshGuard)
    @UsePipes(CheckCommentPipe)
    async deleteComment(@Param() comment: CommentEntity) {
        await this.articlesServices.commentsRepository.delete(comment.id);
        return {
            statusCode: HttpStatus.OK,
        };
    }

    @Post(':slug/comments')
    @UseFilters(HttpExceptionFilter)
    async saveComment(@Param('slug') slug: string, @Body(TrimCommentPipe) data: CommentDto) {
        const {articleId, comment} = data;
        return await this.articlesServices.saveComment({articleId, comment});
    }
}
