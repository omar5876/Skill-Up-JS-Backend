'use strict';

module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.bulkInsert(
            'Roles',
            [
                {
                    name: 'REGULAR',
                    id: 1,
                },
                {
                    name: 'STANDARD',
                    id: 2,
                },
            ],
            {}
        );
    },

    down: async (queryInterface, Sequelize) => {
        await queryInterface.bulkDelete('Roles', null, {});
    },
};
