import { Module } from '@nestjs/common';
import {TypeOrmModule} from '@nestjs/typeorm';
import {Article} from './entities/articles.entity';
import {ArticlesServices} from './articles.services';
import {ArticlesController} from './articles.controller';

@Module({
    imports: [TypeOrmModule.forFeature([Article])],
    providers: [ArticlesServices],
    controllers: [ArticlesController],
})
export class ArticlesModule {}
