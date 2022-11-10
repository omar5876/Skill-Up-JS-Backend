const { Category, User, Role } = require('../../database/models')
const { faker } = require('@faker-js/faker')
require('dotenv').config()
const bcrypt = require('bcryptjs')

// role normal id
let normalID

// populate table categories
const categoriesFactory = async (cant) => {
	const categories = []
	for (let i = 0; i < cant; i++) {
		categories.push(Category.build(generateRandomCategorie()))
	}
	await populateCategories(categories)
	const categorieList = await Category.findAll()
	return categorieList
}

const generateRandomCategorie = () => {
	return {
		name: faker.company.suffixes(),
		name: faker.company.bs(),
	}
}

const populateCategories = (categories) => {
	return Promise.all(categories.map((category) => category.save())).then((response) => response)
}

// Roles

const populateRoles = () => {
	const roles = [{ name: 'admin' }, { name: 'normal' }]
	return Promise.all(roles.map((role) => Role.create(role)))
		.then(() => Role.findAll())
		.then((response) => response)
}

// populate table users
const configUserToSave = (user) => {
	const hashPassword = bcrypt.hashSync(user.password, 10)
	const userToSave = { ...user, password: hashPassword }
	return User.build(userToSave)
}

const generateRandomUser = (roleId = normalID) => {
	const user = {
		firstName: faker.name.firstName(),
		lastName: faker.name.lastName(),
		password: faker.internet.password(),
		email: faker.internet.email(),
	}
	if (roleId) user.roleId = roleId
	return user
}

const populateUser = (users) => {
	return Promise.all(users.map((user) => user.save())).then((response) => response)
}

const usersFactory = async (cant) => {
	// insert roles in DB
	const roles = await populateRoles()
	normalID = roles[1].dataValues.id

	// create random Users
	const users = []
	for (let i = 0; i < cant; i++) users.push(generateRandomUser(roles[1].dataValues.id))
	const usersToSave = users.map((user) => configUserToSave(user))

	// insert in DB
	await populateUser(usersToSave)
	return await User.findAll()
}

// exports
module.exports = {
	categoriesFactory,
	generateRandomCategorie,
	usersFactory,
	generateRandomUser,
}
