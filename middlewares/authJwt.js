const createHttpError = require("http-errors");
const { decodeToken, verifyToken } = require("../helpers/jwtHelper");
const { endpointResponse } = require("../helpers/success");

const isAuthenticated = (req, res, next) => {
  let headerAuthorization = req.headers.authorization;

  if (!headerAuthorization) {
    const httpError = createHttpError(403, "the token does not exist");
    next(httpError);
  }
  let isExpired = verifyToken(headerAuthorization, res);
  if (isExpired.res) {
    const httpError = createHttpError(403, "the token has expired");
    next(httpError);
  } else {
    let decoded = decodeToken(headerAuthorization);
    if (decoded.decodeDataToken.dataUser) {
      res.status(200).json({
        status: 200,
        message: "successful access",
      });
      next();
    } else {
      const httpError = createHttpError(403, "access denied");
      next(httpError);
    }
  }
};

const hasAuthenticatedRol = (user) => (req, res, next) => {};

module.exports = { isAuthenticated, hasAuthenticatedRol };
