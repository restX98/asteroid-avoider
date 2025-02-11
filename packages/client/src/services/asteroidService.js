import axios from "axios";
const apiUrl = import.meta.env.VITE_API_URL;

export async function fetchAsteroidData({ startDate, endDate }) {
  const response = await axios.get(
    `${apiUrl}/api/asteroids?start_date=${startDate}&end_date=${endDate}`
  );
  return response.data;
}
