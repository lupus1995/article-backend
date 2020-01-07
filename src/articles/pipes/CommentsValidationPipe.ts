import {ArgumentMetadata, HttpException, HttpStatus, Injectable, PipeTransform} from '@nestjs/common';
import {errorParamsOrExistArticle} from '../../ErrorCodes';

@Injectable()
export class CommentsValidationPipe implements PipeTransform<any> {
    transform(value: { slug: string, page: string }, metadata: ArgumentMetadata): { slug: string, page: number } {
        const {page, slug} = value;
        const currentPage = +page <= 0 ? 0 : +page === 1 ? 1 : +page - 1;
        if (+currentPage <= 0) {
            throw new HttpException({
                    code: errorParamsOrExistArticle,
                    message: 'Incorrect param page. Param page must be more or equal 0',
                },
                HttpStatus.BAD_REQUEST);
        }
        return {slug, page: +page};
    }
}
