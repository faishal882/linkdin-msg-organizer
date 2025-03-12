import React, { useState, useEffect } from "react";

import "./stylesheets/chatlist.css";

interface ChatListProps {
  onSelectChat: (chat: { name: string; messages: string[] }) => void;
  chats: { name: string; messages: string[] }[];
}

const ChatList: React.FC<ChatListProps> = ({ onSelectChat, chats }) => {


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
      {chats &&
        chats.map((chat, index) => (
          <div
            key={index}
            className="chatlist-item"
            onClick={() => onSelectChat(chat)}
          >
            <div className="chatlist-icon">👤</div>
            <div className="chatlist-info">
              <div className="chatlist-header">
                <span className="chatlist-name">{chat.name}</span>
              </div>
              <div className="chatlist-message">
                {chat.messages[0] || "No messages yet"}
              </div>
            </div>
          </div>
        ))}
    </div>
  );
};

export default ChatList;
