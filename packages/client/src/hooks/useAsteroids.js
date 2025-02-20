import { useState, useEffect } from "react";
import { fetchAsteroids } from "@/services/asteroidService";

/**
 * Custom hook to manage fetching asteroids list.
 * @param {Date} startDate - The asteroid's id.
 * @param {Date} endDate - Enable fetching.
 * @returns {Object} - Returns the asteroids state, loading state and error state.
 */
export function useAsteroids({ startDate, endDate }) {
  const [asteroids, setAsteroids] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!startDate || !endDate) {
      setAsteroids([]);
      return;
    }

    async function getAsteroidsData() {
      try {
        setLoading(true);
        const data = await fetchAsteroids({ startDate, endDate });
        setAsteroids(data);
      } catch (err) {
        const { response } = err;
        setError({
          status: response?.status,
          message: response?.data?.error,
        });
      } finally {
        setLoading(false);
      }
    }
    getAsteroidsData();
  }, [startDate, endDate]);

  return { asteroids, loading, error };
}
