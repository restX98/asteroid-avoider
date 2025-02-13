import { useState, useEffect } from "react";
import { fetchAsteroids } from "@/services/asteroidService";

export function useAsteroids({ startDate, endDate }) {
  const [asteroids, setAsteroids] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function getAsteroidsData() {
      try {
        const data = await fetchAsteroids({ startDate, endDate });
        setAsteroids(data);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    }
    getAsteroidsData();
  }, [startDate, endDate]);

  return { asteroids, loading, error };
}
