import axios from "axios";

const BASE_URL = process.env.REACT_APP_API_URL;

const getForecastAPI = async (cityName) => {
  try {
    console.log(cityName);
    const response = await axios.get(`${BASE_URL}&q=${cityName}`, {});

    const forecastData = response.data.list.filter(
      (entry, index) => index % 8 === 0
    );

    return forecastData.map((entry) => ({
      date: entry.dt_txt,
      temperature: entry.main.temp,
      pressure: entry.main.pressure,
      minTemp: entry.main.temp_min,
      maxTemp: entry.main.temp_max,
      humidity: entry.main.humidity,
    }));
  } catch (error) {
    console.error("Error fetching weather data:", error);
    throw error;
  }
};

export default getForecastAPI;
