"use strict";

module.exports = {
<<<<<<< HEAD
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert(
      "Roles",
      [
        {
          name: "REGULAR",
        },
        {
          name: "STANDARD",
        },
      ],
      {}
    );
  },
=======
    up: async (queryInterface, Sequelize) => {
        await queryInterface.bulkInsert(
            'Roles',
            [
                {
                    name: 'REGULAR',
                    id: 1,
                },
                {
                    name: 'ADMIN',
                    id: 2,
                },
            ],
            {}
        );
    },
>>>>>>> b4c037dd0c00706cf63af629868e3f44dee2afc9

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete("Roles", null, {});
  },
};
