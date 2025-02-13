import axios from "axios";
const apiUrl = import.meta.env.VITE_API_URL;

export async function fetchAsteroids({ startDate, endDate }) {
  const response = await axios.get(
    `${apiUrl}/api/asteroids?start_date=${startDate}&end_date=${endDate}`
  );
  return response.data;
}

export async function fetchAsteroidDetails({ asteroidId }) {
  const response = await axios.get(`${apiUrl}/api/asteroids/${asteroidId}`);
  return response.data;
}
