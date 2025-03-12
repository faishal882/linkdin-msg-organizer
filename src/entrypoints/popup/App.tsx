import { useState, useEffect } from "react";
import ChatComponent from "@/components/chat";
import ChatList from "@/components/chatlist";
import LoadingScreen from "@/components/loadingscreen";
import ErrorScreen from "@/components/errorscreen";
import { fetchMessages } from "@/utils/fetchmessages";
import "./App.css";

const App = () => {
  interface Chat {
    name: string;
    messages: string[];
  }

  const [selectedChat, setSelectedChat] = useState<Chat | null>(null);
  const [chats, setChats] = useState<{ name: string; messages: string[] }[]>(
    []
  );
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const loadMessages = async (force = false) => {
    setError(null);
    await fetchMessages(setChats, setError, setLoading, force);
  };

  useEffect(() => {
    loadMessages();
  }, []);

  return (
    <div className="app-container">
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
              message={error}
              retryFunction={() => loadMessages(true)} // Force refresh
            />
          )}
          {!loading && !error && (
            <ChatList onSelectChat={setSelectedChat} chats={chats} />
          )}
        </>
      )}
    </div>
  );
};

export default App;
