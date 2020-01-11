import {ArgumentMetadata, HttpException, HttpStatus, Inject, Injectable, PipeTransform} from '@nestjs/common';
import {Article, ArticleDto} from '../dto/article.dto';
import articles from '../../../scripts/fakeData';
import {validate, ValidationError} from 'class-validator';

@Injectable()
export class ArticleValidationPipe implements PipeTransform {
    constructor(@Inject(ArticleDto) private readonly articleDto: ArticleDto) {
    }

    async transform(value: Article, metadata: ArgumentMetadata): Promise<Article> {
        const articleDto = Object.assign(this.articleDto, value);
        const errors: ValidationError[] = await validate(articleDto);
        if (errors.length > 0) {
            throw new HttpException({
                errors: errors.map((error: ValidationError) => {
                    return {
                        field: error.property,
                        message: error.constraints,
                    };
                }),
            }, HttpStatus.BAD_REQUEST);
        }
        return value;
    }
}
