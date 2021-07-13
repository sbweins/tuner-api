const cors = require("cors");
const express = require("express");
const tunerController = require("./controllers/tunerController.js");
const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("🎵 🎶 Welcome to Tuner 🎶 🎵");
});

app.use("/songs", tunerController);

app.get("*", (req, res) => {
  res.status(404).send("Page not found");
});

module.exports = app;
