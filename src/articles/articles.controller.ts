import {BadRequestException, Controller, Get, Param, Query, UsePipes} from '@nestjs/common';
import {ArticlesServices} from './articles.services';
import {CommentsPageValidationPipe} from './pipes/CommentsPageValidationPipe';
import {Article} from './dto/article.dto';
import {CommentEntity} from './entities/comment.entity';

interface PaginationInterface {
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
    async findAll(@Query() query: PaginationInterface) {
        const {limit = 5, offset = 0} = query;
        const [articles, countArticles] = await Promise.all([
            this.articlesServices.articleRepository
                .createQueryBuilder('articles')
                .take(limit)
                .skip(offset * limit)
                .loadRelationCountAndMap('articles.commentsCount', 'articles.comments')
                .getMany(),
            this.articlesServices.articleRepository.createQueryBuilder('alias').getCount(),
        ]);

        return {articles, countArticles, prevPage: +offset, nextPage: +offset + 1, loadMore: countArticles - (offset * limit) > 0};
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
    @UsePipes(CommentsPageValidationPipe)
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
}
