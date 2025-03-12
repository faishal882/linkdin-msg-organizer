import React from "react";
import "./stylesheets/chatlist.css";

interface ChatListProps {
  onSelectChat: (chat: { name: string; messages: string[] }) => void;
  chats: { name: string; messages: string[] }[];
}

const MAX_MESSAGE_LENGTH = 30; // Characters to show before truncating

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
          <option>All Chats</option>
          <option>Unread Messages</option>
          <option>Archived</option>
        </select>
        <button className="chatlist-settings">⚙️ Settings</button>
      </div>

      {/* Chat List Items */}
      {chats &&
        chats.map(
          (chat, index) =>
            chat.messages.length > 0 && (
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
                    {truncateMessage(chat.messages[0] || "No messages yet")}
                  </div>
                </div>
              </div>
            )
        )}
    </div>
  );
};

export default ChatList;
