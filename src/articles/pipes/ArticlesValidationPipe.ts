import {ArgumentMetadata, HttpException, HttpStatus, Injectable, PipeTransform} from '@nestjs/common';
import {PaginationInterface} from '../articles.controller';

@Injectable()
export class ArticlesValidationPipe implements PipeTransform<any> {
    transform(value: PaginationInterface, metadata: ArgumentMetadata): PaginationInterface {
        const {offset = 0, limit = 5} = value;
        if (offset < 0 || limit <= 0) {
            throw new HttpException({code: 2}, HttpStatus.BAD_REQUEST);
        }

        return {offset: +offset, limit};
    }
}
