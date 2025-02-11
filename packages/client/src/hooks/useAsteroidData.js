import { useState, useEffect } from "react";
import { fetchAsteroidData } from "../services/asteroidService";

export function useAsteroidData({ startDate, endDate }) {
  const [asteroids, setAsteroids] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function getAsteroidsData() {
      try {
        const data = await fetchAsteroidData({ startDate, endDate });
        console.log(data);
        setAsteroids(data);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    }
    getAsteroidsData();
  }, []);

  return { asteroids, loading, error };
}
