import React from "react";
import "./stylesheets/chat.css";

interface ChatProps {
  chat: {
    name: string;
    messages: string[];
  };
  goBack: () => void;
}

const ChatComponent: React.FC<ChatProps> = ({ chat, goBack }) => {
  return (
    <div className="chat-container">
      <div className="chat-header">
        <button className="back-button" onClick={goBack}>
          ← Back
        </button>
        <div className="chat-title">{chat.name}</div>
      </div>

      <div className="chat-messages">
        {chat.messages.map((msg: string, index) => (
          <div
            key={index}
            className={`chat-bubble ${index % 2 === 0 ? "user" : "ai"}`}
          >
            {msg}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ChatComponent;
