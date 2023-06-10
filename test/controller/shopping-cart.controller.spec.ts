import { INestApplication } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import * as bcrypt from 'bcrypt';
import * as request from 'supertest';
import * as session from 'express-session';
import * as passport from 'passport';
import { SequelizeModule } from '@nestjs/sequelize';
import { Test, TestingModule } from '@nestjs/testing';
import { databaseConfig } from 'src/config/configuration';
import { SequelizeConfigService } from 'src/config/sequelizeConfig.service';
import { UsersService } from '../../src/users/users.service';
import { ShoppingCart } from '../../src/shopping-cart/shopping-cart.model';
import { ShoppingCartModule } from '../../src/shopping-cart/shopping-cart.module';
import { CourseService } from 'src/course/course.service';
import { AythModule } from 'src/ayth/ayth.module';
import { User } from 'src/users/user.model';

const mockedUser = {
  username: 'Jhon',
  email: 'jhon@gmail.com',
  password: 'jhon123',
};

describe('Shopping Cart Controller', () => {
  let app: INestApplication;
  let courseService: CourseService;
  let usersService: UsersService;

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
        AythModule,
      ],
    }).compile();

    courseService = testModule.get<CourseService>(CourseService);
    usersService = testModule.get<UsersService>(UsersService);

    app = testModule.createNestApplication();
    app.use(
      session({
        secret: 'keyword',
        resave: false,
        saveUninitialized: false,
      }),
    );
    app.use(passport.initialize());
    app.use(passport.session());

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

  it('should add cart item', async () => {
    const login = await request(app.getHttpServer())
      .post('/users/login')
      .send({ username: mockedUser.username, password: mockedUser.password });

    const user = await usersService.findOne({
      where: { username: mockedUser.username },
    });

    const response = await request(app.getHttpServer())
      .get(`/shopping-cart/${user.id}`)
      .set('Cookie', login.headers['set-cookie']);

    expect(response.body).toEqual(
      expect.arrayContaining([
        {
          id: expect.any(Number),
          userId: user.id,
          partId: expect.any(Number),
          course: expect.any(String),
          price: expect.any(Number),
          cource_category: expect.any(String),
          coursename: expect.any(String),
          image: expect.any(String),
          count: expect.any(Number),
          createdAt: expect.any(String),
          updatedAt: expect.any(String),
        },
      ]),
    );
  });

  it('should get all cart items', async () => {
    const login = await request(app.getHttpServer())
      .post('/users/login')
      .send({ username: mockedUser.username, password: mockedUser.password });

    await request(app.getHttpServer())
      .post('/shopping-cart/add')
      .send({ username: mockedUser.username, partId: 3 })
      .set('Cookie', login.headers['set-cookie']);

    const user = await usersService.findOne({
      where: { username: mockedUser.username },
    });

    const response = await request(app.getHttpServer())
      .get(`/shopping-cart/${user.id}`)
      .set('Cookie', login.headers['set-cookie']);

    expect(response.body.find((item) => item.partId === 3)).toEqual(
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
        createdAt: expect.any(String),
        updatedAt: expect.any(String),
      }),
    );
  });

  it('should delete cart item', async () => {
    const login = await request(app.getHttpServer())
      .post('/users/login')
      .send({ username: mockedUser.username, password: mockedUser.password });

    const user = await usersService.findOne({
      where: { username: mockedUser.username },
    });

    await request(app.getHttpServer())
      .delete(`/shopping-cart/all/${user.id}`)
      .set('Cookie', login.headers['set-cookie']);

    const response = await request(app.getHttpServer())
      .get(`/shopping-cart/${user.id}`)
      .set('Cookie', login.headers['set-cookie']);

    expect(response.body).toStrictEqual([]);
  });
});