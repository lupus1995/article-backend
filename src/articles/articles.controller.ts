import {Controller, Get, Req} from '@nestjs/common';
import {Request} from 'express';

@Controller('article')
export class ArticlesController {
    @Get()
    findAll(@Req() request: Request) {
        return 'This action return all articles';
    }
}
