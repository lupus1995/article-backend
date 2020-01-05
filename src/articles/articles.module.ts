import {Module} from '@nestjs/common';
import {TypeOrmModule} from '@nestjs/typeorm';
import {ArticleEntity} from './entities/article.entity';
import {ArticlesServices} from './articles.services';
import {ArticlesController} from './articles.controller';
import {CommentEntity} from './entities/comment.entity';

@Module({
    imports: [TypeOrmModule.forFeature([ArticleEntity, CommentEntity])],
    providers: [ArticlesServices],
    controllers: [ArticlesController],
})
export class ArticlesModule {
}
