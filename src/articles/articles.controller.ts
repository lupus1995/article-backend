import {Controller, Get, Query, Req} from '@nestjs/common';
import {Request} from 'express';
import {ArticlesServices} from './articles.services';
import {count} from 'rxjs/operators';

interface PaginationInterface {
    limit: number;
    offset: number;
}

@Controller('articles')
export class ArticlesController {
    constructor(private readonly articlesServices: ArticlesServices) {
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
}
