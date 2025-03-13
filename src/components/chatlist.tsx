"use client";
import React, { useState } from "react";
import { FiSettings } from "react-icons/fi";

interface Chat {
  name: string;
  thread_url: string;
  messages: string[];
  label: string;
}

interface ChatListProps {
  onSelectChat: (chat: Chat) => void;
  chats: Chat[];
  hardRefresh: () => void;
  onSettingsClick: () => void;
}

const MAX_MESSAGE_LENGTH = 30;

// Function to truncate messages
const truncateMessage = (message: string) => {
  if (message.length > MAX_MESSAGE_LENGTH) {
    return `${message.substring(0, MAX_MESSAGE_LENGTH)}...`;
  }
  return message;
};

// Normalize label to lowercase for consistent handling
const normalizeLabel = (label: string | undefined): string => {
  return (label || "").trim().toLowerCase();
};

// Function to dynamically assign colors based on normalized label
const getLabelColor = (label: string | undefined) => {
  const normalizedLabel = normalizeLabel(label);

  const colorMap: { [key: string]: { bg: string; text: string } } = {
    internship: { bg: "bg-green-100", text: "text-green-700" },
    job: { bg: "bg-blue-100", text: "text-blue-700" },
    greeting: { bg: "bg-yellow-100", text: "text-yellow-700" },
    conversation: { bg: "bg-gray-100", text: "text-gray-700" },
    default: { bg: "bg-gray-100", text: "text-gray-700" }, // Fallback for unknown labels
  };

  return colorMap[normalizedLabel] || colorMap["default"];
};

const ChatList: React.FC<ChatListProps> = ({
  onSelectChat,
  chats,
  hardRefresh,
  onSettingsClick,
}) => {
  // State for dropdown filter (normalized)
  const [filterLabel, setFilterLabel] = useState<string>("all");

  // Filter chats based on selected label
  const filteredChats =
    filterLabel === "all"
      ? chats // Show all chats when "All Messages" is selected
      : chats.filter(
          (chat) =>
            normalizeLabel(chat.label) === filterLabel || // Match chats with the selected label
            !chat.label // Include chats with no label (empty or undefined)
        );

  return (
    <div className="flex flex-col w-full bg-gray-50 p-4 min-h-screen">
      {/* Header Section */}
      <div className="flex justify-between items-center mb-4">
        {/* Dropdown for Filtering */}
        <select
          value={filterLabel} // Bind the dropdown value to the state
          onChange={(e) => setFilterLabel(normalizeLabel(e.target.value))} // Update state with normalized value
          className="px-3 py-2 border border-gray-300 rounded-md text-sm text-gray-700 focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500 transition duration-200"
        >
          <option value="all">All Messages</option>
          <option value="internship">Internship</option>
          <option value="job">Job</option>
          <option value="greeting">Greeting</option>
          <option value="conversation">Conversation</option>
        </select>

        {/* Settings Button */}
        <button
          className="text-gray-500 hover:text-indigo-600 focus:outline-none"
          onClick={onSettingsClick} // Open settings page
        >
          <FiSettings size={20} />
        </button>
      </div>

      {/* Separator Line */}
      <div className="border-b border-gray-200 mb-4"></div>

      {/* Chat List Items */}
      {filteredChats && filteredChats.length > 0 ? (
        filteredChats.map((chat, index) => (
          <div
            key={index}
            className="flex items-center p-3 bg-white rounded-lg shadow-sm mb-2 cursor-pointer hover:bg-gray-100 transition duration-200"
            onClick={() => onSelectChat(chat)}
          >
            {/* Chat Icon */}
            <div className="flex-shrink-0 w-10 h-10 rounded-full bg-indigo-500 text-white flex items-center justify-center font-bold text-lg mr-3">
              {chat.name.charAt(0).toUpperCase()}
            </div>

            {/* Chat Info */}
            <div className="flex-grow ml-3">
              <div className="flex justify-between items-center">
                <span className="font-medium text-gray-800">{chat.name}</span>
                {/* Label Box */}
                {chat.label && (
                  <div
                    className={`px-2 py-1 rounded-md text-xs font-medium ${
                      getLabelColor(chat.label).bg
                    } ${getLabelColor(chat.label).text}`}
                  >
                    {chat.label}
                  </div>
                )}
              </div>
              <div className="text-sm text-gray-600">
                {truncateMessage(chat.messages[0] || "No messages yet")}
              </div>
            </div>
          </div>
        ))
      ) : (
        <div className="text-center text-gray-500 py-4">No messages found</div>
      )}

      {/* Full-width Button */}
      <button
        className="mt-auto w-full py-3 bg-indigo-500 text-white font-medium rounded-lg hover:bg-indigo-600 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition duration-200"
        onClick={hardRefresh}
      >
        Hard Refresh
      </button>
    </div>
  );
};

export default ChatList;
