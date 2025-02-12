const {
  getAsteroidDetailById,
  mapAsteroidDetailData,
} = require("../services/nasaService");

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

    const rawData = await getAsteroidDetailById(asteroidId);
    const mappedData = mapAsteroidDetailData(rawData);

    res.json(mappedData);
  } catch (error) {
    console.error("Error fetching asteroid detail:", error);
    res.status(500).json({ error: "Failed to retrieve asteroid detail" });
  }
};

module.exports = { getAsteroidDetail };
