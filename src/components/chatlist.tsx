"use client";
import React from "react";
import { FiSettings } from "react-icons/fi";

interface ChatListProps {
  onSelectChat: (chat: {
    name: string;
    thread_url: string;
    messages: string[];
  }) => void;
  chats: { name: string; thread_url: string; messages: string[] }[];
  hardRefresh: () => void;
}

const MAX_MESSAGE_LENGTH = 30;

const truncateMessage = (message: string) => {
  if (message.length > MAX_MESSAGE_LENGTH) {
    return `${message.substring(0, MAX_MESSAGE_LENGTH)}...`;
  }
  return message;
};

const ChatList: React.FC<ChatListProps> = ({
  onSelectChat,
  chats,
  hardRefresh,
}) => {
  return (
    <div className="flex flex-col w-full bg-gray-50 p-4 min-h-screen">
      {/* Header Section */}
      <div className="flex justify-between items-center mb-4">
        <select className="px-2 py-1 border border-gray-300 rounded text-sm text-gray-700 focus:outline-none focus:border-indigo-500">
          <option>All Messages</option>
          <option>Unread</option>
          <option>Archived</option>
        </select>
        <button className="text-gray-500 hover:text-gray-700 focus:outline-none">
          <FiSettings size={20} />
        </button>
      </div>

      {/* Chat List Items */}
      {chats && chats.length > 0 ? (
        chats.map(
          (chat, index) =>
            chat.messages.length > 0 && (
              <div
                key={index}
                className="flex items-center p-3 bg-white rounded-lg shadow-sm mb-2 cursor-pointer hover:bg-gray-100 transition duration-200"
                onClick={() => onSelectChat(chat)}
              >
                {/* Chat Icon */}
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-indigo-500 text-white flex items-center justify-center font-bold text-lg">
                  {chat.name.charAt(0).toUpperCase()}
                </div>
                {/* Chat Info */}
                <div className="ml-3 flex-grow">
                  <div className="flex justify-between items-center">
                    <span className="font-medium text-gray-800">
                      {chat.name}
                    </span>
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
