import {Body, Controller, Get, HttpStatus, Param, Post, Query, UseFilters, UseGuards, UsePipes, Headers, Put, Delete} from '@nestjs/common';
import {ArticlesServices} from './articles.services';
import {CommentsValidationPipe} from './pipes/comments-validation.pipe';
import {CommentEntity} from './entities/comment.entity';
import {ArticlesParamsValidationPipe} from './pipes/articles-params-validation.pipe';
import {Comment} from './dto/comment.dto';
import {HttpExceptionFilter} from './filters/http-exception.filter';
import {ExistArticlePipe} from './pipes/exist-article.pipe';
import {TrimCommentPipe} from './pipes/trim-comment.pipe';
import {RefreshGuard} from 'src/auth/guards/refresh.guard';
import {DescriptionPipe} from './pipes/description.pipe';
import {ArticleValidationPipe} from './pipes/article-validation.pipe';
import {AuthService} from '../auth/auth.service';
import {CheckCommentPipe} from './pipes/check-comment.pipe';
import {ArticleEntity} from './entities/article.entity';
import {PaginationArticle} from './documentation/pagination-article.doc';
import {
    ApiBadRequestResponse,
    ApiBearerAuth,
    ApiBody,
    ApiCreatedResponse,
    ApiHeader,
    ApiNotFoundResponse,
    ApiOkResponse, ApiQuery,
    ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import {AuthGuard} from '@nestjs/passport';
import {errorParamsOrExistArticleMessage} from '../ErrorCodes';
import {ArticleDoc} from './documentation/article.doc';
import {Article} from './dto/article.dto';

const defaultLimitArticleAndComments = 5;

@Controller('articles')
export class ArticlesController {
    constructor(
        private readonly articlesServices: ArticlesServices,
        private readonly authService: AuthService,
    ) {
    }

    @Get()
    @ApiBadRequestResponse({
        description: 'Incorrect params offset or limit. Offset and limit must be more 0.',
        links: {
            'http://localhost:3000/articles?limit=sdfsdf': {
                description: 'example error request',
            },
        },
    })
    @ApiOkResponse({
        description: 'Get articles',
    })
    @UsePipes(ArticlesParamsValidationPipe)
    async findAll(@Query() query: PaginationArticle) {
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
    @ApiBearerAuth('auth')
    @ApiHeader({name: 'Authorization', description: 'Auth token', allowEmptyValue: true, required: true})
    @ApiBody({type: ArticleDoc, description: 'Create article'})
    @ApiUnauthorizedResponse({description: 'Unauthorized'})
    @ApiBadRequestResponse({
        description: 'Errors in structure article or in during save article',
    })
    @ApiCreatedResponse({description: 'Created new article'})
    @UseGuards(AuthGuard('jwt'))
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
    @ApiQuery({
        name: 'slug',
        type: 'string',
    })
    @ApiOkResponse({description: 'Get article'})
    @ApiNotFoundResponse({description: errorParamsOrExistArticleMessage})
    @UsePipes(ExistArticlePipe)
    async getArticle(@Param() article: Article) {
        const limit = defaultLimitArticleAndComments;
        const offset = 0;
        const comments: CommentEntity[] = await this.articlesServices.getCommentsFromArticle({
            article,
            limit,
            offset,
            useOffsetAndLimitInSkip: true,
        });
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
    @ApiBearerAuth('auth')
    @ApiHeader({name: 'Authorization', description: 'Auth token', allowEmptyValue: true, required: true})
    @ApiUnauthorizedResponse({description: 'Unauthorized'})
    @ApiBadRequestResponse({
        description: 'Errors in structure article or in during save article',
    })
    @ApiOkResponse({description: 'Update article'})
    @UseGuards(AuthGuard('jwt'))
    async updateArticle(@Body(DescriptionPipe, ArticleValidationPipe) article: ArticleDoc) {
        return await this.articlesServices.updateArticle(article);
    }

    @Delete(':slug')
    @ApiQuery({
        name: 'slug',
        type: 'string',
    })
    @ApiBearerAuth('auth')
    @ApiUnauthorizedResponse({description: 'Unauthorized'})
    @ApiHeader({name: 'Authorization', description: 'Auth token', allowEmptyValue: true, required: true})
    @ApiNotFoundResponse({description: errorParamsOrExistArticleMessage})
    @ApiOkResponse({description: 'Deleted article'})
    @UseGuards(AuthGuard('jwt'))
    async deleteArticle(@Param(ExistArticlePipe) article: ArticleEntity) {
        await this.articlesServices.articleRepository.remove(article);
        return {
            statusCode: HttpStatus.OK,
        };
    }

    @Get(':slug/comments/:page')
    @ApiQuery({
        name: 'offset',
        type: 'number',
        required: false,
    })
    @ApiQuery({
        name: 'page',
        type: 'number',
        required: false,
    })
    @ApiQuery({
        name: 'slug',
        type: 'string',
    })
    @ApiBadRequestResponse({
        description: 'Incorrect params offset or page. Offset and page must be more 0.',
    })
    @ApiNotFoundResponse({description: errorParamsOrExistArticleMessage})
    @ApiOkResponse({description: 'Get comments from article'})
    async getComments(@Param(CommentsValidationPipe, ExistArticlePipe) params: { article: Article, page: number },
                      @Query('offset') offset: number | undefined,
    ) {
        const {page, article} = params;
        const limit = defaultLimitArticleAndComments;
        const useOffsetAndLimitInSkip = Boolean(!offset);
        if (!offset) {
            offset = page - 1;
        }
        const comments: CommentEntity[] = await this.articlesServices.getCommentsFromArticle({
            article,
            offset,
            limit,
            useOffsetAndLimitInSkip,
        });
        const {commentsCount} = article;
        return {
            comments,
            countComments: commentsCount,
            nextPage: page + 1,
            prevPage: useOffsetAndLimitInSkip ? page - 1 : undefined,
            loadMore: useOffsetAndLimitInSkip ? commentsCount - limit * (offset + 1) > 0 : commentsCount - limit - offset > 0,
        };
    }

    @Delete(':slug/comments/:id')
    @ApiQuery({
        name: 'id',
        type: 'number',
    })
    @ApiQuery({
        name: 'slug',
        type: 'string',
    })
    @ApiBearerAuth('auth')
    @ApiUnauthorizedResponse({description: 'Unauthorized'})
    @ApiHeader({name: 'Authorization', description: 'Auth token', allowEmptyValue: true, required: true})
    @ApiNotFoundResponse({description: 'Comment not found'})
    @ApiOkResponse({description: 'Comments deleted'})
    @UseGuards(AuthGuard('jwt'))
    @UsePipes(CheckCommentPipe)
    async deleteComment(@Param() comment: CommentEntity) {
        await this.articlesServices.commentsRepository.delete(comment.id);
        return {
            statusCode: HttpStatus.OK,
        };
    }

    @Post(':slug/comments')
    @UseFilters(HttpExceptionFilter)
    async saveComment(@Param('slug') slug: string, @Body(TrimCommentPipe) data: Comment) {
        const {articleId, comment} = data;
        return await this.articlesServices.saveComment({articleId, comment});
    }
}
