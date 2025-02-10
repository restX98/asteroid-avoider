const axios = require("axios");

const dateRegex = /^\d{4}-\d{2}-\d{2}$/;

const getAsteroids = async (req, res) => {
  try {
    const { start_date, end_date } = req.query;
    if (!start_date || !end_date) {
      return res.status(400).json({
        error:
          "Both start_date and end_date query parameters are required in the format YYYY-MM-DD.",
      });
    }

    if (!dateRegex.test(start_date) || !dateRegex.test(end_date)) {
      return res.status(400).json({
        error: "Both start_date and end_date must be in the format YYYY-MM-DD.",
      });
    }

    let startDate = null;
    let endDate = null;
    try {
      startDate = new Date(start_date);
      endDate = new Date(end_date);
    } catch {
      return res.status(400).json({
        error: "Invalid date.",
      });
    }

    if (startDate > endDate) {
      return res.status(400).json({
        error: "start_date must be before or equal to end_date.",
      });
    }

    const apiKey = process.env.NASA_API_KEY;
    const feedUrl = `https://api.nasa.gov/neo/rest/v1/feed?start_date=${start_date}&end_date=${end_date}&api_key=${apiKey}`;

    const feedResponse = await axios.get(feedUrl);
    const feedData = feedResponse.data;

    const nearEarthObjects = feedData.near_earth_objects;

    let asteroidDetailPromises = [];

    Object.keys(nearEarthObjects).forEach((date) => {
      const asteroids = nearEarthObjects[date];
      asteroids.forEach((asteroid) => {
        if (asteroid.links && asteroid.links.self) {
          const detailUrl = asteroid.links.self;
          asteroidDetailPromises.push(axios.get(detailUrl));
        }
      });
    });

    const asteroidDetailResponses = await Promise.all(asteroidDetailPromises);
    const result = asteroidDetailResponses.map((response) => {
      const asteroidData = response.data;
      const orbitalData = asteroidData.orbital_data || {};
      return {
        name: asteroidData.name,
        M0: orbitalData.mean_anomaly,
        P: orbitalData.orbital_period,
        e: orbitalData.eccentricity,
        a: orbitalData.semi_major_axis,
        N: orbitalData.ascending_node_longitude,
        w: orbitalData.perihelion_argument,
        i: orbitalData.inclination,
      };
    });

    res.json(result);
  } catch (error) {
    console.error("Error fetching asteroids:", error);
    res.status(500).json({ error: "Failed to retrieve asteroid data" });
  }
};

module.exports = { getAsteroids };
