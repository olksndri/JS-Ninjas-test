const express = require("express");

const {
  getAllHeroes,
  getHeroById,
  addHero,
  deleteHeroById,
  updateHeroById,
} = require("../controllers/heroes-controllers");
const {
  addHeroValidation,
  updateHeroValidation,
  idValidation,
} = require("../middleware/heroes-validation");

const router = express.Router();

router.get("/", getAllHeroes);

router.get("/:heroId", getHeroById);

router.post("/", addHeroValidation, addHero);

router.delete("/:heroId", idValidation, deleteHeroById);

router.patch("/:heroId", updateHeroValidation, idValidation, updateHeroById);

module.exports = router;
