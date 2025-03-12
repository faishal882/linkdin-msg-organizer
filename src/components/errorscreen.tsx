"use client";

import type React from "react";
import "./stylesheets/errorscreen.css";

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
      <h2 className="error-title">Unable to Load Messages</h2>
      <p className="error-message">{message}</p>
      <button onClick={retryFunction} className="retry-button">
        Try Again
      </button>
    </div>
  );
};

export default ErrorScreen;
