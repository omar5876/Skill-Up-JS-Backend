const createHttpError = require('http-errors')
const { Transaction } = require('../database/models')
const { endpointResponse } = require('../helpers/success')
const { catchAsync } = require('../helpers/catchAsync')

// example of a controller. First call the service, then build the controller method
module.exports = {
  get: catchAsync(async (req, res, next) => {
    try {
      const response = await Transaction.findAll();
      if(!response.length) return res.status(404).json({status: 404, message: 'There are no transactions'})
      endpointResponse({
        res,
        message: 'Transactions retrieved successfully',
        body: response,
      })
    } catch (error) {
      const httpError = createHttpError(
        error.statusCode,
        `[Error retrieving Transactions] - [index - GET]: ${error.message}`,
      )
      next(httpError)
    }
  }),

  getById: catchAsync(async (req, res, next) => {
    const {id} = req.params
    try {
      const response = await Transaction.findByPk(id)
      if(!response) return res.status(404).json({status: 404, message: 'Transaction not found'});
      endpointResponse({
        res,
        message: 'Transaction retrieved successfully',
        body: response,
      })
    } catch (error) {
      const httpError = createHttpError(
        error.statusCode,
        `[Error retrieving Transaction] - [index - GET]: ${error.message}`,
      )
      next(httpError)
    }
  }),
