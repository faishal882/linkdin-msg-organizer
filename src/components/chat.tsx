import React, { useState, useEffect } from "react";

import "./stylesheets/chat.css";

interface ChatProps {
  chat: {
    name: string;
    messages: string[];
  };
  goBack: () => void;
}

const ChatComponent: React.FC<ChatProps> = ({ chat }) => {


  return (
    <div className="chat-container">
      {chat.messages.map((msg: string, index) => (
        <div
          key={index}
          className={`message ${index % 2 === 0 ? "user" : "ai"}`}
        >
          {msg}
        </div>
      ))}
    </div>
  );
};

export default ChatComponent;
