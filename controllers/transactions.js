const createHttpError = require("http-errors");
const { Transaction, User, Category } = require("../database/models");
const { endpointResponse } = require("../helpers/success");
const { catchAsync } = require("../helpers/catchAsync");
const sequelize = require("sequelize");
// example of a controller. First call the service, then build the controller method
module.exports = {
  get: catchAsync(async (req, res, next) => {
    try {
      const response = await Transaction.findAll({
        attributes: {
          exclude: ["deletedAt", "updatedAt"],
        },
        include: [
          {
            model: User,
            attributes: ["firstName"],
          },

          { model: Category, attributes: ["name"] },
        ],
      });
      if (!response.length)
        return next(createHttpError(404, "There are no transactions"));
      endpointResponse({
        res,
        message: "Transactions retrieved successfully",
        body: response,
      });
    } catch (error) {
      const httpError = createHttpError(
        error.statusCode,
        `[Error retrieving Transactions] - [index - GET]: ${error.message}`
      );
      next(httpError);
    }
  }),

  getById: catchAsync(async (req, res, next) => {
    const { id } = req.params;
    try {
      const response = await Transaction.findOne({
        where: { id: id },
        attributes: {
          exclude: ["deletedAt", "userId", "categoryId", "updatedAt"],
        },
        include: [
          {
            model: User,
            attributes: ["firstName"],
          },

          { model: Category, attributes: ["name"] },
        ],
      });
      if (!response) return next(createHttpError(404, "Transaction not found"));
      endpointResponse({
        res,
        message: "Transaction retrieved successfully",
        body: response,
      });
    } catch (error) {
      const httpError = createHttpError(
        error.statusCode,
        `[Error retrieving Transaction] - [index - GET]: ${error.message}`
      );
      next(httpError);
    }
  }),

  createTransaction: catchAsync(async (req, res, next) => {
    try {
      const { userId } = req.user;
      const { body } = req;
      body.userId = userId;
      console.log(body);
      const response = await Transaction.create(req.body);
      if (!response)
        return next(createHttpError(500, "Transaction hasn't been created"));
      endpointResponse({
        res,
        message: "Transaction was created successfully",
        body: response,
      });
    } catch (error) {
      const httpError = createHttpError(
        error.statusCode,
        `[Error creating Transaction] - [index - POST]: ${error.message}`
      );
      next(httpError);
    }
  }),

  updateTransaction: catchAsync(async (req, res, next) => {
    let transactionFound;
    try {
      transactionFound = await Transaction.findByPk(req.params.id);
      if (!transactionFound)
        return next(createHttpError(404, "Transaction not found"));
    } catch (error) {
      const httpError = createHttpError(
        error.statusCode,
        `[Error finding Transaction] - [index - PUT]: ${error.message}`
      );
      next(httpError);
    }
    try {
      const response = await transactionFound.update(req.body);
      endpointResponse({
        res,
        message: "Transaction was updated successfully",
        body: response,
      });
    } catch (error) {
      const httpError = createHttpError(
        error.statusCode,
        `[Error updating Transaction] - [index - PUT]: ${error.message}`
      );
      next(httpError);
    }
  }),

  deleteTransaction: catchAsync(async (req, res, next) => {
    let transactionFound;
    try {
      transactionFound = await Transaction.findByPk(req.params.id);
      if (!transactionFound)
        return next(createHttpError(404, "Transaction not found"));
    } catch (error) {
      const httpError = createHttpError(
        error.statusCode,
        `[Error finding Transaction] - [index - DELETE]: ${error.message}`
      );
      next(httpError);
    }
    try {
      const response = await transactionFound.destroy(req.params.id);
      endpointResponse({
        res,
        message: "Transaction was deleted successfully",
        body: response,
      });
    } catch (error) {
      const httpError = createHttpError(
        error.statusCode,
        `[Error deleting Transaction] - [index - DELETE]: ${error.message}`
      );
      next(httpError);
    }
  }),
  getByUserId: catchAsync(async (req, res, next) => {
    const { id } = req.params;
    try {
      const transactions = await Transaction.findAll({
        where: { userId: id },
      });
      endpointResponse({
        res,
        body: transactions,
      });
    } catch (error) {
      const httpError = createHttpError(
        error.statusCode,
        `[Error deleting Transaction] - [index - DELETE]: ${error.message}`
      );
      next(httpError);
    }
  }),
  balanceByUser: catchAsync(async (req, res, next) => {
    const { id } = req.params;
    const errorIdUser = await Transaction.findByPk(id);
    if (!errorIdUser) return next(createHttpError(404, "user no existe"));

    try {
      const outcomesData = await Transaction.findAll({
        where: { userId: id },
        attributes: [
          [sequelize.fn("sum", sequelize.col("amount")), "totalOutcomes"],
        ],
        include: [
          {
            model: User,
            attributes: ["firstName", "id"],
          },
          {
            model: Category,
            where: { name: "OUTCOMES" },
            attributes: ["name"],
          },
        ],
        raw: true,
      });
      const incomesData = await Transaction.findAll({
        where: { userId: id },
        attributes: [
          [sequelize.fn("sum", sequelize.col("amount")), "totalIncomes"],
        ],
        include: [
          {
            model: User,
            attributes: ["firstName", "id"],
          },
          {
            model: Category,
            where: { name: "INCOMES" },
            attributes: ["name"],
          },
        ],
      });

      const outcomes = [];
      const incomes = [];
      incomesData.forEach((key) => {
        incomes.push(key.dataValues.totalIncomes);
        return incomes.toString();
      });

      outcomesData.forEach((key) => {
        outcomes.push(key.totalOutcomes);
        return outcomes.toString();
      });
      const balance = incomes - outcomes;

      endpointResponse({
        res,
        message: "Transaction retrieved successfully",
        body: { balance: balance, outcomesData, incomesData },
      });
    } catch (error) {
      const httpError = createHttpError(
        error.statusCode,
        `[Error retrieving Transaction] - [index - GET]: ${error.message}`
      );
      next(httpError);
    }
  }),
};
