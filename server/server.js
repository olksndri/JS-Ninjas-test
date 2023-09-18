const mongoose = require("mongoose");
const app = require("./app");

mongoose.Promise = global.Promise;
require("dotenv").config();

const { DB_HOST, SERVER_PORT } = process.env;

mongoose
  .connect(DB_HOST)
  .then(() => {
    app.listen(SERVER_PORT, () =>
      console.log(`Server running on port ${SERVER_PORT}`)
    );
  })
  .catch((e) => {
    console.log(`Server isn't running, error: ${e.message}`);
  });
