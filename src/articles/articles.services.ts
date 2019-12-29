import {Injectable} from '@nestjs/common';
import {InjectRepository} from '@nestjs/typeorm';
import {Article} from './entities/article.entity';
import {Repository} from 'typeorm';

@Injectable()
export class ArticlesServices {
    constructor(@InjectRepository(Article)
                readonly articleRepository: Repository<Article>) {
    }

}
