const express = require("express");
const tuner = express.Router();
const { getTuner, getTune, createTune } = require("../queries/tuner.js");

tuner.get("/", async (req, res) => {
  const allTuner = await getTuner();
  res.json(allTuner);
});

tuner.get("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const tune = await getTune(id);
    if (tune["id"]) {
      res.json(tune);
    } else {
      console.log(`Database error: ${tune}`);
      throw `There is no tune with id: ${id}`;
    }
  } catch (e) {
    res.status(404).json({ error: "Resource not found.", message: e });
  }
});

tuner.post("/", async (req, res) => {
  try {
    const tune = await createTune(req.body);
    if (tune["id"]) {
      res.json(tune);
    } else {
      console.log(`Database error: ${tune}`);
      throw `Error adding ${req.body} to the database.`;
    }
  } catch (e) {
    res.status(404).json({ error: e });
  }
});

module.exports = tuner;
