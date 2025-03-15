"use client";
import { useState, useEffect } from "react";
import ChatComponent from "@/components/chat";
import ChatList from "@/components/chatlist";
import SpamList from "@/components/spamlist";
import SettingsPage from "@/components/settings";
import LoadingScreen from "@/components/loadingscreen";
import ErrorScreen from "@/components/errorscreen";
import { fetchMessages } from "@/utils/fetchmessages";
import { FiMessageCircle, FiAlertCircle, FiSettings } from "react-icons/fi";

import "./App.css";

interface Chat {
  name: string;
  thread_url: string;
  messages: string[];
  label: string;
}

const App = () => {
  const [selectedChat, setSelectedChat] = useState<Chat | null>(null);
  const [chats, setChats] = useState<Chat[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // State for managing the active tab
  const [activeTab, setActiveTab] = useState<"messages" | "spam" | "settings">(
    "messages"
  );

  // Function to load messages with optional force refresh
  const loadMessages = async (force = false) => {
    setError(null);
    setLoading(true);
    try {
      await fetchMessages(setChats, setError, setLoading, force);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Fetch failed");
    }
  };

  useEffect(() => {
    loadMessages();
  }, []);

  // Reset selectedChat if chats array changes and selectedChat is no longer valid
  useEffect(() => {
    if (selectedChat && chats.length > 0) {
      const chatStillExists = chats.some(
        (chat) => chat.name === selectedChat.name
      );
      if (!chatStillExists) {
        setSelectedChat(null);
      }
    }
  }, [chats, selectedChat]);

  return (
    <div className="app-container min-w-[400px]">
      {/* Header with Tabs */}
      <div className="flex justify-around items-center border-b border-gray-200 py-4 bg-white sticky top-0 z-10">
        {/* Messages Tab */}
        <button
          className={`flex flex-col items-center text-sm ${
            activeTab === "messages"
              ? "text-indigo-600 font-medium"
              : "text-gray-500"
          } hover:text-indigo-600 focus:outline-none`}
          onClick={() => setActiveTab("messages")}
        >
          <FiMessageCircle size={20} />
          Messages
        </button>

        {/* Spam Counter Tab */}
        <button
          className={`flex flex-col items-center text-sm ${
            activeTab === "spam"
              ? "text-indigo-600 font-medium"
              : "text-gray-500"
          } hover:text-indigo-600 focus:outline-none`}
          onClick={() => setActiveTab("spam")}
        >
          <FiAlertCircle size={20} />
          Spam Counter
        </button>

        {/* Settings Tab */}
        <button
          className={`flex flex-col items-center text-sm ${
            activeTab === "settings"
              ? "text-indigo-600 font-medium"
              : "text-gray-500"
          } hover:text-indigo-600 focus:outline-none`}
          onClick={() => setActiveTab("settings")}
        >
          <FiSettings size={20} />
          Settings
        </button>
      </div>

      {/* Content Area */}
      <div className="flex-grow p-2 bg-gray-50 min-h-screen">
        {selectedChat ? (
          <ChatComponent
            chat={selectedChat}
            goBack={() => setSelectedChat(null)}
          />
        ) : (
          <>
            {/* Show Loading Screen if loading */}
            {loading && <LoadingScreen />}
            {/* Show Error Screen if there's an error */}
            {error && (
              <ErrorScreen
                message={error || ""}
                retryFunction={() => loadMessages(true)} // Force refresh
              />
            )}
            {/* Render content based on active tab */}
            {!loading && !error && (
              <>
                {activeTab === "messages" && (
                  <ChatList
                    onSelectChat={setSelectedChat}
                    chats={chats}
                    hardRefresh={() => loadMessages(true)}
                  />
                )}
                {activeTab === "spam" && <SpamList />}
                {activeTab === "settings" && <SettingsPage />}
              </>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default App;
