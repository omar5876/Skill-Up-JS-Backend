const app = require('../app')
const supertest = require('supertest')
const API = supertest(app)
const { cleanDB } = require('./utils/truncate')
const factory = require('./utils/factories')

let transactions

beforeEach(async () => {
	await cleanDB
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
	test('when post a valid transaction, is added to the table', async () => {})
	test('when post a valid transaction the size of the transactions table is changed', async () => {})
	test('when post an invalid transaction receive an error', async () => {})
	test('when post a transaction with missing fields receive an error', async () => {})
})

describe('editing transactions', () => {
	test('when existing a transaction and send correct data, is edited', async () => {})
	test('when existing a transaction and send missing data, receive an error', async () => {})
	test('when the transaction non-existent, receive an error', async () => {})
})

describe('deleting transactions', () => {
	test('when existing a transaction, is deleted', async () => {})
	test('when existing a transaction the size of the transactions table is reduced', async () => {})
	test('when the transaction non-existent, receive an error', async () => {})
})
