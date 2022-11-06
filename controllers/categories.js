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
        message: "Category created successfully",
        body: response,
      });
    } catch {
      const httpError = createHttpError(
        error.statusCode,
        `[Error to insert category] - [${req.path} - POST]: ${error.message}`
      );
      next(httpError);
    }
  }),

  get: catchAsync(async (req, res, next) => {
    try {
      const response = await Category.findAll();
      endpointResponse({
        res,
        message: "Categories retrieved successfuly",
        body: response,
      });
    } catch (error) {
      const httpError = createHttpError(
        error.statusCode,
        `[Error to insert category] - [${req.path} - POST]: ${error.message}`
      );
      next(httpError);
    }
  }),

  deleteCategory: catchAsync(async (req, res, next) => {
    const { id } = req.params;
    try {
      const category = await Category.findByPk(id);
      if (!category) {
        const httpError = createHttpError(404, "category does not exist");
        return next(httpError);
      }
      category.destroy();
      endpointResponse({
        res,
        message: "Category deleted",
      });
    } catch (error) {
      const httpError = createHttpError(
        error.statusCode,
        `[Error deleting user] - [index - DELETE]: ${error.message}`
      );
      next(httpError);
    }
  }),

  updateCategory: catchAsync(async (req, res, next) => {
    const { id } = req.params;
    const { name, description } = req.body;

    const category = await Category.findByPk(id);

    if (!category) {
      const httpError = createHttpError(404, "The category was not found.");
      return next(httpError);
    }
    category.name = name;
    category.description = description;
    await category
      .save()
      .then((updatedCategory) =>
        endpointResponse({
          res,
          message: "Category updated successfully",
          body: response,
          options: { category: { ...updatedCategory } },
        })
      )
      .catch((err) => {
        const httpError = createHttpError(
          err.statusCode,
          `[Error updating Categories] - [index - PUT]: ${err.message}`
        );
        next(httpError);
      });
  }),
};
