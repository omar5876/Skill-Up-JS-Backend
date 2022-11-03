const createHttpError = require('http-errors')
const { Category } = require('../database/models')
const { endpointResponse } = require('../helpers/success')
const { catchAsync } = require('../helpers/catchAsync')

module.exports = {
	post: catchAsync(async (req, res, next) => {
		try {
			const { name, description } = req.body

			const response = await Category.create({
				name,
				description,
			})

			endpointResponse({
				res,
				code: 201,
				message: 'Category created successfully',
				body: response,
			})
		} catch {
			const httpError = createHttpError(
				error.statusCode,
				`[Error to insert category] - [${req.path} - POST]: ${error.message}`
			)
			next(httpError)
		}
	}),
}
