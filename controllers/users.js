const createHttpError = require('http-errors');
const { User } = require('../database/models');
const { endpointResponse } = require('../helpers/success');
const { catchAsync } = require('../helpers/catchAsync');
const bcrypt = require('bcryptjs');
const { uploadImageCloudinary } = require('../helpers/cloudinary');

// example of a controller. First call the service, then build the controller method
module.exports = {
    get: catchAsync(async (req, res, next) => {
        try {
            const response = await User.findAll();
            if (!response.length)
                return next(
                    createHttpError(404, 'No usuarios en al base de datos')
                );
            endpointResponse({
                res,
                message: 'Usuarios recuperados con éxito',
                body: response,
            });
        } catch (error) {
            const httpError = createHttpError(
                error.statusCode,
                `[Error al recuperar usuario] - [index - GET]: ${error.message}`
            );
            next(httpError);
        }
    }),
    post: catchAsync(async (req, res, next) => {
        const { body } = req;
        try {
            const emailExists = await User.findOne({
                where: { email: body.email },
            });
            if (emailExists) {
                const httpError = createHttpError(
                    403,
                    'Este usuario ya existe'
                );
                return next(httpError);
            }

            const newUser = { ...body };
            const salt = bcrypt.genSaltSync();

            newUser.password = bcrypt.hashSync(body.password, salt);

            const response = await User.create(newUser);

            endpointResponse({
                res,
                message: 'Usuario creado con exito',
                body: response,
            });
        } catch (error) {
            const httpError = createHttpError(
                error.statusCode,
                `[Error al crear el usuario] - [index - POST]: ${error.message}`
            );
            next(httpError);
        }
    }),
    put: catchAsync(async (req, res, next) => {
        const { body } = req;
        const { id } = req.params;
        try {
            const user = await User.findByPk(id);
            if (!user) {
                const httpError = createHttpError(
                    404,
                    'Este usuario no exsite'
                );
                return next(httpError);
            }

            const newUser = { ...body };

            if (newUser.password) {
                const salt = bcrypt.genSaltSync();
                newUser.password = bcrypt.hashSync(body.password, salt);
            }
            const response = await user.update(newUser);

            endpointResponse({
                res,
                message: 'Usuario actualizado con exito',
                body: response,
            });
        } catch (error) {
            const httpError = createHttpError(
                error.statusCode,
                `[Error al actualizar] - [index - PUT]: ${error.message}`
            );
            next(httpError);
        }
    }),

    getById: catchAsync(async (req, res, next) => {
        const { id } = req.params;
        try {
            const user = await User.findByPk(id);
            if (!user) {
                const httpError = createHttpError(
                    404,
                    'Este usuario no exsite'
                );
                return next(httpError);
            }
            endpointResponse({
                res,
                message: 'Usuarios recuperado con éxito',
                body: user,
            });
        } catch (error) {
            const httpError = createHttpError(
                error.statusCode,
                `['No hay usuarios] - [index - GET]: ${error.message}`
            );
            return next(httpError);
        }
    }),
    del: catchAsync(async (req, res, next) => {
        const { id } = req.params;
        try {
            const user = await User.findByPk(id);
            if (!user) {
                const httpError = createHttpError(
                    404,
                    'Este usuario no exsite'
                );
                return next(httpError);
            }
            user.destroy();
            endpointResponse({
                res,
                message: 'Usuario borrado con exito',
            });
        } catch (error) {
            const httpError = createHttpError(
                error.statusCode,
                `[Error al eliminar usuario] - [index - DELETE]: ${error.message}`
            );
            next(httpError);
        }
    }),
    uploadImage: catchAsync(async (req, res, next) => {
        const { userId } = req.user;
        console.log(req.user);
        try {
            const user = await User.findByPk(userId);
            const { mimetype, path } = req.file;
            const { secure_url } = await uploadImageCloudinary(path, mimetype);
            const response = await user.update({ avatar: secure_url });
            endpointResponse({
                res,
                body: response,
                message: 'Avatar creado con exito',
            });
        } catch (error) {
            const httpError = createHttpError(
                error.statusCode,
                `[Error al subir imagen] - [index - POST]: ${error}`
            );
            next(httpError);
        }
    }),
};
