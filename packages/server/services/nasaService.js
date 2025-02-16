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
 * Retrieves asteroid data for a specific range date from the NASA API.
 * @param {Object} startDate - start date as strings.
 * @param {Object} endDate - end date as strings.
 * @returns {Promise<Object>} - The API response data.
 */
const getAsteroidDataByDate = async (startDate, endDate) => {
  try {
    const feedUrl = `${baseUrl}/feed?start_date=${startDate}&end_date=${endDate}&api_key=${apiKey}`;
    const response = await axios.get(feedUrl);
    return response.data;
  } catch (error) {
    if (error.response && error.response.status === 429) {
      throw new Error("Rate limit exceeded. Please try again later.");
    }
    throw new Error("Failed to fetch asteroid data by date");
  }
};

/**
 * Maps the raw asteroid detail data to only the needed orbital parameters.
 * @param {Object} data - The raw asteroid data from the API.
 * @returns {Object} - An object containing the mapped parameters.
 * @throws {Error} - If orbital_data is missing.
 *
 * Mapped fields:
 *   - name: The asteroid name.
 *   - meanAnomaly: Mean anomaly at epoch J2000.0 (in degree).
 *   - orbitalPeriod : Orbital period.
 *   - eccentricity : Orbital eccentricity.
 *   - semiMajorAxis : Semi-major axis.
 *   - ascendingNodeLongitude : Longitude of ascending node (in degree).
 *   - perihelionArgument : Argument of periapsis (in degree).
 *   - inclination : Inclination (in degree).
 */
const mapAsteroidDetailData = (data) => {
  //TODO: Extends with other details to show information on frontend
  if (!data.orbital_data) {
    throw new Error("Orbital data not available");
  }
  const orbitalData = data.orbital_data;
  return {
    name: data.name,
    meanAnomaly: Number(orbitalData.mean_anomaly),
    orbitalPeriod: Number(orbitalData.orbital_period),
    eccentricity: Number(orbitalData.eccentricity),
    semiMajorAxis: Number(orbitalData.semi_major_axis),
    ascendingNodeLongitude: Number(orbitalData.ascending_node_longitude),
    perihelionArgument: Number(orbitalData.perihelion_argument),
    inclination: Number(orbitalData.inclination),
  };
};

/**
 * Calls the NASA API to get detailed information for a single asteroid.
 * @param {string} asteroidId - The ID of the asteroid.
 * @returns {Promise<Object>} - The raw API response data.
 */
const getAsteroidDetailById = async (asteroidId) => {
  try {
    const detailUrl = `${baseUrl}/neo/${asteroidId}?api_key=${apiKey}`;
    const response = await axios.get(detailUrl);
    return response.data;
  } catch (error) {
    if (error.response && error.response.status === 429) {
      throw new Error("Rate limit exceeded. Please try again later.");
    }
    throw new Error("Failed to fetch asteroid detail");
  }
};

module.exports = {
  mapAsteroidData,
  getAsteroidDataByDate,
  mapAsteroidDetailData,
  getAsteroidDetailById,
};
