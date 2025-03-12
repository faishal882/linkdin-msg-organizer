"use client";

import type React from "react";
import "./stylesheets/chatlist.css";

interface ChatListProps {
  onSelectChat: (chat: { name: string; messages: string[] }) => void;
  chats: { name: string; messages: string[] }[];
}

const MAX_MESSAGE_LENGTH = 30;

const truncateMessage = (message: string) => {
  if (message.length > MAX_MESSAGE_LENGTH) {
    return `${message.substring(0, MAX_MESSAGE_LENGTH)}...`;
  }
  return message;
};

const ChatList: React.FC<ChatListProps> = ({ onSelectChat, chats }) => {
  return (
    <div className="chatlist-container">
      {/* Header Section */}
      <div className="chatlist-header">
        <select className="chatlist-dropdown">
          <option>All Messages</option>
          <option>Unread</option>
          <option>Archived</option>
        </select>
        <button className="chatlist-settings">Settings</button>
      </div>

      {/* Chat List Items */}
      {chats && chats.length > 0 ? (
        chats.map(
          (chat, index) =>
            chat.messages.length > 0 && (
              <div
                key={index}
                className="chatlist-item"
                onClick={() => onSelectChat(chat)}
              >
                <div className="chatlist-icon">
                  {chat.name.charAt(0).toUpperCase()}
                </div>
                <div className="chatlist-info">
                  <div className="chatlist-header">
                    <span className="chatlist-name">{chat.name}</span>
                  </div>
                  <div className="chatlist-message">
                    {truncateMessage(chat.messages[0] || "No messages yet")}
                  </div>
                </div>
              </div>
            )
        )
      ) : (
        <div className="chatlist-empty">No messages found</div>
      )}
    </div>
  );
};

export default ChatList;
