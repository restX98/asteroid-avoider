const axios = require("axios");
const { format } = require("date-fns");

const redisClient = require("../redisClient");
const { splitDate, groupDatesInRanges } = require("../utils/dateUtils");

const apiKey = process.env.NASA_API_KEY;
const baseUrl = "https://api.nasa.gov/neo/rest/v1";

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
  const dates = splitDate(startDate, endDate);
  const results = {};
  const missingDates = [];

  const keys = dates.map(
    (date) => `asteroid:feed:${format(date, "yyyy-MM-dd")}`
  );

  if (redisClient.isReady) {
    try {
      const cachedResults = await redisClient.mGet(keys);

      for (let i = 0; i < dates.length; i++) {
        const date = dates[i];
        const cachedData = cachedResults[i];
        if (cachedData) {
          results[date] = JSON.parse(cachedData);
        } else {
          missingDates.push(date);
        }
      }
    } catch (cacheError) {
      console.error("Error retrieving bulk cache:", cacheError);
      missingDates.push(...dates);
    }
  } else {
    missingDates.push(...dates);
  }

  if (missingDates.length === 0) return results;

  try {
    const ranges = groupDatesInRanges(missingDates);

    for (const { min, max } of ranges) {
      const feedUrl = `${baseUrl}/feed?start_date=${format(
        min,
        "yyyy-MM-dd"
      )}&end_date=${format(max, "yyyy-MM-dd")}&api_key=${apiKey}`;
      const response = await axios.get(feedUrl);
      const nearEarthObjectsGroupedByDate = response.data.near_earth_objects;
      for (const date in nearEarthObjectsGroupedByDate) {
        results[date] = nearEarthObjectsGroupedByDate[date].map((asteroid) => {
          return mapAsteroidData(asteroid);
        });

        if (redisClient.isReady) {
          try {
            await redisClient.setEx(
              `asteroid:feed:${date}`,
              3600,
              JSON.stringify(results[date])
            );
          } catch (cacheError) {
            console.error(`Error saving cache for ${date}:`, cacheError);
          }
        }
      }
    }

    return results;
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
  const cacheKey = `asteroid:detail:${asteroidId}`;

  if (redisClient.isReady) {
    try {
      const cachedData = await redisClient.get(cacheKey);
      if (cachedData) {
        return JSON.parse(cachedData);
      }
    } catch (cacheError) {
      console.error("Error retrieving detail from Redis:", cacheError);
    }
  }

  try {
    const detailUrl = `${baseUrl}/neo/${asteroidId}?api_key=${apiKey}`;
    const response = await axios.get(detailUrl);
    const data = mapAsteroidDetailData(response.data);

    if (redisClient.isReady) {
      try {
        await redisClient.setEx(cacheKey, 3600, JSON.stringify(data));
      } catch (cacheError) {
        console.error("Error saving detail data to Redis:", cacheError);
      }
    }

    return data;
  } catch (error) {
    if (error.response && error.response.status === 429) {
      throw new Error("Rate limit exceeded. Please try again later.");
    }
    throw new Error("Failed to fetch asteroid detail");
  }
};

module.exports = {
  getAsteroidDataByDate,
  getAsteroidDetailById,
};
