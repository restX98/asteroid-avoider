const axios = require("axios");

const apiKey = process.env.NASA_API_KEY;
const baseUrl = process.env.ASTEROIDS_NEOWS_API_BASE_URL;

/**
 * Maps the raw asteroid object to a simplified structure.
 * @param {Object} asteroid - The asteroid data from the API.
 * @returns {Object} - Mapped asteroid data.
 */
const mapAsteroidData = (asteroid) => ({
  id: asteroid.id,
  name: asteroid.name,
  diameter: {
    min: Number(asteroid.estimated_diameter.meters.estimated_diameter_min),
    max: Number(asteroid.estimated_diameter.meters.estimated_diameter_max),
    unit: "m",
  },
  velocity: {
    value: Number(
      asteroid.close_approach_data[0].relative_velocity.kilometers_per_hour
    ),
    unit: "km/h",
  },
  miss_distance: {
    value: Number(asteroid.close_approach_data[0].miss_distance.kilometers),
    unit: "km",
  },
  is_potentially_hazardous: asteroid.is_potentially_hazardous_asteroid,
});

/**
 * Retrieves asteroid data for a specific date segment from the NASA API.
 * @param {Object} startDate - start date as strings.
 * @param {Object} endDate - end date as strings.
 * @param {Object} segment - Contains start and end dates as strings.
 * @param {string} apiKey - Your NASA API key.
 * @param {string} baseUrl - The NASA API base URL.
 * @returns {Promise<Object>} - The API response data.
 */
const getAsteroidDataByDate = async (startDate, endDate) => {
  const feedUrl = `${baseUrl}/feed?start_date=${startDate}&end_date=${endDate}&api_key=${apiKey}`;
  const response = await axios.get(feedUrl);
  return response.data;
};

module.exports = { mapAsteroidData, getAsteroidDataByDate };
