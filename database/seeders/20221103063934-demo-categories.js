'use strict'

module.exports = {
	up: async (queryInterface, Sequelize) => {
		await queryInterface.bulkInsert(
			'Categories',
			[
				{
					name: 'OUTCOMES',
					id: 11,
					createdAt: new Date(),
					updatedAt: new Date(),
				},
				{
					name: 'INCOMES',
					id: 12,
					createdAt: new Date(),
					updatedAt: new Date(),
				},
			],
			{}
		)
	},

	down: async (queryInterface, Sequelize) => {
		await queryInterface.bulkDelete('Categories', null, {})
	},
}
