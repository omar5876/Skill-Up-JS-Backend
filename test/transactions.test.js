const app = require('../app')
const supertest = require('supertest')
const API = supertest(app)
const { cleanDB } = require('./utils/truncate')
const factory = require('./utils/factories')

let transactions

beforeEach(async () => {
	await cleanDB()
	transactions = await factory.transctionsFactory(2)
})

describe('get transaction', () => {
	test('when ask for all transactions receive an array', async () => {
		const response = await API.get('/transactions').expect(200)
		expect(Array.isArray(response.body.body)).toBe(true)
	})
	test('when ask for all transactions receive the total of transactions', async () => {
		const response = await API.get('/transactions').expect(200)
		expect(response.body.body).toHaveLength(transactions.length)
	})
	test('when ask for one existing transaction receive that transaction', async () => {
		const response = await API.get(`/transactions/${transactions[0].id}`).expect(200)
		const body = response.body.body
		expect(body.id).toBe(transactions[0].id)
		expect(body.amount).toBe(transactions[0].amount)
	})
	test('when ask for one non-existent transaction receive that error', async () => {
		const response = await API.get(`/transactions/-22`).expect(404)
		expect(response.type).toBe('text/html')
	})
})

describe('creating a transaction', () => {
	test('when post a valid transaction, is added to the table', async () => {
		const transaction = factory.generateRandomTransaction()
		const response = await API.post('/transactions/').send(transaction).expect(201)
		expect(response.body.body.amount).toBe(transaction.amount)
	})
	test('when post a valid transaction the size of the transactions table is changed', async () => {
		const transaction = factory.generateRandomTransaction()
		console.log(transaction)
		await API.post('/transactions/').send(transaction).expect(201)
		const response = await API.get('/transactions/').expect(200)
		expect(response.body.body).toHaveLength(transactions.length + 1)
	})

	// ~~~~ should to check if the fields user, category, amount and date are available ~~~~
	test('when post an invalid transaction receive an error', async () => {
		const transaction = { description: 'a description' }
		console.log(transaction)
		const response = await API.post('/transactions/').send(transaction).expect(500)
		expect(response.type).toBe('text/html')
	})

	test('when post a transaction with missing fields receive an error', async () => {
		let transaction = factory.generateRandomTransaction()
		transaction = { ...transaction, amount: undefined }
		console.log(transaction)
		const response = await API.post('/transactions/').send(transaction).expect(500)
		expect(response.type).toBe('text/html')
	})
})

describe('editing transactions', () => {
	test('when existing a transaction and send correct data, is edited', async () => {
		const transaction = { ...transactions[0], amount: transactions[0].amount - 50 }
		const response = await API.put(`/transactions/${transaction.id}`).send(transaction).expect(200)
		const body = response.body.body
		expect(body.id).toBe(transaction.id)
		expect(body.amount).toBe(transaction.amount)
		expect(body.userId).toBe(transaction.userId)
	})
	test('when existing a transaction and send correct data, the size of the table dont change', async () => {
		const transaction = { ...transactions[0], amount: transactions[0].amount - 50 }
		await API.put(`/transactions/${transaction.id}`).send(transaction).expect(200)
		const response = await API.get('/transactions').expect(200)
		const body = response.body.body
		expect(body).toHaveLength(transactions.length)
	})

	// ~~~~ in the requirements ask to validate that a user, category, quantity and date be sent ~~~~~
	test('when existing a transaction and send missing data, receive an error', async () => {
		const transaction = { ...transactions[0], amount: undefined }
		const response = await API.put(`/transactions/${transaction.id}`).send(transaction).expect(400)
		expect(response.type).toBe('text/html')
	})
	test('when the transaction non-existent, receive an error', async () => {
		const transaction = { ...transactions[0], amount: transactions[0].amount - 50 }
		const response = await API.put(`/transactions/50`).send(transaction).expect(400)
		expect(response.type).toBe('text/html')
	})
})

describe('deleting transactions', () => {
	test('when existing a transaction, is deleted', async () => {
		await API.delete(`/transactions/${transactions[0].id}`).expect(200)
	})
	test('when existing a transaction the size of the transactions table is reduced', async () => {
		await API.delete(`/transactions/${transactions[0].id}`).expect(200)
		const response = await API.get('/transactions').expect(200)
		expect(response.body.body).toHaveLength(transactions.length - 1)
	})
	test('when the transaction non-existent, receive an error', async () => {
		const response = await API.delete(`/transactions/-25`).expect(404)
		expect(response.type).toBe('text/html')
	})
})
