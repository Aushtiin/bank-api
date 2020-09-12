const Joi = require('@hapi/joi');

function transfer (req) {
    const schema = Joi.object({
      accountNumber: Joi.number().integer().min(1000000000).max(9999999999),
      amount: Joi.number().integer().min(100).max(9999999),
    })
    return schema.validate(req);
  };

  module.exports = transfer