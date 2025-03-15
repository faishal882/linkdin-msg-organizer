"use client";
import React, { useState, useEffect } from "react";

interface SpamUser {
  username: string;
  profile_url: string;
  spam_count: number;
}

const SpamList: React.FC = () => {
  const [spamUsers, setSpamUsers] = useState<SpamUser[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch spam count data from the API
  const fetchSpamCount = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await fetch(
        "http://127.0.0.1:8000/api/fetch-spam-count/"
      );
      if (!response.ok) {
        throw new Error("Failed to fetch spam count data");
      }
      const data = await response.json();

      // Check if the response contains the expected structure
      if (data.status === "success" && Array.isArray(data.spam_counters)) {
        setSpamUsers(data.spam_counters);
      } else {
        throw new Error("Invalid API response format");
      }
    } catch (err: any) {
      setError(
        err.message || "An error occurred while fetching spam count data"
      );
    } finally {
      setLoading(false);
    }
  };

  // Fetch data when the component mounts
  useEffect(() => {
    fetchSpamCount();
  }, []);

  return (
    <div className="flex flex-col w-full bg-gray-50 p-4 min-h-screen">
      {/* Header Section */}
      <div className="flex items-center mb-4 border-b border-gray-200 pb-4">
        <h2 className="text-lg font-medium text-gray-800">Spam List</h2>
      </div>

      {/* Separator Line */}
      <div className="border-b border-gray-200 mb-4"></div>

      {/* Loading State */}
      {loading && (
        <div className="flex flex-col items-center justify-center w-full bg-gray-50 p-4 min-h-screen">
          <div className="w-16 h-16 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin mb-4"></div>
          <p className="text-gray-600 text-lg font-medium">
            Loading spam data...
          </p>
        </div>
      )}

      {/* Error State */}
      {error && (
        <div className="text-center text-red-500 py-4">
          <p>{error}</p>
        </div>
      )}

      {/* Spam Users List */}
      {!loading && !error && spamUsers.length > 0 ? (
        spamUsers.map((user, index) => (
          <div
            key={index}
            className="flex items-center p-3 bg-white rounded-lg shadow-sm mb-2 cursor-pointer hover:bg-gray-100 transition duration-200"
            onClick={() => window.open(user.profile_url, "_blank")} // Redirect to profile URL
          >
            {/* User Icon */}
            <div className="flex-shrink-0 w-10 h-10 rounded-full bg-indigo-500 text-white flex items-center justify-center font-bold text-lg mr-3">
              {user.username.charAt(0).toUpperCase()}
            </div>

            {/* User Info */}
            <div className="flex-grow ml-3">
              <div className="flex justify-between items-center">
                <span className="font-medium text-gray-800">
                  {user.username}
                </span>
                {/* Spam Count Box */}
                <div
                  className={`px-2 py-1 rounded-md text-xs font-medium bg-red-100 text-red-700`}
                >
                  Spam: {user.spam_count}
                </div>
              </div>
            </div>
          </div>
        ))
      ) : (
        <div className="text-center text-gray-500 py-4">
          No spammers in your network
        </div>
      )}
    </div>
  );
};

export default SpamList;
