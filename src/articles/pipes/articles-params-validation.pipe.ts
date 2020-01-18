import {ArgumentMetadata, HttpException, HttpStatus, Injectable, PipeTransform} from '@nestjs/common';
import {PaginationArticle} from '../documentation/pagination-article.doc';

@Injectable()
export class ArticlesParamsValidationPipe implements PipeTransform<any> {
    transform(value: PaginationArticle, metadata: ArgumentMetadata): PaginationArticle {
        const {offset = 0, limit = 5} = value;
        if (offset < 0 || limit <= 0) {
            throw new HttpException({
                    statusCode: HttpStatus.BAD_REQUEST,
                    message: 'Incorrect params offset or limit. Offset and limit must be more 0.',
                },
                HttpStatus.BAD_REQUEST);
        }

        return {offset: +offset, limit};
    }
}
