import { Controller } from "@nestjs/common";
import { Get } from '@nestjs/common';
import { CourseService } from "./course.service";
import{ Body, Param, Post, Query, UseGuards } from "@nestjs/common/decorators"
import { AuthenticatedGuard } from "src/ayth/authenticated.guard";
import { ApiBody, ApiOkResponse } from "@nestjs/swagger";
import { FindOneResponse, GetByNameRequest, GetByNameResponse, GetNewResponse, PaginateAndFilterResponse, SearchRequest, SerchResponse } from "./types";


@Controller('course')
export class CourseController {
    constructor( private readonly courseSevice: CourseService) {}

    @ApiOkResponse({ type: PaginateAndFilterResponse })
    @UseGuards(AuthenticatedGuard)
    @Get()
    paginateAndFilter(@Query() query) {
        return this.courseSevice.paginateAndFilter(query);
    }

    @ApiOkResponse({ type: FindOneResponse })
    @UseGuards(AuthenticatedGuard)
    @Get('find/:id')
    getOne(@Param('id') id: string) {
        return this.courseSevice.findOne(+id);
    }

    @ApiOkResponse({ type: GetNewResponse })
    @UseGuards(AuthenticatedGuard)
    @Get('new')
    geNew(){
        return this.courseSevice.new();
    }

    @ApiOkResponse({ type: SerchResponse })
    @ApiBody({ type: SearchRequest })
    @UseGuards(AuthenticatedGuard)
    @Post('search')
    search(@Body() { search }: { search: string }){
        return this.courseSevice.sertchByString(search);
    }

    @ApiOkResponse({ type: GetByNameResponse })
    @ApiBody({ type: GetByNameRequest })
    @UseGuards(AuthenticatedGuard)
    @Post('name')
    getByName(@Body() { coursename }: { coursename: string }){
        return this.courseSevice.sertchByString(coursename);
    }
}
