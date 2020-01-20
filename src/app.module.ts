import {Module} from '@nestjs/common';
import {AppController} from './app.controller';
import {AppService} from './app.service';
import {TypeOrmModule} from '@nestjs/typeorm';
import {Connection} from 'typeorm';
import {ArticlesModule} from './articles/articles.module';
import {AuthModule} from './auth/auth.module';
import { ChatModule } from './chat/chat.module';

@Module({
    imports: [
        TypeOrmModule.forRoot(),
        ArticlesModule,
        AuthModule,
        ChatModule,
    ],
    controllers: [AppController],
    providers: [AppService],
})
export class AppModule {
    constructor(private readonly connection: Connection) {
    }

}
