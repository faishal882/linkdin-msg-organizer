"use client";

import { useState, useEffect } from "react";
import ChatComponent from "@/components/chat";
import ChatList from "@/components/chatlist";
import LoadingScreen from "@/components/loadingscreen";
import ErrorScreen from "@/components/errorscreen";
import { fetchMessages } from "@/utils/fetchmessages";
import "./App.css";

interface Chat {
  name: string;
  thread_url: string;
  messages: string[];
  label: string;
}

const App = () => {
  const [selectedChat, setSelectedChat] = useState<Chat | null>(null);
  const [chats, setChats] = useState<
    { name: string; thread_url: string; messages: string[]; label: string }[]
  >([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const loadMessages = async (force = false) => {
    setError(null);
    await fetchMessages(setChats, setError, setLoading, force);
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
      {selectedChat ? (
        <ChatComponent
          chat={selectedChat}
          goBack={() => setSelectedChat(null)}
        />
      ) : (
        <>
          {loading && <LoadingScreen />}
          {error && (
            <ErrorScreen
              message={error || ""}
              retryFunction={() => loadMessages(true)} // Force refresh
            />
          )}
          {!loading && !error && (
            <ChatList
              onSelectChat={setSelectedChat}
              chats={chats}
              hardRefresh={() => loadMessages(true)}
            />
          )}
        </>
      )}
    </div>
  );
};

export default App;
