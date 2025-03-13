"use client";

import React from "react";

interface ErrorScreenProps {
  message: string | null;
  retryFunction: () => void;
}

const ErrorScreen: React.FC<ErrorScreenProps> = ({
  message,
  retryFunction,
}) => {
  return (
    <div className="flex flex-col items-center justify-center w-full bg-gray-50 p-4 min-h-screen">
      {/* Error Title */}
      <h2 className="text-2xl font-bold text-gray-800 mb-3">
        Unable to Load Messages
      </h2>

      {/* Error Message */}
      <p className="text-gray-600 text-center mb-6">{message}</p>

      {/* Retry Button */}
      <button
        className="px-6 py-3 bg-indigo-500 text-white font-medium rounded-lg hover:bg-indigo-600 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition duration-200"
        onClick={retryFunction}
      >
        Try Again
      </button>
    </div>
  );
};

export default ErrorScreen;
