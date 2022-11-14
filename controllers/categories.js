const createHttpError = require("http-errors");
const { Category } = require("../database/models");
const { endpointResponse } = require("../helpers/success");
const { catchAsync } = require("../helpers/catchAsync");

module.exports = {
  post: catchAsync(async (req, res, next) => {
    try {
      const { name, description } = req.body;

      const response = await Category.create({
        name,
        description,
      });

      endpointResponse({
        res,
        code: 201,
        message: "Categoria creada con exito",
        body: response,
      });
    } catch {
      const httpError = createHttpError(
        error.statusCode,
        `[Error al crear la categoria] - [${req.path} - POST]: ${error.message}`
      );
      next(httpError);
    }
  }),

  get: catchAsync(async (req, res, next) => {
    try {
      const response = await Category.findAll();
      endpointResponse({
        res,
        message: "Categorias encontradas con exito",
        body: response,
      });
    } catch (error) {
      const httpError = createHttpError(
        error.statusCode,
        `[Error al obtener categoria] - [${req.path} - GET]: ${error.message}`
      );
      next(httpError);
    }
  }),

  deleteCategory: catchAsync(async (req, res, next) => {
    const { id } = req.params;
    try {
      const category = await Category.findByPk(id);
      if (!category) {
        const httpError = createHttpError(404, "Esta categoria no existe");
        return next(httpError);
      }
      category.destroy();
      endpointResponse({
        res,
        message: "Categoria borrada con exito",
      });
    } catch (error) {
      const httpError = createHttpError(
        error.statusCode,
        `[Error al borrar] - [index - DELETE]: ${error.message}`
      );
      next(httpError);
    }
  }),

  updateCategory: catchAsync(async (req, res, next) => {
    const { id } = req.params;
    const { name, description } = req.body;

    const category = await Category.findByPk(id);

    if (!category) {
      const httpError = createHttpError(404, "The categoria no existe");
      return next(httpError);
    }
    category.name = name;
    category.description = description;
    await category
      .save()
      .then((updatedCategory) =>
        endpointResponse({
          res,
          message: "Category  actualizada con exito",
          body: response,
          options: { category: { ...updatedCategory } },
        })
      )
      .catch((err) => {
        const httpError = createHttpError(
          err.statusCode,
          `[Error al actualizar categorias - [index - PUT]: ${err.message}`
        );
        next(httpError);
      });
  }),

  getById: catchAsync(async (req, res, next) => {
    const { id } = req.params;
    try {
      const response = await Category.findByPk(id);
      if (!response)
        return res
          .status(404)
          .json({ status: 404, message: "esta categoria no existe" });
      endpointResponse({
        res,
        message: "Category encontrada",
        body: response,
      });
    } catch (error) {
      const httpError = createHttpError(
        error.statusCode,
        `[Error al encontrar categoria] - [index - GET]: ${error.message}`
      );
      next(httpError);
    }
  }),
};
