import React from "react";
import "./chatlist.css";

interface ChatProps {
  onSelectChat: any;
}

const ChatList: React.FC<ChatProps> = ({ onSelectChat }) => {
  const chats = [
    {
      name: "Yong Tonghyon",
      time: "11:32 AM",
      message: "What makes it different fro...",
      unread: 2,
    },
    {
      name: "Sarah Miller",
      time: "10:45 AM",
      message: "The project deadline is approachi...",
      unread: 0,
    },
    {
      name: "David Chen",
      time: "9:20 AM",
      message: "Can we schedule a meeting f...",
      unread: 3,
    },
    {
      name: "Emma Thompson",
      time: "8:15 AM",
      message: "I reviewed the proposal and...",
      unread: 0,
    },
    {
      name: "James Wilson",
      time: "Yesterday",
      message: "The client loved our presentation!",
      unread: 0,
    },
  ];

  return (
    <div className="chatlist-container">
      {/* Header Section */}
      <div className="chatlist-header">
        <select className="chatlist-dropdown">
          <option>All Chats</option>
          <option>Unread Messages</option>
          <option>Archived</option>
        </select>
        <button className="chatlist-settings">⚙️ Settings</button>
      </div>

      {/* Chat List Items */}
      {chats.map((chat, index) => (
        <div
          key={index}
          className="chatlist-item"
          onClick={() => onSelectChat(chat)}
        >
          <div className="chatlist-icon">👤</div>
          <div className="chatlist-info">
            <div className="chatlist-header">
              <span className="chatlist-name">{chat.name}</span>
              <span className="chatlist-time">{chat.time}</span>
            </div>
            <div className="chatlist-message">{chat.message}</div>
          </div>
          {chat.unread > 0 && (
            <div className="chatlist-unread">{chat.unread}</div>
          )}
        </div>
      ))}
    </div>
  );
};

export default ChatList;
