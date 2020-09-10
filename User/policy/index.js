const Joi = require("@hapi/joi");

function register (req) {
    const schema = Joi.object({
      name: Joi.string().min(3).max(200).required(),
      email: Joi.string().email().required(),
      password: Joi.string().min(8).max(200).required(),
      accountType: Joi.string().min(5).max(200).required()
    })
    return schema.validate(req)
  }

  module.exports = {
      register 
  }