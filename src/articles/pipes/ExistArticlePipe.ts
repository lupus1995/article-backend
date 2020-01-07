import {ArgumentMetadata, BadRequestException, Inject, Injectable, PipeTransform} from '@nestjs/common';
import {ArticlesServices} from '../articles.services';
import {Article} from '../dto/article.dto';
import {errorParamsOrExistArticle, errorParamsOrExistArticleMessage} from '../../ErrorCodes';

@Injectable()
export class ExistArticlePipe implements PipeTransform {
    constructor(
        @Inject(ArticlesServices) private readonly articlesServices: ArticlesServices,
    ) {
    }

    async transform(value: { slug: string, page: number | undefined },
                    metadata: ArgumentMetadata): Promise<Article | { article: Article, page: number }> {
        const {slug, page} = value;
        const article: Article = await this.articlesServices.articleRepository.findOne({slug});
        if (!article) {
            throw new BadRequestException({code: errorParamsOrExistArticle, message: errorParamsOrExistArticleMessage});
        }
        return page ? {article, page} : article;
    }
}
