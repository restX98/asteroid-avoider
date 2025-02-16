const { getAsteroidDetailById } = require("../services/nasaService");

/**
 * Controller to retrieve detailed information for a single asteroid.
 * Expects a URL parameter "asteroidId".
 */
const getAsteroidDetail = async (req, res) => {
  try {
    const { asteroidId } = req.params;
    if (!asteroidId) {
      return res.status(400).json({ error: "Asteroid ID is required" });
    }

    const asteroidDetail = await getAsteroidDetailById(asteroidId);

    res.json(asteroidDetail);
  } catch (error) {
    console.error("Error fetching asteroid detail:", error);
    if (error.message.includes("Rate limit exceeded")) {
      return res.status(429).json({
        error: "Rate limit exceeded. Please wait a while and try again.",
      });
    }
    res.status(500).json({ error: "Failed to retrieve asteroid detail" });
  }
};

module.exports = { getAsteroidDetail };
