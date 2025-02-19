const express = require("express");
const router = express.Router();

const { getAsteroids } = require("../controllers/asteroids");
const { getAsteroidDetail } = require("../controllers/asteroidDetails");

router.get("/", getAsteroids);

router.get("/:asteroidId", getAsteroidDetail);

module.exports = router;
