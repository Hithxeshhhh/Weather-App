import "./Landing.css";
import React from "react";
import { useNavigate } from "react-router-dom";

function Landing() {
  const navigate = useNavigate();

  const handleGetStarted = () => {
    // Redirect to the interface page
    navigate("/interface");
  };

  return (
    <div className="container">
      <div className="card1">
        <p className="landingIcon">
          <img
            src="src/assets/Umbrellapng.parspng.com-5.png"
            alt="weather"
            className="weatherImage"
          />
        </p>
      </div>
      <div className="card2">
        <p className="title">Breeze</p>
        <p className="subtitle">Weather App</p>
        <button className="get-started" onClick={handleGetStarted}>
          Get Started
        </button>
      </div>
    </div>
  );
}

export default Landing;
