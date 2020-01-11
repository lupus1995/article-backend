import {Module} from '@nestjs/common';
import {TypeOrmModule} from '@nestjs/typeorm';
import {ArticleEntity} from './entities/article.entity';
import {ArticlesServices} from './articles.services';
import {ArticlesController} from './articles.controller';
import {CommentEntity} from './entities/comment.entity';
import {AuthModule} from '../auth/auth.module';
import {ArticleDto} from './dto/article.dto';

@Module({
    imports: [
        TypeOrmModule.forFeature([ArticleEntity, CommentEntity]),
        AuthModule,
    ],
    providers: [ArticlesServices, ArticleDto],
    controllers: [ArticlesController],
})
export class ArticlesModule {
}
