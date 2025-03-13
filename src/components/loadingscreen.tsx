"use client";

import React from "react";

const LoadingScreen = () => {
  return (
    <div className="flex flex-col items-center justify-center w-full bg-gray-50 p-4 min-h-screen">
      {/* Loader */}
      <div className="w-16 h-16 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin mb-4"></div>

      {/* Loading Text */}
      <p className="text-gray-600 text-lg font-medium">Scraping messages...</p>
    </div>
  );
};

export default LoadingScreen;
