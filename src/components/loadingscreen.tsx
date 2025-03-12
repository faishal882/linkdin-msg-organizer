// src/components/loadingscreen.tsx
import "./stylesheets/loadingscreen.css";

const LoadingScreen = () => {
  return (
    <div className="loading-container">
      <div className="loader"></div>
      <p className="loading-text">Scraping messages...</p>
    </div>
  );
};

export default LoadingScreen;
