import { Injectable } from '@nestjs/common';
import { Op } from 'sequelize';
import { InjectModel } from '@nestjs/sequelize';
import { Courses } from './course.model';
import { ICourseFilter, ICourseQuery } from './types';

@Injectable()
export class CourseService {
    constructor(
        @InjectModel(Courses)
        private courseModel: typeof Courses,
    ) { }

    async paginateAndFilter(
        query: ICourseQuery,
        ): Promise<{ count: number; rows: Courses[] }> {
        const limit = +query.limit;
        const offset = +query.offset * 20;
        const filter =  {} as Partial<ICourseFilter>;


        if(query.priceFrom && query.priceTo) {
            filter.price = {
                [Op.between]:[+query.priceFrom, +query.priceTo],
            };
        }


        if(query.course) {
            filter.course = JSON.parse(decodeURIComponent(query.course));
        }

        if(query.category) {
            filter.cource_category = JSON.parse(decodeURIComponent(query.category));
        }

        return this.courseModel.findAndCountAll({
            limit,
            offset,
            where: filter,
        });
    }

    async new(): Promise<{ count: number; rows: Courses[] }> {
        return this.courseModel.findAndCountAll({
            where: { new: true },
        });
    }

    async findOne(id: number | string): Promise<Courses> {
        return this.courseModel.findOne({
            where: { id },
        });
    }

    async findOneByName(coursename: string): Promise<Courses> {
        return this.courseModel.findOne({
            where: { coursename },
        });
    }

    async sertchByString(
        str: string,
        ): Promise<{ count: number; rows: Courses[] }> {
        return this.courseModel.findAndCountAll({
            limit: 20,
            where: { coursename: { [Op.like]: `%${str}%` } },
        });
    }
}