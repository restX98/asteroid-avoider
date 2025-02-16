import axios from "axios";
import { format } from "date-fns";

const apiUrl = import.meta.env.VITE_API_URL;

export async function fetchAsteroids({ startDate, endDate }) {
  const response = await axios.get(
    `${apiUrl}/api/asteroids` +
      `?start_date=${format(startDate, "yyyy-MM-dd")}` +
      `&end_date=${format(endDate, "yyyy-MM-dd")}`
  );
  return response.data;
}

export async function fetchAsteroidDetails({ asteroidId }) {
  const response = await axios.get(`${apiUrl}/api/asteroids/${asteroidId}`);
  return response.data;
}
