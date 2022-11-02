const { checkSchema, validationResult } = require('express-validator');

const checkReqData = (schema) => {
  return [
    checkSchema(schema),
    (req, res, next) => {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        res.status(400).json(errors.array());
      }
      next();
    }
  ]
}

module.exports = checkReqData;
