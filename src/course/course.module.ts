import { Module } from '@nestjs/common';
import { CourseController } from './course.controller';
import { CourseService } from './course.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { Courses } from './course.model';

@Module({
  imports: [SequelizeModule.forFeature([Courses])],
  controllers: [CourseController],
  providers: [CourseService],
  exports: [CourseService],
})
export class CourseModule {}
