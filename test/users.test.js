const app = require('../app')
const supertest = require('supertest')
const { cleanDB } = require('./utils/truncate')
const { usersFactory, generateRandomUser } = require('./utils/factories')
const API = supertest(app)

let users

beforeEach(async () => {
	await cleanDB()
	users = await usersFactory(2)
})

describe('get users', () => {
	test('when ask for users and the table is empty return an error', async () => {
		await cleanDB()
		const response = await API.get('/users/').expect(404)
		expect(response.type).toBe('text/html')
	})

	test('when ask for users, return an array', async () => {
		const response = await API.get('/users/').expect(200)
		expect(typeof response.body.body).toBe('object')
	})

	test('when ask for an existing user, is returned', async () => {
		const response = await API.get(`/users/${users[0].id}`).expect(200)
		// eval the main data (the dates are returned as string and i cannot use toEqual)
		expect(response.body.body.id).toBe(users[0].id)
		expect(response.body.body.firstName).toBe(users[0].firstName)
		expect(response.body.body.lastName).toBe(users[0].lastName)
		expect(response.body.body.password).toBe(users[0].password)
		expect(response.body.body.roleId).toBe(users[0].roleId)
	})

	test('when ask for a non-existent user an error is returned', async () => {
		const response = await API.get(`/users/${users[0].firstName}`).expect(404)
		expect(response.type).toBe('text/html')
	})
})

describe('creating users', () => {
	test('An user is created when the send data is valid', async () => {
		const user = generateRandomUser()
		console.log(user)
		await API.post('/users/').send(user).expect(201)
		const allUsers = await API.get('/users').expect(200)
		expect(allUsers.body.body).toHaveLength(users.length + 1)
	})

	test('return an error when send missing field data', async () => {
		let user = generateRandomUser()
		user = { ...user, email: '' }
		console.log(user)
		const response = await API.post('/users/').send(user).expect(400)
		expect(response.type).toBe('text/html')
	})

	test('When try to add an registed email, return an error', async () => {
		const user = generateRandomUser()
		console.log(user)
		await API.post('/users/').send(user).expect(201)
		const response = await API.post('/users/').send(user).expect(403)
		expect(response.type).toBe('text/html')
	})

	test('when a user is created, the server return his data', async () => {
		const user = generateRandomUser()
		const response = await API.post('/users/').send(user).expect(201)
		expect(response.body.body.firstName).toBe(user.firstName)
		expect(response.body.body.lastName).toBe(user.lastName)
		expect(response.body.body.email).toBe(user.email)
	})
})
