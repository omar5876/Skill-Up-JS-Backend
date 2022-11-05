'use strict'

module.exports = {
	up: async (queryInterface, Sequelize) => {
		await queryInterface.bulkInsert(
			'Categories',
			[
				{
					name: 'OUTCOMES',
					description: 'shopping',
				},
				{
					name: 'INCOMES',
					description: 'cinema',
				},
			],
			{}
		)
	},

	down: async (queryInterface, Sequelize) => {
		await queryInterface.bulkDelete('Categories', null, {})
	},
}
