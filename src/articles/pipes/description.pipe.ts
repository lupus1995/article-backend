import {ArgumentMetadata, Inject, Injectable, PipeTransform} from '@nestjs/common';
import {ArticleDto} from '../dto/article.dto';
import {AuthService} from '../../auth/auth.service';

@Injectable()
export class DescriptionPipe implements PipeTransform {
    constructor(
        @Inject('AuthService') private readonly authService: AuthService,
    ) {
    }

    async transform(value: ArticleDto, metadata: ArgumentMetadata): Promise<any> {
        let {description} = value;
        const {article} = value;
        if (!description) {
            description = article.substring(0, 60);
        }

        return {...value, description};
    }
}
