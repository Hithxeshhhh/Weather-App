import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const CountrySelect = ({ countries, selectedCountry, onCountryChange }) => (
  <div className="mb-4">
    <label className="block mb-2 text-lg text-white">Select Country:</label>
    <select
      className="w-full p-2 border rounded"
      value={selectedCountry}
      onChange={(e) => onCountryChange(e.target.value)}
    >
      <option value="">-- Select --</option>
      {countries.map((country) => (
        <option key={country} value={country}>
          {country}
        </option>
      ))}
    </select>
  </div>
);


const CitySelect = ({ cities, selectedCity, onCityChange }) => (
  <div className="mb-4">
    <label className="block mb-2 text-lg text-white">Select City:</label>
    <select
      className="w-full p-2 border rounded"
      value={selectedCity}
      onChange={(e) => onCityChange(e.target.value)}
    >
      <option value="">-- Select --</option>
      {cities.map((city) => (
        <option key={city} value={city}>
          {city}
        </option>
      ))}
    </select>
  </div>
);


const WeatherConditionIcon = ({ condition }) => {
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

  return (
    <img
      src={conditionIcons[condition] || "src/assets/weatherImages/clear.png"}
      alt={condition}
      className="weather-icon"
    />
  );
};


const WeatherDisplay = ({ weather, city }) => (
  <div className="bg-blue-100 p-4 rounded shadow mt-4">
    <h2 className="text-xl font-bold mb-2">Weather in {city}</h2>
    <p>Temperature: {weather.temperature}°C</p>
    <p>Condition: {weather.condition}</p>
    <WeatherConditionIcon condition={weather.condition} />
  </div>
);

const Weather = ({ onWeatherDataUpdate }) => {
  const [countries] = useState(["USA", "India", "Australia", "Canada", "Germany", 
    "France", "Japan", "United_Kingdom", "Brazil", "South_Korea", "Russia"]);
  const [selectedCountry, setSelectedCountry] = useState("");
  const [cities, setCities] = useState([]);
  const [selectedCity, setSelectedCity] = useState("");
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate(); 

  const fetchCities = (country) => {
    const countryCities = {
      USA: ["New York", "Los Angeles", "Chicago"],
      India: ["Delhi", "Mumbai", "Bangalore"],
      Australia: ["Sydney", "Melbourne", "Brisbane"],
      Canada: ["Toronto", "Vancouver", "Montreal"],
      Germany: ["Berlin", "Munich", "Hamburg"],
      France: ["Paris", "Lyon", "Marseille"],
      Japan: ["Tokyo", "Osaka", "Kyoto"],
      United_Kingdom: ["London", "Manchester", "Birmingham"],
      Brazil: ["Rio de Janeiro", "São Paulo", "Brasília"],
      South_Korea: ["Seoul", "Busan", "Incheon"],
      Russia: ["Moscow", "St. Petersburg", "Novosibirsk"]

    };
    setCities(countryCities[country] || []);
    setSelectedCity("");
    setWeather(null);
    setError("");
  };

  const fetchWeather = async () => {
    if (!selectedCity) {
      setError("Please select a city before submitting.");
      return;
    }
    setLoading(true);
    setError(""); 
    try {
      const response = await axios.get(
        `http://localhost:5000/weather?city=${selectedCity}`
      );
      const data = response.data;

      
      onWeatherDataUpdate({
        city: selectedCity,
        temperature: data.temperature,
        humidity: data.humidity,
        wind: data.wind,
        sunrise: data.sunrise,
        sunset: data.sunset,
        condition: data.condition,
      });

      setWeather(data); 
      navigate("/interface");
    } catch (err) {
      setError("Error fetching weather data. Please try again.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleCountryChange = (country) => {
    setSelectedCountry(country);
    fetchCities(country);
  };

  const handleCityChange = (city) => {
    setSelectedCity(city);
    setWeather(null); 
  };

  const handleClearSelection = () => {
    setSelectedCountry("");
    setCities([]);
    setSelectedCity("");
    setWeather(null);
    setError("");
  };

  return (
    <div className="p-6 min-h-screen" style={{ backgroundColor: "#0B131E" }}>
      <div
        className="max-w-md mx-auto p-4 rounded shadow"
        style={{
          backgroundColor: "rgba(255, 255, 255, 0.1)",
          backdropFilter: "blur(10px)", 
          WebkitBackdropFilter: "blur(10px)", 
          border: "1px solid rgba(255, 255, 255, 0.3)",
        }}
      >
        
        <CountrySelect
          countries={countries}
          selectedCountry={selectedCountry}
          onCountryChange={handleCountryChange}
        />

        
        {cities.length > 0 && (
          <CitySelect
            cities={cities}
            selectedCity={selectedCity}
            onCityChange={handleCityChange}
          />
        )}

        
        {error && <p className="text-center text-red-500">{error}</p>}

        
        {weather && <WeatherDisplay weather={weather} city={selectedCity} />}

        
        {loading && <p className="text-center text-lg text-white">Loading...</p>}

        
        <button
          className="w-full bg-blue-500 text-white py-2 rounded mt-4"
          onClick={fetchWeather}
        >
          Submit
        </button>

        
        <button
          className="w-full bg-red-500 text-white py-2 rounded mt-4"
          onClick={handleClearSelection}
        >
          Clear Selection
        </button>
      </div>
    </div>
  );
};

export default Weather;
