const Joi = require("joi");

module.exports = Joi.object({
  nickname: Joi.string().required(),
  real_name: Joi.string().required(),
  origin_description: Joi.string().required(),
  superpowers: Joi.string().required(),
  catch_phrase: Joi.string().required(),
  images: Joi.array().required(),
});
