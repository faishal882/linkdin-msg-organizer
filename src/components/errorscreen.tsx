import React from "react";
import "./stylesheets/errorscreen.css"; // CSS file for styling

interface ErrorScreenProps {
  message: string;
  retryFunction: () => void;
}

const ErrorScreen: React.FC<ErrorScreenProps> = ({
  message,
  retryFunction,
}) => {
  return (
    <div className="error-container">
      <h2 className="error-title">❌ Error</h2>
      <p className="error-message">{message}</p>
      <button onClick={retryFunction} className="retry-button">
        Retry
      </button>
    </div>
  );
};

export default ErrorScreen;
