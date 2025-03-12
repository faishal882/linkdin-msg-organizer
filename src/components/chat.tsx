import React, { useState } from "react";
import "./chat.css";

interface ChatProps {
  chat: any;
  goBack: any;
}

const ChatComponent: React.FC<ChatProps> = ({ chat, goBack }) => {
  const [messages, setMessages] = useState([
    { text: "Hey, how are you?", role: "user" },
    { text: "I am doing great, thanks.", role: "ai" },
    { text: "What is the meaning of life?", role: "user" },
    { text: "Seeking fulfillment and personal growth.", role: "ai" },
  ]);
  const [input, setInput] = useState("");

  const sendMessage = () => {
    if (input.trim() === "") return;
    setMessages([...messages, { text: input, role: "user" }]);
    setInput("");
  };

  return (
    <div className="chat-container">
      {/* Header */}
      <div className="chat-header">
        <button onClick={goBack} className="back-button">
          ← Back
        </button>
        <h2>{chat.name}</h2>
      </div>

      {/* Chat Messages */}
      <div className="chat-messages">
        {messages.map((msg, index) => (
          <div key={index} className={`chat-bubble ${msg.role}`}>
            {msg.text}
          </div>
        ))}
      </div>

      {/* Input Field */}
      <div className="chat-input">
        <input
          type="text"
          placeholder="Insert your question here..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && sendMessage()}
        />
        <button onClick={sendMessage}>➤</button>
      </div>
    </div>
  );
};

export default ChatComponent;
