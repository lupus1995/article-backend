import {ValidationArguments, ValidatorConstraint} from 'class-validator';
import {app} from '../../main';
import {ArticlesServices} from '../articles.services';

@ValidatorConstraint({name: 'customText', async: false})
export class ArticleTitleUniq {
    private readonly articleService: ArticlesServices;

    constructor() {
        this.articleService = app.get(ArticlesServices);
    }

    async validate(title: string, validationArguments: ValidationArguments) {
        const request = await this.articleService.articleRepository.findAndCount({title});
        const [articles, countArticles] = request;
        return countArticles === 0;
    }

    defaultMessage(args: ValidationArguments) {
        return 'The title is not unique';
    }
}
