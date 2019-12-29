import {Article} from '../../src/articles/entities/articles.entity';
import {EntityRepository, Repository} from 'typeorm';

@EntityRepository(Article)
export class ArticleRepository extends Repository<Article> {}
