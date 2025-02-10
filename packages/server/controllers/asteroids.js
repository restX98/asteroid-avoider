const axios = require("axios");

const getAsteroids = async (req, res) => {
  try {
    const apiKey = process.env.NASA_API_KEY;
    const nasaApiUrl = `https://api.nasa.gov/neo/rest/v1/feed?start_date=2000-01-01&end_date=2000-01-02&api_key=${apiKey}`;

    const response = await axios.get(nasaApiUrl);

    res.json(response.data);
  } catch (error) {
    console.error("Error fetching asteroids:", error);
    res.status(500).json({ error: "Failed to retrieve asteroid data" });
  }
};

module.exports = { getAsteroids };
