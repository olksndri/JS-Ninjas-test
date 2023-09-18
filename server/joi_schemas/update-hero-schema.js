const Joi = require("joi");

module.exports = Joi.object({
  nickname: Joi.string(),
  real_name: Joi.string(),
  origin_description: Joi.string(),
  superpowers: Joi.string(),
  catch_phrase: Joi.string(),
  images: Joi.array(),
}).or(
  "nickname",
  "real_name",
  "origin_description",
  "superpowers",
  "catch_phrase",
  "images"
);
