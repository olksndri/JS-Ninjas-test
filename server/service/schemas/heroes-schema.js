const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const hero = new Schema(
  {
    nickname: {
      type: String,
      required: [true, "Set nickname for hero"],
    },
    real_name: {
      type: String,
    },
    origin_description: {
      type: String,
      required: true,
    },
    superpowers: {
      type: Array,
      required: true,
    },
    catch_phrase: {
      type: String,
    },
    images: {
      type: Array,
    },
  },
  { versionKey: false, timestamps: true }
);

const Hero = mongoose.model("hero", hero);

module.exports = Hero;
