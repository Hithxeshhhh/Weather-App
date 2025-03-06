import "./Cities.css";
import React, { useEffect, useState } from "react";
import axios from "axios";

function Cities() {

  const [searchQuery, setSearchQuery] = useState("");
  const [cityWeather, setCityWeather] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [cities, setCities] = useState([
    { name: "Madrid", temp: "31°C" },
    { name: "Ohio", temp: "31°C" },
    { name: "Las Vegas", temp: "31°C" },
    { name: "New Orleans", temp: "31°C" },
  ]);

  
  const fetchWeatherData = async (cityName) => {
    try {
      const response = await axios.get(`http://localhost:5000/weather?city=${cityName}`);
      const { temperature, condition } = response.data;
      return { temp: `${temperature}°C`, condition };
    } catch (err) {
      console.error(err);
      return { temp: "N/A", condition: "Error fetching data" };
    }
  };

  
  const updateCitiesWeather = async () => {
    setLoading(true);
    try {
      const updatedCities = await Promise.all(
        cities.map(async (city) => {
          const weatherData = await fetchWeatherData(city.name);
          return {
            ...city,
            temp: weatherData.temp,
            condition: weatherData.condition,
          };
        })
      );
      setCities(updatedCities);
    } catch (err) {
      setError("Failed to fetch weather data");
    } finally {
      setLoading(false);
    }
  };

 
  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  
  const fetchWeatherForSearchedCity = async () => {
    if (!searchQuery) return;

    setLoading(true);
    setError("");
    try {
      
      const response = await axios.get(`http://localhost:5000/weather?city=${searchQuery}`);

      
      const data = response.data;
      const newCity = {
        name: searchQuery,
        temp: `${data.temperature}°C`,
        condition: data.condition,
      };

      
      setCities((prevCities) => {
        const updatedCities = [...prevCities];
        const existingCityIndex = updatedCities.findIndex(
          (city) => city.name.toLowerCase() === searchQuery.toLowerCase()
        );

        if (existingCityIndex > -1) {
         
          updatedCities[existingCityIndex] = newCity;
        } else {
          
          updatedCities.push(newCity);
        }

        return updatedCities;
      });

      
      setCityWeather(newCity);

    } catch (err) {
      setError("City not found or there was an error fetching the weather.");
      setCityWeather(null);
    } finally {
      setLoading(false);
    }
  };

 
  const handleSearchSubmit = (event) => {
    event.preventDefault(); 
    fetchWeatherForSearchedCity();
  };

 
  useEffect(() => {
    updateCitiesWeather();
  }, []);

  return (
    <div className="mainBox">
      
      
      <div className="search">
        <input
          type="text"
          id="cityname"
          placeholder="Enter City Name"
          spellCheck="false"
          value={searchQuery}
          onChange={handleSearchChange}
        />
        
        <button onClick={handleSearchSubmit}>
          <span className="material-symbols-outlined">
            <img
              src="src/assets/weatherImages/search.png"
              className="searchIcon"
              alt="Search Icon"
            />
          </span>
        </button>
      </div>

    
      {error && <p className="error-message">{error}</p>}

      {loading && <p>Loading...</p>}
      
      <div className="sampleCities">
        {cities.map((city, index) => (
          <div className="citiesList" key={index}>
            <img src="src/assets/weatherImages/clear.png" alt="Weather Icon" />
            <p className="city-name">{city.name}</p>
            <p className="temp">{city.temp}</p>
            
          </div>
        ))}
      </div>
    </div>
  );
}

export default Cities;
