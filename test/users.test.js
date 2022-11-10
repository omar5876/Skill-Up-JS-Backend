const app = require('../app')
const supertest = require('supertest')
const { cleanDB } = require('./utils/truncate')
const { usersFactory } = require('./utils/factories')
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
