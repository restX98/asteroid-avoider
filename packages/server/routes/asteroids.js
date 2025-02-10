const express = require("express");
const router = express.Router();

// Import the controller that will handle the logic
const { getAsteroids } = require("../controllers/asteroids");

// Define a GET route to fetch asteroids information
router.get("/", getAsteroids);

module.exports = router;
