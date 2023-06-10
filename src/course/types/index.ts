import { faker } from "@faker-js/faker";
import { ApiProperty } from "@nestjs/swagger";
import { Op } from "sequelize";

class Course {
    @ApiProperty({example: 1})
    id:number

    @ApiProperty({example: faker.lorem.sentence(2)})
    course:string;

    @ApiProperty({example: 12345})
    price: number;

    @ApiProperty({example: faker.lorem.sentence(2)})
    cource_category:string;

    @ApiProperty({example: faker.lorem.word()})
    coursename:string;

    @ApiProperty({example: faker.lorem.sentence()})
    descriptiond:string;

    @ApiProperty({example: faker.image.avatar()})
    images:string;

    @ApiProperty({example: true})
    new:boolean

    @ApiProperty({example: 123})
    popularity:number

    @ApiProperty({ example: '2023-01-31T19:46:45.000Z' })
    createdAt: string;

    @ApiProperty({ example: '2023-01-31T19:46:45.000Z' })
     updatedAt: string;
}

export class PaginateAndFilterResponse {
    @ApiProperty({example: 10})
   count: number;

   @ApiProperty({type: Course, isArray: true})
   rows:  Course[];
}

export class NewParts extends Course {
    @ApiProperty({ example: true })
    new: boolean;
}

export class  GetNewResponse extends  PaginateAndFilterResponse {
    @ApiProperty({example: 10})
    count: number;
 
    @ApiProperty({type: Course, isArray: true})
    rows: NewParts[];
}

export class SerchResponse extends PaginateAndFilterResponse {
    
}
export class SearchRequest {
    @ApiProperty ({example: '1'})
    search: string
}


export class GetByNameResponse extends Course {}
export class GetByNameRequest {
    @ApiProperty ({example: 'Python'})
    coursename: string
}

export class FindOneResponse extends Course {}

export interface ICourseQuery{
    limit: string;
    offset: string;
    course: string | undefined;
    category: string | undefined;
    priceFrom: string | undefined;
    priceTo: string | undefined;
}


export interface ICourseFilter{
    course: string | undefined;
    cource_category: string | undefined;
    price: { [Op.between] : number[] };
}