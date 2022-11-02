const { checkSchema, validationResult } = require('express-validator');
const createHttpError = require('http-errors');

const checkReqData = (schema) => {
  return [
    checkSchema(schema),
    (req, res, next) => {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        const errorMsg = `[Error request] - ${req.baseUrl} - ${req.method}]: ${errors.array().map((err) => `${err.msg}`).join(', ')}`
        const httpError = createHttpError(400, errorMsg);
        next(httpError);
      }
      next();
    }
  ]
}

module.exports = checkReqData;
