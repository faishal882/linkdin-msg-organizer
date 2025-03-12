// src/components/chatlist.tsx
"use client";
import type React from "react";
import { FiSettings } from "react-icons/fi";
import "./stylesheets/chatlist.css";

interface ChatListProps {
  onSelectChat: (chat: {
    name: string;
    thread_url: string;
    messages: string[];
  }) => void;
  chats: { name: string; thread_url: string; messages: string[] }[];
  hardRefresh: () => void;
}

const MAX_MESSAGE_LENGTH = 30;

const truncateMessage = (message: string) => {
  if (message.length > MAX_MESSAGE_LENGTH) {
    return `${message.substring(0, MAX_MESSAGE_LENGTH)}...`;
  }
  return message;
};

const ChatList: React.FC<ChatListProps> = ({
  onSelectChat,
  chats,
  hardRefresh,
}) => {
  return (
    <div className="chatlist-container">
      {/* Header Section */}
      <div className="chatlist-header">
        <select className="chatlist-dropdown">
          <option>All Messages</option>
          <option>Unread</option>
          <option>Archived</option>
        </select>
        <button className="chatlist-settings">
          <FiSettings />
        </button>
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
      {/* Full-width Button */}
      <button className="full-width-button" onClick={hardRefresh}>
        Hard Refresh
      </button>
    </div>
  );
};

export default ChatList;
