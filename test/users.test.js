const app = require('../app')
const supertest = require('supertest')
const { cleanDB } = require('./utils/truncate')
const { usersFactory } = require('./utils/factories')
const API = supertest(app)

beforeEach(async () => {
	await cleanDB()
	const users = await usersFactory(2)
})

describe('get users', () => {
	test('when ask for users, return an array', async () => {
		const response = await API.get('/users/').expect(200)
		console.log(response.body.body)
		expect(typeof response.body.body).toBe('object')
	})
})
