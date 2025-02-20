import { useState, useEffect } from "react";
import { fetchAsteroidDetails } from "@/services/asteroidService";

/**
 * Custom hook to manage fetching asteroid detail data.
 * @param {string|number} asteroidId - The asteroid's id.
 * @param {string|number} fetch - Enable fetching.
 * @returns {Object} - Returns the asteroidDetail state, loading state and error state.
 */
export function useAsteroidDetail(asteroidId) {
  const [asteroidDetail, setAsteroidDetail] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!asteroidId) return;

    async function getAsteroidDetails() {
      try {
        setLoading(true);
        const data = await fetchAsteroidDetails({ asteroidId });
        setAsteroidDetail(data);
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
    getAsteroidDetails();
  }, [asteroidId]);

  return { asteroidDetail, loading, error };
}
