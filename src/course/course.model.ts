import { Table, Model, Column } from 'sequelize-typescript';

@Table
export class Courses extends Model {
  @Column
  course: string;

  @Column ({defaultValue: 0})
  price: number;

  @Column
  cource_category: string;

  @Column
  coursename: string;

  @Column
  description: string;

  @Column
  images: string;

  @Column({ defaultValue: 0 })
  in_stock: number;

  @Column({defaultValue: false})
  new: boolean;

  @Column
  popularity: number;

  @Column
  compatibility: string;
}