const createHttpError = require('http-errors');
const { endpointResponse } = require('../helpers/success');
const { catchAsync } = require('../helpers/catchAsync');
const { User } = require('../database/models');
const bcrypt = require('bcryptjs');
const { createToken } = require('../helpers/jwtHelper');

module.exports = {

  post: catchAsync(async (req, res, next) => {
    const { email, password } = req.body;
    try {
      console.log(email, password);
      if (!email || !password) {
        throw new createHttpError(400, 'Email & password required');
      }

      const user = await User.findOne({ where: { email } });
      if (!user) {
        throw new createHttpError(401, 'Email or password invalid');
      }

      const match = bcrypt.compareSync(password, user.password);
      if (!match) {
        throw new createHttpError(401, 'Email or password invalid');
      }

      const accessToken = createToken(user);

      endpointResponse({
        res,
        body: { accessToken },
      })

    } catch (error) {
      const httpError = createHttpError(
        error.statusCode,
        `[Error loging users] - [auth/login - POST]: ${error.message}`,
      )
      next(httpError)
    }
  }),
};
