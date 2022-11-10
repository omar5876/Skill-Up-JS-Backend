const supertest = require('supertest')
const app = require('../app')
const API = supertest(app)
const factory = require('./utils/factories')
const { cleanDB } = require('./utils/truncate')

let categoriesList

beforeEach(async () => {
	await cleanDB()
	const dbResponse = await factory.categoriesFactory(2)
	categoriesList = dbResponse.map((elem) => elem.dataValues)
})

describe('getting categories', () => {
	test('when ask for all, receive an array with all categories', async () => {
		const response = await API.get('/categories/').expect(200)
		expect(response.body.code).toBe(200)
		console.log(response.body.body)
		expect(response.body.body).toHaveLength(categoriesList.length)
	})

	test('when ask for a category, only is returned that contact', async () => {
		const response = await API.get(`/categories/${categoriesList[0].id}`).expect(200)
		expect(response.body.code).toBe(200)
		// only check if the id, name and description are the same (the dates are returned as string)
		expect(response.body.body.id).toBe(categoriesList[0].id)
		expect(response.body.body.name).toBe(categoriesList[0].name)
		expect(response.body.body.description).toBe(categoriesList[0].description)
	})

	test('when ask for an invalid category id, receive an error', async () => {
		const response = await API.get('/categories/-255').expect(404)
		// the error should be handle with httpError and return a html
		expect(response.type).toBe('text/html')
	})
})

describe('adding category', () => {
	test('when try to add an valid category, is added', async () => {
		const categorie = factory.generateRandomCategorie()
		const response = await API.post('/categories/').send(categorie).expect(201)
		expect(response.body.body.name).toBe(categorie.name)
		expect(response.body.body.description).toBe(categorie.description)
	})

	test('when a category is added, the size of the categories increases', async () => {
		const categorie = factory.categoriesFactory()
		await API.post('/categories/').send(categorie).expect(201)
		const response = await API.get('/categories').expect(200)
		expect(response.body.body).toHaveLength(categoriesList.length + 1)
	})

	test('when try to add an empty category, is created', async () => {
		const response = await API.post('/categories/').send({}).expect(201)
		console.log(response.body.body)
		expect(response.body.body.name).toBe(undefined)
	})

	test('when try to add the same category two times, is added', async () => {
		const categorie = factory.generateRandomCategorie()
		const responseOne = await API.post('/categories/').send(categorie).expect(201)
		const responseTwo = await API.post('/categories/').send(categorie).expect(201)
		const totalCategoriesResponse = await API.get('/categories/').expect(200)

		expect(responseOne.body.body.id).not.toBe(responseTwo.body.body.id)
		expect(totalCategoriesResponse.body.body).toHaveLength(categoriesList.length + 2)
	})
})

describe('editing category', () => {
	let categoryEdited

	beforeEach(() => {
		categoryEdited = {
			...categoriesList[0],
			description: `${categoriesList[0].description} edited`,
		}
	})

	test('when try to edit a new valid category, is update', async () => {
		const response = await API.put(`/categories/${categoryEdited.id}`)
			.send(categoryEdited)
			.expect(200)
		expect(response.body.boby.description).toBe(categoryEdited.description)
	})

	test('when a category is edited the size dont change', async () => {
		await API.put(`/categories/${categoryEdited.id}`).send(categoryEdited).expect(200)
		const response = await API.get('/categories/').expect(200)
		expect(response.body.boby).toHaveLength(categoriesList.length)
	})

	test('when try to edit an invalid category, return an error', async () => {
		const response = await API.put('/categories/-255').send(categoryEdited).expect(404)
		expect(response.type).toBe('text/html')
	})

	test('when try to edit a category with an invalid id, return an error', async () => {
		const response = await API.put(`/categories/${categoryEdited.name}`)
			.send(categoryEdited)
			.expect(404)
		expect(response.type).toBe('text/html')
	})
})

describe('deleting category', () => {
	test('when try to delete an existing category, is deleted', async () => {})

	test('when try to delete a non-existent category, receive an error', async () => {})
})
