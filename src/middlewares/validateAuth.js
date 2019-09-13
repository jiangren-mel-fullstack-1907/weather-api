const Joi = require('joi');

function validate(req) {
  const schema = {
    email: Joi.string()
      .required()
      .email(),
    password: Joi.string()
      .min(6)
      .required(),
    name: Joi.string().optional()
  };

  return Joi.validate(req, schema);
}
module.exports = (req, res, next) => {
  const { error } = validate(req.body);
  if (error) {
    return res.status(400).json(error.details[0].message);
  }
  return next();
};
