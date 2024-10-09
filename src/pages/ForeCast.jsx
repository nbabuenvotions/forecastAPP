import React, { useState, useEffect } from "react";
import getForecastAPI from "./APIS/ForeCastApi";

const Forecast = () => {
  const [city, setCity] = useState("");
  const [forecast, setForecast] = useState([]);
  const [error, setError] = useState(null);

  const fetchWeather = async () => {
    try {
      const data = await getForecastAPI(city);
      setForecast(data);
      setError(null);
    } catch (error) {
      setError("City Not Found");
      setForecast([]);
    }
  };

  useEffect(() => {
    fetchWeather();
  }, []);

  return (
    <div className="weather-container">
      <h2 className="head">Weather in your City</h2>
      <div className="search-bar">
        <input
          type="text"
          placeholder="Enter city name"
          value={city}
          onChange={(e) => setCity(e.target.value)}
        />
        <button onClick={fetchWeather}>search</button>
      </div>

      {error && error !== null && <p>{error}</p>}

      <div className="forecast-tables">
        {forecast.map((day, index) => (
          <div key={index} className="forecast-table">
            <table>
              <thead>
                <tr>
                  <th className="t-background" colSpan="2">
                    Date: {new Date(day.date).toLocaleDateString("en-GB")}
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr className="day-temp">{day.temperature}°C</tr>
                <tr>
                  <td>Min</td>
                  <td>Max</td>
                </tr>
                <td>{day.minTemp}</td>
                <td>{day.maxTemp}</td>
                <tr>
                  <td>pressure</td>
                  <td>{day.pressure}</td>
                </tr>
                <tr>
                  <td>humidity</td>
                  <td>{day.humidity}</td>
                </tr>
              </tbody>
            </table>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Forecast;
