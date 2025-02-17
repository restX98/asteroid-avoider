const { validateDates } = require("../utils/dateUtils");
const { getAsteroidDataByDate } = require("../services/nasaService");

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

    const asteroidsDataByDate = await getAsteroidDataByDate(startDate, endDate);
    const asteroidsList = Object.keys(asteroidsDataByDate).flatMap(
      (date) => asteroidsDataByDate[date]
    );

    res.json(asteroidsList);
  } catch (error) {
    console.error("Error fetching asteroids:", error);
    if (error.message.includes("Rate limit exceeded")) {
      return res.status(429).json({
        error: "Rate limit exceeded. Please wait a while and try again.",
      });
    }
    res.status(500).json({ error: "Failed to retrieve asteroids." });
  }
};

module.exports = { getAsteroids };
