import {ArgumentMetadata, BadRequestException, HttpStatus, Inject, Injectable, NotFoundException, PipeTransform} from '@nestjs/common';
import {ArticlesServices} from '../articles.services';
import {errorParamsOrExistArticleMessage} from '../../ErrorCodes';
import {ArticleEntity} from '../entities/article.entity';
import {Article} from '../dto/article.dto';

@Injectable()
export class ExistArticlePipe implements PipeTransform {
    constructor(
        @Inject(ArticlesServices) private readonly articlesServices: ArticlesServices,
    ) {
    }

    async transform(value: { slug: string, page: number | undefined },
                    metadata: ArgumentMetadata): Promise<Article | { article: Article, page: number }> {
        const {slug, page} = value;
        const article: ArticleEntity = await this.articlesServices.articleRepository
            .createQueryBuilder('articles')
            .where('articles.slug = :slug', {slug})
            .loadRelationCountAndMap('articles.commentsCount', 'articles.comments')
            .getOne();
        if (!article) {
            throw new NotFoundException({statusCode: HttpStatus.NOT_FOUND, message: errorParamsOrExistArticleMessage});
        }
        return page ? {article, page} : article;
    }
}
