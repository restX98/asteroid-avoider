const { validateDates, splitDateRange } = require("../utils/dateUtils");
const {
  mapAsteroidData,
  getAsteroidDataByDate,
} = require("../services/nasaService");

/**
 * Controller to get asteroids. It validates dates, splits date ranges,
 * fetches data for each segment, and deduplicates the results.
 */
const getAsteroids = async (req, res) => {
  try {
    const { start_date, end_date } = req.query;
    let startDate, endDate;
    try {
      ({ startDate, endDate } = validateDates(start_date, end_date));
    } catch (err) {
      return res.status(err.status || 400).json({ error: err.message });
    }
    const dateSegments = splitDateRange(startDate, endDate);

    const segmentPromises = dateSegments.map(({ start, end }) =>
      getAsteroidDataByDate(start, end)
    );
    const responses = await Promise.all(segmentPromises);

    const asteroidMap = new Map();
    responses.forEach((data) => {
      const nearEarthObjects = data.near_earth_objects;
      Object.keys(nearEarthObjects).forEach((date) => {
        nearEarthObjects[date].forEach((asteroid) => {
          if (!asteroidMap.has(asteroid.id)) {
            asteroidMap.set(asteroid.id, mapAsteroidData(asteroid));
          }
        });
      });
    });

    res.json(Array.from(asteroidMap.values()));
  } catch (error) {
    console.error("Error fetching asteroids:", error);
    res.status(500).json({ error: "Failed to retrieve asteroid data" });
  }
};

module.exports = { getAsteroids };
