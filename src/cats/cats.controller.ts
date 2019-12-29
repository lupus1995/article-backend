import {Controller, Get, Post, Req, HttpCode, Header, Param, Body} from '@nestjs/common';
import {Request} from 'express';
import {CreateCatDto} from './dto/creat-cat.dto';

@Controller('cats')
export class CatsController {
    @Post()
    @HttpCode(204)
    @Header('Cache-Control', 'none')
    async create(@Body() createCatDto: CreateCatDto) {
        return 'This action adds a new cat';
    }

    @Get()
    findAll(@Req() request: Request) {
        return 'This action return all cats';
    }

    @Get(':id')
    findOne(@Param() params) {
        return `This action return a ${params.id}`;
    }
}
