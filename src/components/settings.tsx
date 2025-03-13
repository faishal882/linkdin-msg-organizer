"use client";
import React, { useState } from "react";
import { FaArrowLeft } from "react-icons/fa";

interface SettingsPageProps {
  onClose: () => void; // Callback to close settings
}

const SettingsPage: React.FC<SettingsPageProps> = ({ onClose }) => {
  const [apiKey, setApiKey] = useState<string>("");
  const [customLabel, setCustomLabel] = useState<string>("");
  const [customMessage, setCustomMessage] = useState<string>("");

  const handleSubmit = () => {
    console.log("API Key:", apiKey);
    console.log("Custom Label:", customLabel);
    console.log("Custom Message:", customMessage);
  };

  return (
    <div className="flex flex-col w-full bg-gray-50 p-4 min-h-[500px]">
      {/* Header Section */}
      <div className="flex items-center mb-4 border-b border-gray-200 pb-4">
        {/* Back Button */}
        <button
          className="text-gray-600 hover:text-indigo-600 focus:outline-none mr-3"
          onClick={onClose} // Close settings page
        >
          <FaArrowLeft size={18} />
        </button>
        <h2 className="text-lg font-medium text-gray-800">Settings</h2>
      </div>

      {/* LLM API Key Section */}
      <div className="mb-6">
        <label
          htmlFor="api-key"
          className="block text-sm font-medium text-gray-700 mb-2"
        >
          LLM API Key
        </label>
        <input
          type="password"
          id="api-key"
          value={apiKey}
          onChange={(e) => setApiKey(e.target.value)}
          placeholder="Enter your LLM API key"
          className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500 transition duration-200"
        />
      </div>

      {/* Custom Label Section */}
      <div className="mb-6">
        <label
          htmlFor="custom-label"
          className="block text-sm font-medium text-gray-700 mb-2"
        >
          Custom Label
        </label>
        <div className="space-y-4">
          {/* Label Input */}
          <input
            type="text"
            id="custom-label"
            value={customLabel}
            onChange={(e) => setCustomLabel(e.target.value)}
            placeholder="Internship"
            className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500 transition duration-200"
          />

          {/* Textarea */}
          <div>
            <textarea
              id="custom-message"
              value={customMessage}
              onChange={(e) => setCustomMessage(e.target.value)}
              placeholder="I'm interested in your internship program."
              rows={4}
              className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500 transition duration-200"
            ></textarea>
            <p className="text-xs text-gray-500 mt-1">
              Please provide clear text so that the AI can accurately interpret
              the label.
            </p>
          </div>
        </div>
      </div>

      {/* Save Button */}
      <button
        onClick={handleSubmit}
        className="mt-auto w-full py-3 bg-indigo-500 text-white font-medium rounded-lg hover:bg-indigo-600 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition duration-200"
      >
        Save Changes
      </button>
    </div>
  );
};

export default SettingsPage;
