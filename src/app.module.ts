import {Module} from '@nestjs/common';
import {AppController} from './app.controller';
import {AppService} from './app.service';
import {CatsController} from './cats/cats.controller';
import {TypeOrmModule} from '@nestjs/typeorm';
import {Connection} from 'typeorm';
import {ArticlesModule} from './articles/articles.module';
import {Article} from './articles/entities/article.entity';
import { UsersController } from './users/users.controller';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';

@Module({
    imports: [
        TypeOrmModule.forRoot(
            // {
            //     type: 'mysql',
            //     host: 'localhost',
            //     port: 3306,
            //     username: 'root',
            //     password: 'sancho1995',
            //     database: 'articles',
            //     entities: [Article],
            //     synchronize: true,
            // },
        ),
        AuthModule,
        ArticlesModule,
    ],
    controllers: [AppController, CatsController],
    providers: [AppService],
})
export class AppModule {
    constructor(private readonly connection: Connection) {
    }

}
