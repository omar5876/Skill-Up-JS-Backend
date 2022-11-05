'use strict'

const users = [
	{
		firstName: 'John',
		lastName: 'Doe',
		password: 'demo1',
		email: 'demo1@gmail.com',
		roleId: 1,
	},
	{
		firstName: 'John',
		lastName: 'Doe',
		password: 'demo2',
		email: 'demo2@gmail.com',
		roleId: 1,
	},
	{
		firstName: 'John',
		lastName: 'Doe',
		password: 'demo3',
		email: 'demo3@gmail.com',
		roleId: 1,
	},
	{
		firstName: 'John',
		lastName: 'Doe',
		password: 'demo4',
		email: 'demo4@gmail.com',
		roleId: 1,
	},
	{
		firstName: 'John',
		lastName: 'Doe',
		password: 'demo5',
		email: 'demo5@gmail.com',
		roleId: 1,
	},
	{
		firstName: 'John',
		lastName: 'Doe',
		password: 'demo6',
		email: 'demo6@gmail.com',
		roleId: 1,
	},
	{
		firstName: 'John',
		lastName: 'Doe',
		password: 'demo7',
		email: 'demo7@gmail.com',
		roleId: 1,
	},
	{
		firstName: 'John',
		lastName: 'Doe',
		password: 'demo8',
		email: 'demo8@gmail.com',
		roleId: 1,
	},
	{
		firstName: 'John',
		lastName: 'Doe',
		password: 'demo9',
		email: 'demo9@gmail.com',
		roleId: 1,
	},
	{
		firstName: 'John',
		lastName: 'Doe',
		password: 'demo10',
		email: 'demo10@gmail.com',
		roleId: 1,
	},
	{
		firstName: 'John',
		lastName: 'Doe',
		password: 'demo11',
		email: 'demo11@gmail.com',
		roleId: 2,
	},
	{
		firstName: 'John',
		lastName: 'Doe',
		password: 'demo12',
		email: 'demo12@gmail.com',
		roleId: 2,
	},
	{
		firstName: 'John',
		lastName: 'Doe',
		password: 'demo13',
		email: 'demo13@gmail.com',
		roleId: 2,
	},
	{
		firstName: 'John',
		lastName: 'Doe',
		password: 'demo14',
		email: 'demo14@gmail.com',
		roleId: 2,
	},
	{
		firstName: 'John',
		lastName: 'Doe',
		password: 'demo15',
		email: 'demo15@gmail.com',
		roleId: 2,
	},
	{
		firstName: 'John',
		lastName: 'Doe',
		password: 'demo16',
		email: 'demo16@gmail.com',
		roleId: 2,
	},
	{
		firstName: 'John',
		lastName: 'Doe',
		password: 'demo17',
		email: 'demo17@gmail.com',
		roleId: 2,
	},
	{
		firstName: 'John',
		lastName: 'Doe',
		password: 'demo18',
		email: 'demo18@gmail.com',
		roleId: 2,
	},
	{
		firstName: 'John',
		lastName: 'Doe',
		password: 'demo19',
		email: 'demo19@gmail.com',
		roleId: 2,
	},
	{
		firstName: 'John',
		lastName: 'Doe',
		password: 'demo20',
		email: 'demo20@gmail.com',
		roleId: 2,
	},
]

module.exports = {
	up: async (queryInterface, Sequelize) => {
		await queryInterface.bulkInsert('Users', users, {})
	},

	down: async (queryInterface, Sequelize) => {
		await queryInterface.bulkDelete('Users', null, {})
	},
}
