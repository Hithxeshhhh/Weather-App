import "./Sidebar.css";
import React from "react";
import { Link } from "react-router-dom";

function Sidebar() {
  return (
    <div className="sidebar">
      <div className="sidebarInfo">
        <Link to="/">
        <img
          src="src/assets/Umbrellapng.parspng.com-5.png"
          className="umbrella"
          alt="Umbrella"
        />
        </Link>
        <p className="weatherSidebar">
          <Link to="/interface">
            <img
              src="src/assets/clouds.png"
              className="umbrella"
              alt="Weather"
            />
            Weather
          </Link>
        </p>
        <p className="topCities">
          <Link to="/cities">
            <img
              src="src/assets/list_24dp_E8EAED_FILL0_wght400_GRAD0_opsz24.png"
              className="umbrella"
              alt="Top Cities"
            />
            Top Cities
          </Link>
        </p>
        <p className="topCities">
          <Link to="/weather">
            <img
              src="src/assets/weatherImages/search.png"
              className="scIcon"
              alt="Select Cities"
            />
            Select Cities
          </Link>
        </p>
      </div>
    </div>
  );
}

export default Sidebar;
