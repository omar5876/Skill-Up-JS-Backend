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

  createTransaction: catchAsync(async (req, res, next) => {
    try {
      const response = await Transaction.create(req.body)
      if(!response) return res.status(500).json({status: 500, message: 'Transaction hasn\'t been created'});
      endpointResponse({
        res,
        message: 'Transaction was created successfully',
        body: response,
      })
    } catch (error) {
      const httpError = createHttpError(
        error.statusCode,
        `[Error creating Transaction] - [index - POST]: ${error.message}`,
      )
      next(httpError)
    }
  }),

  updateTransaction: catchAsync(async (req, res, next) => {
    let transactionFound;
    try {
        transactionFound = await Transaction.findByPk(req.params.id)
        if(!transactionFound) return res.status(404).json({status: 404, message: 'Transaction not found'});
    } catch (error) {
        const httpError = createHttpError(
            error.statusCode,
            `[Error finding Transaction] - [index - PUT]: ${error.message}`,
          )
          next(httpError)
    }
    try {
      const response = await transactionFound.update(req.body)
      endpointResponse({
        res,
        message: 'Transaction was updated successfully',
        body: response,
      })
    } catch (error) {
      const httpError = createHttpError(
        error.statusCode,
        `[Error updating Transaction] - [index - PUT]: ${error.message}`,
      )
      next(httpError)
    }
  }),
