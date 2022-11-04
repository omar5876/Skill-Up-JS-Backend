"use strict";

module.exports = {
<<<<<<< HEAD
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert(
      "Transactions",
      [
        {
          description: "Random desc",
          amount: 100,
          date: 9999999,
          userId: 1,
          categoryId: 2,
        },
      ],
      {}
    );
  },
=======
    up: async (queryInterface, Sequelize) => {
        await queryInterface.bulkInsert(
            'Transactions',
            [
                {
                    description: 'Random desc',
                    amount: 1000,
                    date: 9999999,
                    userId: 1,
                    categoryId: 1,
                },
                {
                    description: 'Random desc',
                    amount: 105,
                    date: 9999999,
                    userId: 1,
                    categoryId: 1,
                },
                {
                    description: 'Random desc',
                    amount: 999,
                    date: 9999999,
                    userId: 2,
                    categoryId: 1,
                },
                {
                    description: 'Random desc',
                    amount: 22223,
                    date: 9999999,
                    userId: 2,
                    categoryId: 2,
                },
                {
                    description: 'Random desc',
                    amount: 556,
                    date: 9999999,
                    userId: 3,
                    categoryId: 1,
                },
                {
                    description: 'Random desc',
                    amount: 1999,
                    date: 9999999,
                    userId: 3,
                    categoryId: 1,
                },
                {
                    description: 'Random desc',
                    amount: 466,
                    date: 9999999,
                    userId: 3,
                    categoryId: 1,
                },
                {
                    description: 'Random desc',
                    amount: 354,
                    date: 9999999,
                    userId: 2,
                    categoryId: 1,
                },
                {
                    description: 'Random desc',
                    amount: 999,
                    date: 99999999,
                    userId: 2,
                    categoryId: 1,
                },
                {
                    description: 'Random desc',
                    amount: 82,
                    date: 9999999,
                    userId: 5,
                    categoryId: 2,
                },
                {
                    description: 'Random desc',
                    amount: 400,
                    date: 9999999,
                    userId: 5,
                    categoryId: 2,
                },
                {
                    description: 'Random desc',
                    amount: 999,
                    date: 9999999,
                    userId: 8,
                    categoryId: 2,
                },
                {
                    description: 'Random desc',
                    amount: 887,
                    date: 9999999,
                    userId: 8,
                    categoryId: 2,
                },
                {
                    description: 'Random desc',
                    amount: 9999,
                    date: 9999999,
                    userId: 11,
                    categoryId: 2,
                },
                {
                    description: 'Random desc',
                    amount: 456,
                    date: 9999999,
                    userId: 2,
                    categoryId: 1,
                },
                {
                    description: 'Random desc',
                    amount: 2890,
                    date: 9999999,
                    userId: 5,
                    categoryId: 2,
                },
                {
                    description: 'Random desc',
                    amount: 950,
                    date: 9999999,
                    userId: 20,
                    categoryId: 1,
                },
                {
                    description: 'Random desc',
                    amount: 399,
                    date: 9999999,
                    userId: 3,
                    categoryId: 1,
                },
                {
                    description: 'Random desc',
                    amount: 5990,
                    date: 9999999,
                    userId: 3,
                    categoryId: 1,
                },
                {
                    description: 'Random desc',
                    amount: 920,
                    date: 9999999,
                    userId: 3,
                    categoryId: 1,
                },
            ],
            {}
        );
    },
>>>>>>> b4c037dd0c00706cf63af629868e3f44dee2afc9

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete("Transactions", null, {});
  },
};
