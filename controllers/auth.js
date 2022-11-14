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
                throw new createHttpError(400, 'Email & password requeridos');
            }

            const user = await User.findOne({
                where: { email },
                include: { model: Role },
            });
            if (!user) {
                throw new createHttpError(401, 'Email o password invalidos');
            }

            const match = bcrypt.compareSync(password, user.password);
            if (!match) {
                throw new createHttpError(401, 'Email o password invalidos');
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
                        email: user.email,
                        avatar: user.avatar,
                        // role: {
                        //   roleName: user.Role.name,
                        //   roleId: user.Role.id
                        // },
                    },
                    accessToken,
                },
            });
        } catch (error) {
            const httpError = createHttpError(
                error.statusCode,
                ` ${error.message}`
            );
            next(httpError);
        }
    }),
    get: catchAsync(async (req, res, next) => {
        const { userId } = req.user;
        try {
            const user = await User.findByPk(userId);

            if (!user) {
                throw new createHttpError(400, 'Usuario no encontrado');
            }

            endpointResponse({
                res,
                body: { user },
            });
        } catch (error) {
            const httpError = createHttpError(
                error.statusCode,
                `[No existe usuario] - [auth/me - GET]: ${error.message}`
            );
            next(httpError);
        }
    }),
    renew: catchAsync(async (req, res, next) => {
        const { userId } = req.user;

        const user = await User.findByPk(userId, { include: { model: Role } });

        console.log(req.user);

        try {
            const accessToken = createToken(user);

            endpointResponse({
                res,
                body: {
                    user: {
                        firstName: user.firstName,
                        lastName: user.lastName,
                        id: user.id,
                        role: user.Role.name,
                        email: user.email,
                        avatar: user.avatar,
                        // role: {
                        //   roleName: user.Role.name,
                        //   roleId: user.Role.id
                        // },
                    },
                    accessToken,
                },
            });
        } catch (error) {
            const httpError = createHttpError(
                error.statusCode,
                `[Debes loguearte] - [auth/login - POST]: ${error.message}`
            );
            next(httpError);
        }
    }),
};
