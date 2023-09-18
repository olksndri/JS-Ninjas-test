const {
  getAllHeroesFromDB,
  getHeroByIdFromDB,
  addHeroInDB,
  deleteHeroFromDB,
  updateHeroInDB,
} = require("../service/heroes-service");
const { controllerDecorator } = require("../decorators/index");

const getAllHeroes = async (req, res, next) => {
  const { page, limit } = req.query;
  const skip = (page - 1) * limit;
  const result = await getAllHeroesFromDB(limit, skip);
  res.status(200).json(result);
};

const getHeroById = async (req, res, next) => {
  const result = await getHeroByIdFromDB(req.params.heroId);
  if (result) {
    return res.status(200).json(result);
  }
  res.status(404).json({ message: "Not Found" });
};

const addHero = async (req, res, next) => {
  const result = await addHeroInDB(req.body);
  res.status(201).json({ message: "Hero added to DB!", result });
};

const deleteHeroById = async (req, res, next) => {
  await deleteHeroFromDB(req.params.heroId);
  res.status(204).json();
};

const updateHeroById = async (req, res, next) => {
  const result = await updateHeroInDB(req.params.heroId, req.body);
  res.status(200).json({
    message: "Info about a superhero was successfully updated in DB!",
    result,
  });
};

module.exports = {
  getAllHeroes: controllerDecorator(getAllHeroes),
  getHeroById: controllerDecorator(getHeroById),
  addHero: controllerDecorator(addHero),
  deleteHeroById: controllerDecorator(deleteHeroById),
  updateHeroById: controllerDecorator(updateHeroById),
};
