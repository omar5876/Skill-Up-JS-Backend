const userSchema = {
  firstName: {
    in: 'body',
    trim: true,
    isAlpha: {
      errorMessage: 'Firstname may only contain alpha characters.'
    },
  },
  lastName: {
    in: 'body',
    trim: true,
    isAlpha: {
      errorMessage: 'Lastname may only contain alpha characters.'
    },
  },
  email: {
    in: 'body',
    trim: true,
    normalizeEmail: true,
    isEmail: {
      errorMessage: 'Email is invalid'
    },
  },
  password: {
    in: 'body',
    isStrongPassword: {
      options: {

        minLength: 8,
        minLowercase: 1,
        minUppercase: 0,
        minNumbers: 1,
        minSymbols: 0,
      },
      errorMessage: 'Password is invalid, make sure it\'s at least 8 characters including a number and a lowercase letter.'
    },
    isLength: {
      options: { max: 72 },
      errorMessage: 'Password is too long, make sure it\'s no more than 72 characters.'
    }
  },
}

module.exports = {
  userSchema
}