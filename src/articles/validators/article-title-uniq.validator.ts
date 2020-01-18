import {ValidationArguments, ValidatorConstraint} from 'class-validator';
import {app} from '../../main';
import {ArticlesServices} from '../articles.services';
import {ArticleDto} from '../dto/article.dto';
import {ArticleEntity} from '../entities/article.entity';

@ValidatorConstraint({name: 'customText', async: false})
export class ArticleTitleUniq {
    private readonly articleService: ArticlesServices;
    private readonly data: ArticleDto;

    constructor() {
        this.data = app.get(ArticleDto);
        this.articleService = app.get(ArticlesServices);
    }

    async validate(title: string, validationArguments: ValidationArguments) {
        let request: [ArticleEntity[], number];
        if (this.data.id) {
            request = await this.articleService.articleRepository.findAndCount({
                where: {
                    title, id: `Not(${this.data.id})`,
                },
            });
            console.log(request);
        } else {
            request = await this.articleService.articleRepository.findAndCount({title});
        }
        const [articles, countArticles] = request;
        return countArticles === 0;
    }

    defaultMessage(args: ValidationArguments) {
        return 'The title is not unique';
    }
}
