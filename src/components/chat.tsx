"use client";

import React from "react";
import { FaArrowLeft } from "react-icons/fa";

interface ChatProps {
  chat: {
    name: string;
    thread_url: string;
    messages: string[];
  } | null;
  goBack: () => void;
}

const ChatComponent: React.FC<ChatProps> = ({ chat, goBack }) => {
  const handleReplyAtLinkedIn = () => {
    if (chat?.thread_url) {
      window.open(chat.thread_url, "_blank");
    }
    console.log("Force refresh triggered");
  };

  // Safety check for when chat is undefined or null
  if (!chat) {
    return (
      <div className="flex flex-col w-full bg-gray-50 p-4 min-h-screen">
        {/* Header Section */}
        <div className="flex items-center mb-4 border-b border-gray-200 pb-4">
          <button
            className="text-gray-600 hover:text-indigo-600 focus:outline-none"
            onClick={goBack}
          >
            <FaArrowLeft size={18} />
          </button>
          <div className="flex-grow flex items-center justify-center text-gray-500">
            No chat selected
          </div>
        </div>

        {/* Empty State */}
        <div className="flex-grow flex items-center justify-center text-gray-500">
          No messages to display
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col w-full bg-gray-50 p-4 min-h-screen">
      {/* Header Section */}
      <div className="flex items-center mb-4 border-b border-gray-200 pb-4">
        {/* Back Arrow */}
        <button
          className="text-gray-600 hover:text-indigo-600 focus:outline-none mr-3"
          onClick={goBack}
        >
          <FaArrowLeft size={18} />
        </button>
        {/* Profile Avatar and Name */}
        <div className="flex items-center">
          <div className="w-10 h-10 rounded-full bg-indigo-500 text-white flex items-center justify-center font-bold text-lg mr-3">
            {chat.name.charAt(0).toUpperCase()}
          </div>
          <div className="text-lg font-medium text-gray-800">{chat.name}</div>
        </div>
      </div>

      {/* Chat Messages */}
      <div className="flex-grow overflow-y-auto">
        {chat.messages && chat.messages.length > 0 ? (
          chat.messages.map((msg, index) => (
            <div
              key={index}
              className="p-4 bg-white rounded-lg shadow-md mb-2 max-w-[80%] text-gray-800 break-words"
            >
              {msg}
            </div>
          ))
        ) : (
          <div className="flex-grow flex items-center justify-center text-gray-500">
            No messages in this conversation
          </div>
        )}
      </div>

      {/* Reply Button */}
      <button
        className="mt-4 w-full py-3 bg-indigo-500 text-white font-medium rounded-lg hover:bg-indigo-600 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition duration-200"
        onClick={handleReplyAtLinkedIn}
      >
        Reply at LinkedIn
      </button>
    </div>
  );
};

export default ChatComponent;
