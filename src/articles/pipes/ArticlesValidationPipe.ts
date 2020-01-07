import {ArgumentMetadata, HttpException, HttpStatus, Injectable, PipeTransform} from '@nestjs/common';
import {PaginationInterface} from '../articles.controller';
import {errorParamsOrExistArticle, errorParamsOrExistArticleMessage} from '../../ErrorCodes';

@Injectable()
export class ArticlesValidationPipe implements PipeTransform<any> {
    transform(value: PaginationInterface, metadata: ArgumentMetadata): PaginationInterface {
        const {offset = 0, limit = 5} = value;
        if (offset < 0 || limit <= 0) {
            throw new HttpException({
                code: errorParamsOrExistArticle,
                message: 'Incorrect params offset or limit. Offset and limit must be more 0.'},
                HttpStatus.BAD_REQUEST);
        }

        return {offset: +offset, limit};
    }
}
