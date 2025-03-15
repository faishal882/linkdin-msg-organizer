"use client";
import React, { useState, useEffect } from "react";
import { fetchLabels } from "@/utils/fetchlabels";

const DEFAULT_LABELS = [
  "spam",
  "conversation",
  "greeting",
  "internship",
  "job",
  "other",
];

const SettingsPage: React.FC = () => {
  const [apiKey, setApiKey] = useState<string>("");
  const [customLabel, setCustomLabel] = useState<string>("");
  const [customMessage, setCustomMessage] = useState<string>("");
  const [availableLabels, setAvailableLabels] = useState<string[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  // Fetch labels on component mount
  useEffect(() => {
    const loadLabels = async () => {
      try {
        const labels = await fetchLabels();
        setAvailableLabels(labels);
      } catch (err) {
        console.error("Error fetching labels:", err);
        setAvailableLabels(DEFAULT_LABELS); // Fallback to default labels
      }
    };
    loadLabels();
  }, []);

  // Handle form submission for creating custom labels
  const handleSubmit = async () => {
    setError(null);
    setSuccess(null);
    if (!customLabel.trim()) {
      setError("Label cannot be empty");
      return;
    }
    try {
      const response = await fetch("http://127.0.0.1:8000/api/create-label/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: customLabel.trim(),
          description: customMessage.trim(),
        }),
      });
      if (!response.ok) {
        throw new Error("Failed to create label");
      }
      setSuccess(`Label "${customLabel}" created successfully`);
      setCustomLabel(""); // Clear the label input
      setCustomMessage(""); // Clear the message input

      // Refresh the list of available labels
      const updatedLabels = await fetchLabels();
      setAvailableLabels(updatedLabels);
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "An unexpected error occurred"
      );
    }
  };

  return (
    <div className="flex flex-col w-full bg-gray-50 p-4 min-h-[500px]">
      {/* Header Section */}
      <div className="flex justify-between items-center mb-4 border-b border-gray-200 pb-4">
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

      {/* Custom Label Creation Section */}
      <div className="mb-6">
        <label
          htmlFor="custom-label"
          className="block text-sm font-medium text-gray-700 mb-2"
        >
          Create Custom Label
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
        {/* Save Button */}
        <button
          onClick={handleSubmit}
          className="mt-4 w-full py-2 bg-indigo-500 text-white font-medium rounded-lg hover:bg-indigo-600 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition duration-200"
        >
          Save Label
        </button>
        {/* Error or Success Messages */}
        {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
        {success && <p className="text-green-500 text-sm mt-2">{success}</p>}
      </div>

      {/* Available Labels Section */}
      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Available Labels
        </label>
        <div className="grid grid-cols-2 gap-2">
          {availableLabels.map((label, index) => (
            <div
              key={index}
              className={`px-3 py-1 rounded-md text-xs font-medium bg-green-100 text-green-700 text-center`}
            >
              {label.charAt(0).toUpperCase() + label.slice(1)}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SettingsPage;
