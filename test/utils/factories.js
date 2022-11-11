const { Category, User, Role, Transaction } = require('../../database/models')
const { faker } = require('@faker-js/faker')
require('dotenv').config()
const bcrypt = require('bcryptjs')

// role admin id
let adminID

// ----- populate table categories -----------------------------------------------------------------
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

// ---- Roles --------------------------------------------------------------------------------------

const populateRoles = () => {
	const roles = [{ name: 'admin' }, { name: 'normal' }]
	return Promise.all(roles.map((role) => Role.create(role)))
		.then(() => Role.findAll())
		.then((response) => response)
}

// ---- populate table users -----------------------------------------------------------------------
const configUserToSave = (user) => {
	const hashPassword = bcrypt.hashSync(user.password, 10)
	const userToSave = { ...user, password: hashPassword }
	return User.build(userToSave)
}

const generateRandomUser = (typeRole = 'normal') => {
	const user = {
		firstName: faker.name.firstName(),
		lastName: faker.name.lastName(),
		password: faker.internet.password(),
		email: faker.internet.email(),
	}
	user.roleId = typeRole === 'admin' ? adminID : adminID + 1
	return user
}

const populateUser = (users) => {
	return Promise.all(users.map((user) => user.save())).then((response) => response)
}

const usersFactory = async (cant) => {
	// insert roles in DB
	const roles = await populateRoles()
	adminID = roles[0].dataValues.id

	// create random Users
	const users = []
	for (let i = 0; i < cant; i++) users.push(generateRandomUser('normal'))
	const usersToSave = users.map((user) => configUserToSave(user))

	// insert in DB
	await populateUser(usersToSave)
	return await User.findAll()
}

// ---- populate table transactions ----------------------------------------------------------------
let genericCategoryId
let genericUserId

const generateRandomTransaction = (userId = genericUserId, categoryId = genericCategoryId) => {
	return {
		amount: faker.finance.amount(),
		date: faker.datatype.datetime(),
		userId,
		categoryId,
	}
}

const populateTransactions = (transactions) => {
	const transactionsModels = transactions.map((elem) => Transaction.build(elem))
	return Promise.all(transactionsModels.map((elem) => elem.save()))
}

const transctionsFactory = async (cant) => {
	const categories = await categoriesFactory(1)
	const users = await usersFactory(1)
	genericCategoryId = categories[0].dataValues.id
	genericUserId = users[0].dataValues.id

	const transactions = []
	for (let i = 0; i < cant; i++) {
		transactions.push(generateRandomTransaction(genericUserId, genericCategoryId))
	}
	await populateTransactions(transactions)
	const transactionsResponse = await Transaction.findAll()
	return transactionsResponse.map((elem) => elem.dataValues)
}

// ---- exports ------------------------------------------------------------------------------------
module.exports = {
	categoriesFactory,
	usersFactory,
	transctionsFactory,
	generateRandomCategorie,
	generateRandomUser,
	generateRandomTransaction,
}
