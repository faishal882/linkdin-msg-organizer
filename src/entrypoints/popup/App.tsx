import { useState } from "react";
import reactLogo from "@/assets/react.svg";
import wxtLogo from "/wxt.svg";
import ChatComponent from "@/components/chat";
import ChatList from "@/components/chatlist";
import "./App.css";

const App = () => {
  const [selectedChat, setSelectedChat] = useState(null);

  return (
    <div className="app-container">
      {selectedChat ? (
        <ChatComponent
          chat={selectedChat}
          goBack={() => setSelectedChat(null)}
        />
      ) : (
        <ChatList onSelectChat={setSelectedChat} />
      )}
    </div>
  );
};

export default App;
