const userSchema = {
  firstName: {
    in: "body",
    trim: true,
    isAlpha: {
      errorMessage: "El nombre solo puede contener caracteres alfabéticos.",
    },
  },
  lastName: {
    in: "body",
    trim: true,
    isAlpha: {
      errorMessage: "El nombre solo puede contener caracteres alfabéticos.",
    },
  },
  email: {
    in: "body",
    trim: true,
    normalizeEmail: true,
    isEmail: {
      errorMessage: "el correo electrónico es invalido",
    },
  },
  password: {
    in: "body",
    isStrongPassword: {
      options: {
        minLength: 8,
        minLowercase: 1,
        minUppercase: 0,
        minNumbers: 1,
        minSymbols: 0,
      },
      errorMessage:
        "La contraseña no es válida, asegúrese de que tenga al menos 8 caracteres, incluido un número y una letra minúscula.",
    },
    isLength: {
      options: { max: 72 },
      errorMessage:
        "La contraseña es demasiado larga, asegúrese de que no tenga más de 72 caracteres.",
    },
  },
};

module.exports = {
  userSchema,
};
