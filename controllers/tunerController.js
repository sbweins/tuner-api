const express = require("express");
const tuner = express.Router();
const {
  getTuner,
  getTune,
  createTune,
  updateTune,
  deleteTune,
} = require("../queries/tuner.js");

const {
  RecordNotCreatedError,
  ValidationError,
  customErrorHandler,
} = require("../helper.js");

const validateTune = (req, res, next) => {
  try {
    const { name, artist, album, time, is_favorite } = req.body;

    let isTuneValid = true;
    let errorMsg = "Tune request not formatted correctly: ";

    if (typeof name !== "string") {
      isTuneValid = false;
      errorMsg += "The 'name' field must be of type 'string'";
    }
    if (typeof artist !== "string") {
      isTuneValid = false;
      errorMsg += "The 'artist' field must be of type 'string'";
    }
    if (typeof album !== "string") {
      isTuneValid = false;
      errorMsg += "The 'album' field must be of type 'string'";
    }
    if (typeof time !== "string") {
      isTuneValid = false;
      errorMsg += "The 'time' field must be of type 'string'";
    }
    if (typeof is_favorite !== "boolean") {
      isTuneValid = false;
      errorMsg += "The 'is_favorite' field must be of type 'boolean'";
    }
    if (isTuneValid !== true) {
      throw new ValidationError(errorMsg);
    }
  } catch (e) {
    next(e);
  }
  return next();
};

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

tuner.put("/:id", validateTune, async (req, res, next) => {
  const { id } = req.params;
  try {
    const tune = await updateTune(id, req.body);
    if (tune["id"]) {
      res.json(tune);
    } else {
      const msg = `Record not added to database: ${JSON.stringify(req.body)}`;
      throw new RecordNotCreatedError(msg);
    }
  } catch (e) {
    return next(e);
  }
});

tuner.delete("/:id", async (req, res, next) => {
  const { id } = req.params;
  try {
    const deleted = await deleteTune(id);
    if (deleted.id) {
      res.json(deleted);
    } else {
      const msg = `Record not deleted from database: ${id}`;
      throw new RecordNotCreatedError(msg);
    }
  } catch (e) {
    next(e);
  }
});

tuner.use(customErrorHandler);

module.exports = tuner;
