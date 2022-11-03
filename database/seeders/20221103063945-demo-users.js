'use strict';

const users = [
    {
        firstName: 'John',
        lastName: 'Doe',
        password: 'demo1',
        email: 'demo1@gmail.com',
        roleId: 1,
        id: 1,
    },
    {
        firstName: 'John',
        lastName: 'Doe',
        password: 'demo2',
        email: 'demo2@gmail.com',
        roleId: 2,
        id: 2,
    },
];

module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.bulkInsert('Users', users, {});
    },

    down: async (queryInterface, Sequelize) => {
        await queryInterface.bulkDelete('Users', null, {});
    },
};
