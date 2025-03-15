"use client";
import React, { useState, useEffect } from "react";
import { FaArrowLeft } from "react-icons/fa";
import { fetchLabels } from "@/utils/fetchlabels";

interface SettingsPageProps {}

const DEFAULT_LABELS = [
  "spam",
  "conversation",
  "greeting",
  "internship",
  "job",
  "other",
];

const SettingsPage: React.FC<SettingsPageProps> = () => {
  const [apiKey, setApiKey] = useState<string>("");
  const [numConversations, setNumConversations] = useState<number | "">(""); // State for number of conversations
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

    // Load saved values from localStorage
    const savedApiKey = localStorage.getItem("geminiApiKey");
    const savedNumConversations = localStorage.getItem("numConversations");
    if (savedApiKey) setApiKey(savedApiKey);
    if (savedNumConversations)
      setNumConversations(Number(savedNumConversations));
  }, []);

  // Handle saving the API key and number of conversations to localStorage
  const handleSaveKey = () => {
    if (!apiKey.trim()) {
      setError("API key cannot be empty");
      return;
    }
    if (
      typeof numConversations !== "number" ||
      !Number.isInteger(numConversations) ||
      numConversations <= 0
    ) {
      setError(
        "Please enter a valid positive integer for the number of conversations"
      );
      return;
    }
    localStorage.setItem("geminiApiKey", apiKey); // Save API key to localStorage
    localStorage.setItem("numConversations", String(numConversations)); // Save number of conversations
    setSuccess("API key and number of conversations saved successfully");
    setError(null);
  };

  // Handle form submission for creating custom labels
  const handleSubmit = async () => {
    setError(null);
    setSuccess(null);
    if (!customLabel.trim()) {
      setError("Label cannot be empty");
      return;
    }
    try {
      // Simulate POST request to create label
      await fetch("http://127.0.0.1:8000/api/create-label/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: customLabel.trim(),
          description: customMessage.trim(),
          api_key: localStorage.getItem("geminiApiKey"),
        }),
      });
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
      <div className="flex items-center mb-4 border-b border-gray-200 pb-4">
        {/* Back Button */}
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
        <p className="text-xs text-gray-500 mt-2">
          Please put Gemini API key because Gemini is used for classification.
        </p>
      </div>

      {/* Number of Conversations Section */}
      <div className="mb-6">
        <label
          htmlFor="num-conversations"
          className="block text-sm font-medium text-gray-700 mb-2"
        >
          Number of Conversations to Scrape
        </label>
        <input
          type="number"
          id="num-conversations"
          value={numConversations}
          onChange={(e) => setNumConversations(Number(e.target.value))}
          placeholder="No of conversation to scrap"
          className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500 transition duration-200"
        />
        <p className="text-xs text-gray-500 mt-2">
          Please put a minimum number(under 100) so that scraping of
          conversations can be easy.
        </p>
      </div>

      {/* Save Key Button */}
      <button
        onClick={handleSaveKey}
        className="mt-4 w-full py-2 bg-indigo-500 text-white font-medium rounded-lg hover:bg-indigo-600 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition duration-200"
      >
        Save Settings
      </button>
      {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
      {success && <p className="text-green-500 text-sm mt-2">{success}</p>}

      {/* Separator Line */}
      <div className="border-t border-gray-200 my-6"></div>

      {/* Custom Label Section */}
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
      </div>

      {/* Available Labels Section */}
      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Available Labels
        </label>
        <div className="space-y-2">
          {availableLabels.map((label, index) => {
            return (
              <div key={index} className="flex items-center space-x-2">
                <div
                  className={`px-2 py-1 rounded-md text-xs font-medium bg-green-100 text-green-700`}
                >
                  {label.charAt(0).toUpperCase() + label.slice(1)}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Save Button for Custom Labels */}
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
