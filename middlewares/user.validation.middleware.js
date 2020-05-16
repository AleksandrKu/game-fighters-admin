const Joi = require('@hapi/joi');

const { user } = require('../models/user');
const responseError = (error, res) => {
    const errorResponce = {
        error: true,
        message: String(error),
    };
    res.status(400).send(errorResponce);
};
const createUserValid = (req, res, next) => {
  // TODO: Implement validatior for user entity during creation
  const schema = Joi.object({
    firstName: Joi.string().min(2).required(),
    lastName: Joi.string().min(2).required(),
    email: Joi.string().email().required(),
    phoneNumber: Joi.string()
      .regex(/^\+380\d{9}$/)
      .messages({
        'string.pattern.base': 'Phone must be in format +380xxxxxxxxx',
      })
      .required(),
    password: Joi.string().min(3).required(),
  });
  const { error } = schema.validate(req.body, { abortEarly: false });
  console.dir(error, { depth: null });
  if (error) responseError(error, res);
  else next();
};

const updateUserValid = (req, res, next) => {
  // TODO: Implement validatior for user entity during update
  const schema = Joi.object({
    firstName: Joi.string().min(2),
    lastName: Joi.string().min(2),
    email: Joi.string().email(),
    phoneNumber: Joi.string()
      .regex(/^\+380\d{9}$/)
      .messages({
        'string.pattern.base': 'Phone must be in format +380xxxxxxxxx',
      }),
    password: Joi.string().min(3),
  });
  const { error } = schema.validate(req.body, { abortEarly: false });
  if (error) responseError(error, res);
  else next();
};

const loginUserValid = (req, res, next) => {
  const schema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().min(3).required(),
  });
  const { error } = schema.validate(req.body, { abortEarly: false });
  const errorResponce = {
    error: true,
    message: String(error),
  };
  if (error) res.status(400).send(errorResponce);
  else next();
};

const idUserValid = (req, res, next) => {
  const schema = Joi.object({
    id: Joi.string().pattern(new RegExp('[a-zA-Z0-9-]')).required(),
  });
  const { error } = schema.validate({ id: req.params.id }, { abortEarly: false });
  if (error) {
    const errorResponce = {
      error: true,
      message: String(error),
    };
    res.status(400).send(errorResponce);
  } else {
    next();
  }
};

exports.createUserValid = createUserValid;
exports.updateUserValid = updateUserValid;
exports.loginUserValid = loginUserValid;
exports.idUserValid = idUserValid;
