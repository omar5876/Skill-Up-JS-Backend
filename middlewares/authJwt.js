const createHttpError = require("http-errors");
const { decodeToken, verifyToken } = require("../helpers/jwtHelper");
const { User, Role } = require("../database/models");

const isAuthenticated = (req, res, next) => {
  const headerAuthorization =
    req.headers.authorization || req.headers.Authorization;

  if (!headerAuthorization || !headerAuthorization.startsWith("Bearer ")) {
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

const hasAuthenticatedRol = (rol) => async (req, res, next) => {
  const headerAuthorization =
    req.headers.authorization || req.headers.Authorization;

  const decoded = decodeToken(headerAuthorization);
  let userIdToken = JSON.stringify(decoded.decodeDataToken.data.userId);

  await User.findOne({
    where: { id: userIdToken },
    attributes: {
      exclude: [
        "avatar",
        "firstName",
        "lastName",
        "password",
        "email",
        "createdAt",
        "updatedAt",
        "deletedAt",
        "roleId",
      ],
    },
    include: {
      model: Role,
      attributes: {
        exclude: ["description", "createdAt", "updatedAt", "id"],
      },
    },
  })
    .then((data) => {
      if (![].concat(rol[0].toUpperCase()).includes(data.Role.name)) {
        const httpError = createHttpError(403, "does not have permissions");
        next(httpError);
      }
      next();
    })
    .catch((err) => {
      const httpError = createHttpError(404, "user does not match token");
      next(httpError);
    });
};

module.exports = { isAuthenticated, hasAuthenticatedRol };
