const Joi = require('@hapi/joi');
const { fighter } = require('../models/fighter');

const createFighterValid = (req, res, next) => {
  // TODO: Implement validatior for fighter entity during creation
  const schema = Joi.object({
    name: Joi.string().min(3).required(),
    power: Joi.number().integer().min(0).max(10).required(),
    defense: Joi.number().integer().min(0).max(10).default(fighter.defense),
    source: Joi.string().uri(),
  });
  const { error } = schema.validate(req.body, { abortEarly: false });
  const errorResponce = {
    error: true,
    message: String(error),
  };
  if (error) {
    res.status(400).send(errorResponce);
  } else {
    req.body.health = fighter.health;
    next();
  }
};

const idFighterValid = (req, res, next) => {
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

const updateFighterValid = (req, res, next) => {
  // TODO: Implement validatior for fighter entity during update
  const schema = Joi.object({
    name: Joi.string().min(3),
    power: Joi.number().integer().min(0).max(10),
    defense: Joi.number().integer().min(0).max(10).default(fighter.defense),
    health: Joi.number().integer().min(0).max(100),
    source: Joi.string().uri(),
  });
  const { error } = schema.validate(req.body, { abortEarly: false });
  const errorResponce = {
    error: true,
    message: String(error),
  };
  if (error) res.status(400).send(errorResponce);
  else next();
};

exports.createFighterValid = createFighterValid;
exports.updateFighterValid = updateFighterValid;
exports.idFighterValid = idFighterValid;
