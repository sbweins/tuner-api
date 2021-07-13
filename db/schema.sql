DROP DATABASE IF EXISTS tuner_dev;
CREATE DATABASE tuner_dev;

\c tuner_dev;

CREATE TABLE tuner (
    id SERIAL PRIMARY KEY,
    name TEXT,
    artist TEXT,
    album TEXT,
    time TEXT,
    is_favorite BOOLEAN
);