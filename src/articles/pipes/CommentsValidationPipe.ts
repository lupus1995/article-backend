import {ArgumentMetadata, HttpException, HttpStatus, Injectable, PipeTransform} from '@nestjs/common';

@Injectable()
export class CommentsValidationPipe implements PipeTransform<any> {
    transform(value: { slug: string, page: string }, metadata: ArgumentMetadata): { slug: string, page: number } {
        const {page, slug} = value;
        const currentPage = +page <= 0 ? 0 : +page === 1 ? 1 : +page - 1;
        if (+currentPage <= 0) {
            throw new HttpException({code: 2}, HttpStatus.BAD_REQUEST);
        }
        return {slug, page: +page};
    }
}
