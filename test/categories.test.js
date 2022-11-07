const supertest = require('supertest')
const app = require('../app')
const API = supertest(app)
const { Category } = require('../database/models')
const { factoryCategories } = require('./utils/factories')
const { cleanDB } = require('./utils/truncate')

let user

beforeEach(async () => {
	await cleanDB()
	user = await factoryCategories(2)
})

describe('getting categories', () => {
	test('when I ask for all, I receive an array with all the categories', async () => {
		const response = await API.get('/categories/').expect(200)
		expect(response.body.code).toBe(200)
		console.log(response.body.body)
	})
})
