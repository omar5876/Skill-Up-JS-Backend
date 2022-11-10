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
		await API.post('/users/').send(user).expect(201)
		const allUsers = await API.get('/users').expect(200)
		expect(allUsers.body.body).toHaveLength(users.length + 1)
	})

	test('return an error when send missing field data', async () => {
		let user = generateRandomUser()
		user = { ...user, email: '' }
		const response = await API.post('/users/').send(user).expect(400)
		expect(response.type).toBe('text/html')
	})

	test('When try to add an registed email, return an error', async () => {
		const user = generateRandomUser()
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

describe('edit an user', () => {
	let user
	let accessToken
	let userToEdit

	beforeEach(async () => {
		// create an user
		user = generateRandomUser('admin')
		await API.post('/users').send(user).expect(201)

		// login an user
		const logingData = await API.post('/auth/login').send(user).expect(200)
		accessToken = logingData.body.body.accessToken

		userToEdit = {
			...users[0].dataValues,
			firstName: `${users[0].dataValues.firstName} Pedro`,
			lastName: `${users[0].dataValues.lastName} Peterson`,
			email: `peter_${users[0].dataValues.email}`,
		}
	})

	test('when im logged as admin can to edit an existing user', async () => {
		const response = await API.put(`/users/${userToEdit.id}`)
			.set('Authorization', `Bearer ${accessToken}`)
			.send(userToEdit)
			.expect(200)

		expect(response.body.body.id).toBe(userToEdit.id)
		expect(response.body.body.firstName).toBe(userToEdit.firstName)
		expect(response.body.body.lastName).toBe(userToEdit.lastName)
		expect(response.body.body.email).toBe(userToEdit.email)
	})

	test('when im not admin and try to edit an user receive an error', async () => {
		const userEditor = generateRandomUser('normal')
		await API.post('/users').send(userEditor).expect(201)
		const loginResponse = await API.post('/auth/login').send(userEditor).expect(200)
		const token = loginResponse.body.body.accessToken

		const responseError = await API.put(`/users/${userToEdit.id}`)
			.set('Authorization', `Bearer ${token}`)
			.send(userToEdit)
			.expect(403)

		expect(responseError.type).toBe('text/html')
	})

	test('when im logged and try to edit a non-existent user get an error', async () => {
		const responseError = await API.put(`/users/${userToEdit.lastName}`)
			.set('Authorization', `Bearer ${accessToken}`)
			.send(userToEdit)
			.expect(404)

		expect(responseError.type).toBe('text/html')
	})

	test('when im unlogged and try to edit get an error', async () => {
		const responseError = await API.put(`/users/${userToEdit.id}`).send(userToEdit).expect(403)

		expect(responseError.type).toBe('text/html')
	})

	test('when i edited an user the size of the response of all dont change', async () => {
		const beforeUpdate = await API.get('/users').expect(200)

		await API.put(`/users/${userToEdit.id}`)
			.set('Authorization', `Bearer ${accessToken}`)
			.send(userToEdit)
			.expect(200)

		const afterUpdate = await API.get('/users').expect(200)
		expect(afterUpdate.body.body).toHaveLength(beforeUpdate.body.body.length)
	})
})

describe('delete an user', () => {
	let user
	let accessToken
	let userToDelete

	beforeEach(async () => {
		// create an user
		user = generateRandomUser('admin')
		await API.post('/users').send(user).expect(201)

		// login an user
		const logingData = await API.post('/auth/login').send(user).expect(200)
		accessToken = logingData.body.body.accessToken

		userToDelete = { ...users[0].dataValues }
	})

	test('when im logged as admin can to delete an existing user', async () => {
		await API.delete(`/users/${userToDelete.id}`)
			.set('Authorization', `Bearer ${accessToken}`)
			.send(userToDelete)
			.expect(200)
		await API.get(`/users/${userToDelete.id}`).expect(404)
	})

	test('when im not admin and try to delete an user receive an error', async () => {
		const userEditor = generateRandomUser('normal')
		await API.post('/users').send(userEditor).expect(201)
		const loginResponse = await API.post('/auth/login').send(userEditor).expect(200)
		const token = loginResponse.body.body.accessToken

		const responseError = await API.delete(`/users/${userToDelete.id}`)
			.set('Authorization', `Bearer ${token}`)
			.send(userToDelete)
			.expect(403)

		expect(responseError.type).toBe('text/html')
	})

	test('when im logged and try to delete a non-existent user get an error', async () => {
		const responseError = await API.delete(`/users/${userToDelete.lastName}`)
			.set('Authorization', `Bearer ${accessToken}`)
			.send(userToDelete)
			.expect(404)

		expect(responseError.type).toBe('text/html')
	})

	test('when im unlogged and try to delete, get an error', async () => {
		const responseError = await API.delete(`/users/${userToDelete.id}`)
			.send(userToDelete)
			.expect(403)

		expect(responseError.type).toBe('text/html')
	})

	test('when i edited an user the size of the response of all users is reduced', async () => {
		const beforeUpdate = await API.get('/users').expect(200)

		await API.delete(`/users/${userToDelete.id}`)
			.set('Authorization', `Bearer ${accessToken}`)
			.send(userToDelete)
			.expect(200)

		const afterUpdate = await API.get('/users').expect(200)
		expect(afterUpdate.body.body).toHaveLength(beforeUpdate.body.body.length - 1)
	})
})
