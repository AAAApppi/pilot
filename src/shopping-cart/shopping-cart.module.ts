import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { ShoppingCartController } from './shopping-cart.controller';
import { ShoppingCartService } from './shopping-cart.service';
import { ShoppingCart } from './shopping-cart.model';
import { UsersModule } from '../users/users.module';
import { CourseModule } from 'src/course/course.module';


@Module({
  imports: [
    SequelizeModule.forFeature([ShoppingCart]),
    UsersModule,
    CourseModule,
  ],
  controllers: [ShoppingCartController],
  providers: [ShoppingCartService],
})
export class ShoppingCartModule {}