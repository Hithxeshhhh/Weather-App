import "./Interface.css";
import React, { useEffect } from "react";
import axios from "axios";

function Interface({ weatherData, onUpdateWeather }) {
  
  const conditionIcons = {
    Clear: "src/assets/weatherImages/clear.png",
    Rain: "src/assets/weatherImages/rain.png",
    Clouds: "src/assets/weatherImages/clouds.png",
    Snow: "src/assets/weatherImages/snow.png",
    Thunderstorm: "src/assets/weatherImages/rain.png",
    Drizzle: "src/assets/weatherImages/rain.png",
    Mist: "src/assets/weatherImages/mist.png",
    Haze: "src/assets/weatherImages/mist.png",
  };


  useEffect(() => {
    const fetchWeatherDetails = async () => {
      if (!weatherData.city) return;

      try {
        const response = await axios.get(
          `http://localhost:5000/weather?city=${weatherData.city}`
        );

        const updatedData = {
          city: response.data.city,
          temperature: response.data.temperature,
          humidity: response.data.humidity,
          wind: response.data.wind,
          sunrise: response.data.sunrise,
          sunset: response.data.sunset,
          condition: response.data.condition,
          description: response.data.description,
        };
      
        onUpdateWeather(updatedData);
      } catch (error) {
        console.error("Error fetching additional weather data:", error);
      }
    };

    fetchWeatherDetails();
  }, [weatherData.city, onUpdateWeather]);


  const weatherIcon = conditionIcons[weatherData?.condition] || "src/assets/weatherImages/clear.png";

  return (
    <div>
      <div className="header">
        <div className="headerInfo">
          <p className="city">{weatherData?.city}</p>
          
          <p className="temperature">{weatherData?.temperature}°C</p>
          <img
            src={weatherIcon}
            className="weatherImage"
            alt={weatherData?.condition || "Weather"}
          />
        </div>
        <div className="footer">
          <p>
            <img src="src/assets/weatherImages/humidity.png" alt="Humidity" />
            Humidity: {weatherData?.humidity}
          </p>
          <p>
            <img src="src/assets/weatherImages/wind.png" alt="Wind" />
            Wind: {weatherData?.wind}
          </p>
          <p>
            <img
              src="src/assets/weatherImages/sunny_24dp_E8EAED_FILL0_wght400_GRAD0_opsz24.png"
              alt="Sunrise"
            />
            Sunrise: {weatherData?.sunrise}
          </p>
          <p>
            <img
              src="src/assets/weatherImages/water_lux_24dp_E8EAED_FILL0_wght400_GRAD0_opsz24.png"
              alt="Sunset"
            />
            Sunset: {weatherData?.sunset}
          </p>
        </div>
      </div>
    </div>
  );
  
}

export default Interface;
