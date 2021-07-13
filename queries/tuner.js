const db = require("../db/dbConfig.js");

const getTuner = async () => {
  try {
    const allTunes = await db.any("SELECT * FROM tuner");
    return allTunes;
  } catch (err) {
    return err;
  }
};

const getTune = async (id) => {
  try {
    const oneTune = await db.one("SELECT * FROM tuner WHERE id=$1", id);
    return oneTune;
  } catch (e) {
    return e;
  }
};

const createTune = async (tune) => {
  try {
    if (!tune.name) {
      throw 'You must specify a value for "name"';
    }
    const newTune = await db.one(
      "INSERT INTO tuner (name, artist, album, time, is_favorite) VALUES($1, $2, $3, $4, $5) RETURNING *",
      [tune.name, tune.artist, tune.album, tune.time, tune.is_favorite]
    );
    return newTune;
  } catch (e) {
    return e;
  }
};

const updateTune = async (id, tune) => {
  try {
    return await db.one(
      "UPDATE tuner SET name = $1, artist = $2, album = $3, time = $4, is_favorite = $5 WHERE id=$6 RETURNING *;",
      [tune.name, tune.artist, tune.album, tune.time, tune.is_favorite, id]
    );
  } catch (e) {
    return e;
  }
};

const deleteTune = async (id) => {
  try {
    return await db.one("DELETE FROM tuner WHERE id=$1 RETURNING *;", id);
  } catch (e) {
    return e;
  }
};

module.exports = {
  getTuner,
  getTune,
  createTune,
  updateTune,
  deleteTune,
};
