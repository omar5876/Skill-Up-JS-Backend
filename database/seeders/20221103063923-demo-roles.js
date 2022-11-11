'use strict'

module.exports = {
	up: async (queryInterface, Sequelize) => {
		await queryInterface.bulkInsert(
			'Roles',
			[
				{
					name: 'REGULAR',
					id: 11,
					createdAt: new Date(),
					updatedAt: new Date(),
				},
				{
					name: 'ADMIN',
					id: 12,
					createdAt: new Date(),
					updatedAt: new Date(),
				},
			],
			{}
		)
	},

	down: async (queryInterface, Sequelize) => {
		await queryInterface.bulkDelete('Roles', null, {})
	},
}
