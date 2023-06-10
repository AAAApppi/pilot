import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { SequelizeModule } from '@nestjs/sequelize';
import { ConfigModule } from '@nestjs/config';
import { SequelizeConfigService } from './config/sequelizeConfig.service';
import { databaseConfig } from './config/configuration';
import { AythModule } from './ayth/ayth.module';
import { CourseModule } from './course/course.module';
import { ShoppingCartModule } from './shopping-cart/shopping-cart.module';
import { PaymentController } from './payment/payment.controller';
import { PaymentModule } from './payment/payment.module';

@Module({
  imports: [ 
    SequelizeModule.forRootAsync({
      imports: [ConfigModule],
      useClass: SequelizeConfigService,
    }),
    ConfigModule.forRoot({
      load: [databaseConfig],
    }),
    UsersModule,
    AythModule,
    CourseModule,
    ShoppingCartModule,
    PaymentModule],
})
export class AppModule {}
