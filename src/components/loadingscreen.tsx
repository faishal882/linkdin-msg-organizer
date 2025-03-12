import React from "react";
import "./stylesheets/loadingscreen.css"; // CSS file for styling

const LoadingScreen = () => {
  return (
    <div className="loading-container">
      <div className="loader"></div>
      <p className="loading-text">Scraping...</p>
    </div>
  );
};

export default LoadingScreen;
