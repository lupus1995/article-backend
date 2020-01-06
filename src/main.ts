import {NestFactory} from '@nestjs/core';
import {AppModule} from './app.module';
import {INestApplication, ValidationPipe} from '@nestjs/common';

export let app: INestApplication;

async function bootstrap() {
    app = await NestFactory.create(AppModule, {cors: true});
    app.useGlobalPipes(new ValidationPipe());
    await app.listen(3000);
}

bootstrap();
