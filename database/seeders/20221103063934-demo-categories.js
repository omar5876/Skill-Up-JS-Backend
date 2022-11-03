'use strict';

module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.bulkInsert(
            'Categories',
            [
                {
                    name: 'OUTCOMES',
                    id: 1,
                },
                {
                    name: 'INCOMES',
                    id: 2,
                },
            ],
            {}
        );
    },

    down: async (queryInterface, Sequelize) => {
        await queryInterface.bulkDelete('Categories', null, {});
    },
};
