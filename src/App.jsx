import Cities from "./components/Cities/Cities";
import Interface from "./components/Content/Interface";
import Landing from "./components/LandingPage/Landing";
import React, { useState } from "react";
import Sidebar from "./components/Sidebars/Sidebar";
import Weather from "./components/SelectCity/Weather";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

function App() {
  // State to hold weather data
  const [weatherData, setWeatherData] = useState({
    city: "Bengaluru",
    temperature: "31",
    humidity: "65%",
    wind: "10 km/h",
    sunrise: "6:00 AM",
    sunset: "6:30 PM",
  });

  const handleWeatherDataUpdate = (data) => {
    setWeatherData(data);
  };

  return (
    <Router>
      <Routes>
        {/* Landing Page Route */}
        <Route path="/" element={<Landing />} />

        {/* Interface Page with Sidebar */}
        <Route
          path="/interface"
          element={
            <>
              <Sidebar />
              <Interface weatherData={weatherData} />
            </>
          }
        />

        {/* Weather Page */}
        <Route
          path="/weather"
          element={
            <>
              <Sidebar />
              <Weather onWeatherDataUpdate={handleWeatherDataUpdate} />
            </>
          }
        />

        {/* Cities Page */}
        <Route
          path="/cities"
          element={
            <>
              <Sidebar />
              <Cities />
            </>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
