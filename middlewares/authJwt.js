const createHttpError = require("http-errors");
const { decodeToken, verifyToken } = require("../helpers/jwtHelper");

const isAuthenticated = (req, res, next) => {
  const headerAuthorization = req.headers.authorization || req.headers.Authorization;

  if (!headerAuthorization || !headerAuthorization.startsWith('Bearer ')) {
    next(createHttpError(403, "the token does not exist"));
  }
  const isExpired = verifyToken(headerAuthorization, res);
  if (isExpired.res) {
    const httpError = createHttpError(403, "the token has expired");
    next(httpError);
  }

  let decoded = decodeToken(headerAuthorization);
  if (!decoded.decodeDataToken.data) {
    const httpError = createHttpError(403, "access denied");
    next(httpError);
  }

  req.user = decoded.decodeDataToken.data;
  next();

};

const hasAuthenticatedRol = (user) => (req, res, next) => { };

module.exports = { isAuthenticated, hasAuthenticatedRol };
