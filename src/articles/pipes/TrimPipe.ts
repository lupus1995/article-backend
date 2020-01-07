import {ArgumentMetadata, Injectable, PipeTransform} from '@nestjs/common';
import {CommentDto} from '../dto/comment.dto';

@Injectable()
export class TrimPipe implements PipeTransform {
    whitelist = true;

    transform(value: CommentDto, metadata: ArgumentMetadata): CommentDto {
        const {comment} = value;
        return {...value, comment: comment.trim()};
    }
}
