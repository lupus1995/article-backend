import {ArgumentMetadata, HttpException, HttpStatus, Inject, Injectable, PipeTransform} from '@nestjs/common';
import {Article, ArticleDto} from '../dto/article.dto';
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

        const author = await this.authService.usersService.userRepository.findOne({id: value.authorId});

        if (!author) {
            throw new HttpException('User not found', HttpStatus.BAD_REQUEST);
        }

        return {...value, description};
    }
}
