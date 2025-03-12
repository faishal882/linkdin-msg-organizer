import React, { useState, useEffect } from "react";

import "./stylesheets/chat.css";

interface ChatProps {
  chat: {
    name: string;
    messages: string[];
  };
  goBack: () => void;
}

// src/components/chat.tsx
const ChatComponent: React.FC<ChatProps> = ({ chat, goBack }) => {
  return (
    <div className="chat-container">
      <div className="chat-header">
        <button className="back-button" onClick={goBack}>
          ← Back
        </button>
        <div>{chat.name}</div>
      </div>
      {/* ... rest of component ... */}
    </div>
  );
};

export default ChatComponent;
