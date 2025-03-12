"use client";

import type React from "react";
import "./stylesheets/chat.css";

interface ChatProps {
  chat: {
    name: string;
    messages: string[];
  } | null;
  goBack: () => void;
}

const ChatComponent: React.FC<ChatProps> = ({ chat, goBack }) => {
  // Add a safety check for when chat is undefined or null
  if (!chat) {
    return (
      <div className="chat-container">
        <div className="chat-header">
          <button className="back-button" onClick={goBack}>
            Back
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
    <div className="chat-container">
      <div className="chat-header">
        <button className="back-button" onClick={goBack}>
          Back
        </button>
        <div className="chat-title">{chat.name}</div>
      </div>

      <div className="chat-messages">
        {chat.messages && chat.messages.length > 0 ? (
          chat.messages.map((msg: string, index) => (
            <div
              key={index}
              className={`chat-bubble ${index % 2 === 0 ? "user" : "ai"}`}
            >
              {msg}
            </div>
          ))
        ) : (
          <div className="chat-empty-state">
            No messages in this conversation
          </div>
        )}
      </div>
    </div>
  );
};

export default ChatComponent;
