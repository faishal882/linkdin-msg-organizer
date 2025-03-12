"use client";

import type React from "react";
import { FaArrowLeft } from "react-icons/fa";
import "./stylesheets/chat.css";

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
    window.open(chat?.thread_url);
    console.log("Force refresh triggered");
  };

  // Add a safety check for when chat is undefined or null
  if (!chat) {
    return (
      <div className="chat-container">
        <div className="chat-header">
          <button className="back-button" onClick={goBack}>
            <FaArrowLeft /> {/* Use the back arrow icon */}
          </button>
          <div className="chat-title">No chat selected</div>
        </div>
        <div className="chat-messages">
          <div className="chat-empty-state">No messages to display</div>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="chat-header">
        <button className="back-button" onClick={goBack}>
          <FaArrowLeft /> {/* Use the back arrow icon */}
        </button>
        <div className="chat-title">{chat.name}</div>
      </div>
      <div className="chat-container">
        <div className="chat-messages">
          {chat.messages && chat.messages.length > 0 ? (
            chat.messages.map((msg: string, index) => (
              <div key={index} className="chat-bubble">
                {msg}
              </div>
            ))
          ) : (
            <div className="chat-empty-state">
              No messages in this conversation
            </div>
          )}
        </div>
        <button className="full-width-button" onClick={handleReplyAtLinkedIn}>
          Reply at LinkedIn
        </button>
      </div>
    </>
  );
};

export default ChatComponent;
