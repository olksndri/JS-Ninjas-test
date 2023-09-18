const express = require("express");
const cors = require("cors");
const logger = require("morgan");

const heroesRouter = require("./routes/heroes-router");

const app = express();
const formatsLogger = app.get("env") === "development" ? "dev" : "short";

app.use(express.json());
app.use(cors());
app.use(logger(formatsLogger));

app.use("/api/heroes", heroesRouter);

app.use((req, res, next) => {
  res.status(404).json({ message: "Not Found" });
});

app.use((err, req, res, next) => {
  const { status = 500, message = "Server Error" } = err;
  res.status(status).json({ message });
});

module.exports = app;
