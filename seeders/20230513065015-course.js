const { faker } = require('@faker-js/faker');
('use strict');

const coursesOnTheWebsite = [
  'программирование',
];
const courseСategory = [
  'Бекенд-разработка',
  'Веб-разрабтка',
  'Мобильная разработка',
];

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.bulkInsert(
      'Courses',
      [...Array(100)].map(() => ({
        course:
        coursesOnTheWebsite[
            Math.floor(Math.random() * coursesOnTheWebsite.length)
          ],
        cource_category:
        courseСategory[
            Math.floor(Math.random() * courseСategory.length)
          ],
        price: faker.random.numeric(4),
        coursename: faker.lorem.sentence(2),
        description: faker.lorem.sentence(10),
        images: JSON.stringify(
          [...Array(2)].map(
            () =>
              `${faker.image.technics()}?random=${faker.random.numeric(1)}`,
          ),
        ),
        in_stock: faker.random.numeric(1),
        new: faker.datatype.boolean(),
        popularity: faker.random.numeric(3),
        compatibility: faker.lorem.sentence(7),
        createdAt: new Date(),
        updatedAt: new Date(),
      })),
    );
  },

  async down(queryInterface, Sequelize) {
    return queryInterface.bulkDelete('Courses', null, {});
  },
};