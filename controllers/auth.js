const createHttpError = require('http-errors');
const { endpointResponse } = require('../helpers/success');
const { catchAsync } = require('../helpers/catchAsync');
const { User } = require('../database/models');
const bcrypt = require('bcryptjs');
const { createToken } = require('../helpers/jwtHelper');
const { Role } = require('../database/models');

module.exports = {

  post: catchAsync(async (req, res, next) => {
    const { email, password } = req.body;
    try {
      if (!email || !password) {
        throw new createHttpError(400, 'Email & password required');
      }

      const user = await User.findOne({ where: { email }, include: { model: Role } });
      if (!user) {
        throw new createHttpError(401, 'Email or password invalid');
      }

      const match = bcrypt.compareSync(password, user.password);
      if (!match) {
        throw new createHttpError(401, 'Email or password invalid');
      }
      console.log(user.toJSON());
      const accessToken = createToken(user);

      endpointResponse({
        res,
        body: {
          user: {
            firstName: user.firstName,
            lastName: user.lastName,
            id: user.id,
            role: user.Role.name,
            // role: {
            //   roleName: user.Role.name,
            //   roleId: user.Role.id
            // },
          },
          accessToken,
        },
      })

    } catch (error) {
      const httpError = createHttpError(
        error.statusCode,
        `[Error loging users] - [auth/login - POST]: ${error.message}`,
      )
      next(httpError)
    }
  }),
  get: catchAsync(async (req, res, next) => {
    const { userId } = req.user;
    try {
      const user = await User.findByPk(userId);

      if (!user) {
        throw new createHttpError(400, 'User not found');
      }

      endpointResponse({
        res,
        body: { user },
      })

    } catch (error) {
      const httpError = createHttpError(
        error.statusCode,
        `[Error retrieving user] - [auth/me - GET]: ${error.message}`,
      )
      next(httpError)
    }
  }),
};
