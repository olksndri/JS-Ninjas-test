const { validateBody } = require("../decorators/index");
const { addHeroSchema, updateHeroSchema } = require("../joi_schemas/index");
const { getHeroByIdFromDB } = require("../service/heroes-service");
const { HttpError } = require("../utilities/index");

const addHeroValidation = validateBody(addHeroSchema);
const updateHeroValidation = validateBody(updateHeroSchema);
const idValidation = async (req, res, next) => {
  try {
    const result = await getHeroByIdFromDB(req.params.heroId);
    if (result) {
      return next();
    }
    next(HttpError(404));
  } catch (e) {
    const message = String(e.reason);
    next(HttpError(500, message));
  }
};

module.exports = {
  addHeroValidation,
  updateHeroValidation,
  idValidation,
};
