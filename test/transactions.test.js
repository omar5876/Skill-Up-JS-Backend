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
