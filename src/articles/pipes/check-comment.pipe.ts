import {Injectable, PipeTransform, ArgumentMetadata, Inject, HttpException, HttpStatus} from '@nestjs/common';
import {ArticlesServices} from '../articles.services';
import {CommentEntity} from '../entities/comment.entity';

@Injectable()
export class CheckCommentPipe implements PipeTransform {
    constructor(@Inject(ArticlesServices) private articlesServices: ArticlesServices) {}

    async transform(value: { slug: string, id: string }, metadata: ArgumentMetadata): Promise<CommentEntity> {
        const {id} = value;

        const comment = await this.articlesServices.commentsRepository.findOne(Number(id));

        if (!comment) {
            throw new HttpException({
                    statusCode: HttpStatus.BAD_REQUEST,
                    message: 'Comment not found',
                },
                HttpStatus.BAD_REQUEST);
        }

        return comment;
    }
}
