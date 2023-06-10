import { Table, Model, Column } from 'sequelize-typescript';

@Table
export class ShoppingCart extends Model {
  @Column
  userId: number;

  @Column({ defaultValue: 0 })
  partId: number;

  @Column
  course: string;

  @Column({ defaultValue: 0 })
  price: number;

  @Column
  cource_category: string;

  @Column
  coursename: string;

  @Column
  image: string;

  @Column({ defaultValue: 0 })
  in_stock: number;

  @Column({ defaultValue: 1 })
  count: number;

  @Column({ defaultValue: 0 })
  total_price: number;
}