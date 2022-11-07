const supertest = require('supertest')
const app = require('../app')
const API = supertest(app)
const { Category } = require('../database/models')

beforeEach(async () => {
	await Category.destroy({ where: {} })
	listOfCategories.splice(0, listOfCategories.length)
	await Category.create({
		name: 'category 1',
		description: 'this is a description',
	})
})

describe('getting categories', () => {
	test('when I ask for all, I receive an array with all the categories', async () => {
		const response = await API.get('/categories/').expect(200)
		expect(response.body.code).toBe(200)
		console.log(response.body.body)
		expect(response.body.body).toHaveLength(1)
	})
})
