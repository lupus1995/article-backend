import {ValidationArguments, ValidatorConstraint, ValidatorConstraintInterface} from 'class-validator';
import {ArticlesServices} from '../articles.services';
import {EntityManager} from 'typeorm';
import {app} from '../../main';

@ValidatorConstraint({name: 'customText', async: false})
export class CheckArticlePipe implements ValidatorConstraintInterface {

    private readonly articleService: ArticlesServices;

    constructor() {
        this.articleService = app.get(ArticlesServices);
    }

    async validate(articleId: number, validationArguments: ValidationArguments) {
        const article = await this.articleService.articleRepository.findOne({id: articleId});
        return Boolean(article);
    }

    defaultMessage(args: ValidationArguments) {
        return 'Article not exists';
    }
}
