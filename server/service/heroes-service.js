const Hero = require("./schemas/heroes-schema");

const getAllHeroesFromDB = async (limit, skip) => {
  return Hero.find().limit(limit).skip(skip);
};

const getHeroByIdFromDB = async (heroId) => {
  return Hero.findOne({ _id: heroId });
};

const addHeroInDB = async (body) => {
  return Hero.create(body);
};

const deleteHeroFromDB = async (heroId) => {
  return Hero.findOneAndRemove({ _id: heroId });
};

const updateHeroInDB = async (heroId, body) => {
  return Hero.findOneAndUpdate({ _id: heroId }, body);
};

module.exports = {
  getAllHeroesFromDB,
  getHeroByIdFromDB,
  addHeroInDB,
  deleteHeroFromDB,
  updateHeroInDB,
};
