import { INestApplication } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import * as bcrypt from 'bcrypt';
import { SequelizeModule } from '@nestjs/sequelize';
import { Test, TestingModule } from '@nestjs/testing';
import { databaseConfig } from 'src/config/configuration';
import { SequelizeConfigService } from 'src/config/sequelizeConfig.service';
import { UsersService } from '../../src/users/users.service';
import { ShoppingCart } from '../../src/shopping-cart/shopping-cart.model';
import { ShoppingCartModule } from '../../src/shopping-cart/shopping-cart.module';
import { ShoppingCartService } from '../../src/shopping-cart/shopping-cart.service';
import { CourseService } from 'src/course/course.service';
import { CourseModule } from 'src/course/course.module';
import { User } from 'src/users/user.model';

const mockedUser = {
  username: 'Jhon',
  email: 'jhon@gmail.com',
  password: 'jhon123',
};

describe('Shopping Cart Service', () => {
  let app: INestApplication;
  let courseService: CourseService;
  let usersService: UsersService;
  let shoppingCartService: ShoppingCartService;

  beforeEach(async () => {
    const testModule: TestingModule = await Test.createTestingModule({
      imports: [
        SequelizeModule.forRootAsync({
          imports: [ConfigModule],
          useClass: SequelizeConfigService,
        }),
        ConfigModule.forRoot({
          load: [databaseConfig],
        }),
        ShoppingCartModule,
        CourseModule,
      ],
    }).compile();

    courseService = testModule.get<CourseService>(CourseService);
    usersService = testModule.get<UsersService>(UsersService);
    shoppingCartService =
      testModule.get<ShoppingCartService>(ShoppingCartService);

    app = testModule.createNestApplication();

    await app.init();
  });

  beforeEach(async () => {
    const user = new User();

    const hashedPassword = await bcrypt.hash(mockedUser.password, 10);

    user.username = mockedUser.username;
    user.password = hashedPassword;
    user.email = mockedUser.email;

    return user.save();
  });

  beforeEach(async () => {
    const cart = new ShoppingCart();
    const user = await usersService.findOne({
      where: { username: mockedUser.username },
    });
    const part = await courseService.findOne(1);

    cart.userId = user.id;
    cart.partId = part.id;
    cart.course = part.course;
    cart.cource_category = part.cource_category;
    cart.price = part.price;
    cart.image = JSON.parse(part.images)[0];
    cart.coursename = part.coursename;

    return cart.save();
  });

  afterEach(async () => {
    await User.destroy({ where: { username: mockedUser.username } });
    await ShoppingCart.destroy({ where: { partId: 1 } });
  });

  it('should return all cart items', async () => {
    const user = await usersService.findOne({
      where: { username: mockedUser.username },
    });

    const cart = await shoppingCartService.findAll(user.id);

    cart.forEach((item) =>
      expect(item.dataValues).toEqual(
        expect.objectContaining({
          id: expect.any(Number),
          userId: user.id,
          partId: expect.any(Number),
          course: expect.any(String),
          price: expect.any(Number),
          cource_category: expect.any(String),
          coursename: expect.any(String),
          image: expect.any(String),
          count: expect.any(Number),
          createdAt: expect.any(Date),
          updatedAt: expect.any(Date),
        }),
      ),
    );
  });

  it('should add cart items', async () => {
    await shoppingCartService.add({
      username: mockedUser.username,
      partId: 3,
    });

    const user = await usersService.findOne({
      where: { username: mockedUser.username },
    });

    const cart = await shoppingCartService.findAll(user.id);

    expect(cart.find((item) => item.partId === 3)).toEqual(
      expect.objectContaining({
        id: expect.any(Number),
        userId: user.id,
        partId: 3,
        course: expect.any(String),
        price: expect.any(Number),
        cource_category: expect.any(String),
        coursename: expect.any(String),
        image: expect.any(String),
        count: expect.any(Number),
        createdAt: expect.any(Date),
        updatedAt: expect.any(Date),
      }),
    );
  });

  it('should return updated count', async () => {
    const result = await shoppingCartService.updateCount(2, 1);

    expect(result).toEqual({ count: 2 });
  });
});