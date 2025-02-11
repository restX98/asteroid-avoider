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
    const asteroids = Object.keys(nearEarthObjects).flatMap((date) =>
      nearEarthObjects[date].map((asteroid) => ({
        id: asteroid.id,
        name: asteroid.name,
        diameter: {
          min: Number(
            asteroid.estimated_diameter.meters.estimated_diameter_min
          ),
          max: Number(
            asteroid.estimated_diameter.meters.estimated_diameter_max
          ),
          unit: "m",
        },
        velocity: {
          value: Number(
            asteroid.close_approach_data[0].relative_velocity
              .kilometers_per_hour
          ),
          unit: "km/h",
        },
        miss_distance: {
          value: Number(
            asteroid.close_approach_data[0].miss_distance.kilometers
          ),
          unit: "km",
        },
        is_potentially_hazardous: asteroid.is_potentially_hazardous_asteroid,
      }))
    );

    res.json(asteroids);
  } catch (error) {
    console.error("Error fetching asteroids:", error);
    res.status(500).json({ error: "Failed to retrieve asteroid data" });
  }
};

module.exports = { getAsteroids };
