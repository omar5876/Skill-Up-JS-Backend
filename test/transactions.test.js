const app = require('../app')
const supertest = require('supertest')
const API = supertest(app)
const { cleanDB } = require('./utils/truncate')
const factory = require('./utils/factories')

beforeEach(async () => {
	await cleanDB
})

decribe('get transaction', () => {
	test('when ask for all transactions receive an array', async () => {})
	test('when ask for all transactions receive the total of transactions', async () => {})
	test('when ask for one existing transaction receive that transaction', async () => {})
	test('when ask for one non-existent transaction receive that error', async () => {})
})

describe('creating a transaction', () => {
	test('when post a valid transaction, is added to the table')
	test('when post a valid transaction the size of the transactions table is changed')
	test('when post an invalid transaction receive an error')
	test('when post a transaction with missing fields receive an error')
})

describe('editing transactions', () => {
	test('when existing a transaction and send correct data, is edited')
	test('when existing a transaction and send missing data, receive an error')
	test('when the transaction non-existent, receive an error')
})

describe('deleting transactions', () => {
	test('when existing a transaction, is deleted')
	test('when existing a transaction the size of the transactions table is reduced')
	test('when the transaction non-existent, receive an error')
})
