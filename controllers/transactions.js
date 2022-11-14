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
        return next(createHttpError(404, "No existen transacciones"));
      endpointResponse({
        res,
        message: "Transacciónes recuperadas con éxito",
        body: response,
      });
    } catch (error) {
      const httpError = createHttpError(
        error.statusCode,
        `[No existen transacciones] - [index - GET]: ${error.message}`
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
      if (!response)
        return next(createHttpError(404, "No existe esta transferencia"));
      endpointResponse({
        res,
        message: "Transacciónes recuperadas con éxito",
        body: response,
      });
    } catch (error) {
      const httpError = createHttpError(
        error.statusCode,
        `[Error al recuperar transacciones] - [index - GET]: ${error.message}`
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
        return next(createHttpError(500, "No se ha creado la transacción"));
      endpointResponse({
        res,
        message: "La transacción fue creada con éxito",
        body: response,
      });
    } catch (error) {
      const httpError = createHttpError(
        error.statusCode,
        `[Error al crear] - [index - POST]: ${error.message}`
      );
      next(httpError);
    }
  }),

  updateTransaction: catchAsync(async (req, res, next) => {
    let transactionFound;
    try {
      transactionFound = await Transaction.findByPk(req.params.id);
      if (!transactionFound)
        return next(createHttpError(404, "Error al encontrar transacciones"));
    } catch (error) {
      const httpError = createHttpError(
        error.statusCode,
        `[Error al encontrar la transacción] - [index - PUT]: ${error.message}`
      );
      next(httpError);
    }
    try {
      const response = await transactionFound.update(req.body);
      endpointResponse({
        res,
        message: "La transacción se actualizó con éxito",
        body: response,
      });
    } catch (error) {
      const httpError = createHttpError(
        error.statusCode,
        `[Error al actualizar la transacción] - [index - PUT]: ${error.message}`
      );
      next(httpError);
    }
  }),

  deleteTransaction: catchAsync(async (req, res, next) => {
    let transactionFound;
    try {
      transactionFound = await Transaction.findByPk(req.params.id);
      if (!transactionFound)
        return next(createHttpError(404, "Transacción no encontrada"));
    } catch (error) {
      const httpError = createHttpError(
        error.statusCode,
        `[Error al encontrar la transacción] - [index - DELETE]: ${error.message}`
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
        order: [["createdAt", "DESC"]],
      });
      endpointResponse({
        res,
        body: transactions,
      });
    } catch (error) {
      const httpError = createHttpError(
        error.statusCode,
        `[Error al eliminar la transacción] - [index - DELETE]: ${error.message}`
      );
      next(httpError);
    }
  }),
  balanceByUser: catchAsync(async (req, res, next) => {
    const { id } = req.params;
    const errorIdUser = await Transaction.findByPk(id);
    if (!errorIdUser)
      return next(createHttpError(404, "Este usuario no existe"));

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
        message: "Este es tu balance actulizado",
        body: { balance: balance, outcomesData, incomesData },
      });
    } catch (error) {
      const httpError = createHttpError(
        error.statusCode,
        `[Error al recuperar la transacción] - [index - GET]: ${error.message}`
      );
      next(httpError);
    }
  }),
};
