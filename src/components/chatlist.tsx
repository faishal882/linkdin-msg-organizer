import React, { useState, useEffect } from "react";
import { FiSettings } from "react-icons/fi";
import { fetchLabels } from "@/utils/fetchlabels";

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
const getLabelColor = (
  label: string | undefined,
  availableLabels: string[]
): { bg: string; text: string } => {
  const normalizedLabel = normalizeLabel(label);

  // Helper function to generate random Tailwind CSS color classes
  const getRandomColor = (): { bg: string; text: string } => {
    const colors = [
      { bg: "bg-red-100", text: "text-red-700" },
      { bg: "bg-yellow-100", text: "text-yellow-700" },
      { bg: "bg-green-100", text: "text-green-700" },
      { bg: "bg-blue-100", text: "text-blue-700" },
      { bg: "bg-purple-100", text: "text-purple-700" },
      { bg: "bg-pink-100", text: "text-pink-700" },
      { bg: "bg-indigo-100", text: "text-indigo-700" },
      { bg: "bg-gray-100", text: "text-gray-700" },
    ];
    return colors[Math.floor(Math.random() * colors.length)];
  };

  // Cache generated colors for consistency
  const colorCache: { [key: string]: { bg: string; text: string } } = {};

  if (!colorCache[normalizedLabel]) {
    colorCache[normalizedLabel] = getRandomColor();
  }

  return colorCache[normalizedLabel];
};

const ChatList: React.FC<ChatListProps> = ({
  onSelectChat,
  chats,
  hardRefresh,
  onSettingsClick,
}) => {
  const [filterLabel, setFilterLabel] = useState<string>("all");
  const [availableLabels, setAvailableLabels] = useState<string[]>([]);

  // Fetch labels on component mount
  useEffect(() => {
    const loadLabels = async () => {
      const labels = await fetchLabels();
      setAvailableLabels(labels);
    };
    loadLabels();
  }, []);

  // Filter chats based on selected label
  const filteredChats =
    filterLabel === "all"
      ? chats
      : chats.filter(
          (chat) => normalizeLabel(chat.label) === filterLabel || !chat.label
        );

  return (
    <div className="flex flex-col w-full bg-gray-50 p-4 min-h-screen">
      {/* Header Section */}
      <div className="flex justify-between items-center mb-4">
        {/* Dropdown for Filtering */}
        <select
          value={filterLabel}
          onChange={(e) => setFilterLabel(normalizeLabel(e.target.value))}
          className="px-3 py-2 border border-gray-300 rounded-md text-sm text-gray-700 focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500 transition duration-200"
        >
          <option value="all">All Messages</option>
          {availableLabels.map((label) => (
            <option key={label} value={label}>
              {label.charAt(0).toUpperCase() + label.slice(1)}
            </option>
          ))}
        </select>
        {/* Settings Button */}
        <button
          className="text-gray-500 hover:text-indigo-600 focus:outline-none"
          onClick={onSettingsClick}
        >
          <FiSettings size={20} />
        </button>
      </div>
      {/* Separator Line */}
      <div className="border-b border-gray-200 mb-4"></div>
      {/* Chat List Items */}
      {filteredChats && filteredChats.length > 0 ? (
        filteredChats.map(
          (chat, index) =>
            chat.messages.length > 0 && (
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
                    <span className="font-medium text-gray-800">
                      {chat.name}
                    </span>
                    {/* Label Box */}
                    {chat.label && (
                      <div
                        className={`px-2 py-1 rounded-md text-xs font-medium ${
                          getLabelColor(chat.label, availableLabels).bg
                        } ${getLabelColor(chat.label, availableLabels).text}`}
                      >
                        {chat.label.charAt(0).toUpperCase() +
                          chat.label.slice(1)}
                      </div>
                    )}
                  </div>
                  <div className="text-sm text-gray-600">
                    {truncateMessage(chat.messages[0] || "No messages yet")}
                  </div>
                </div>
              </div>
            )
        )
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
