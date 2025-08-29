import { useState } from "react";
import Sidebar from "./Sidebar.jsx";
import MainContent from "./MainContent.jsx";

const Home = ({ visible, toggleSidebar }) => {
  // 💬 State to hold chat messages
  const [messages, setMessages] = useState([]);

  // 🆕 Reset messages for a new chat session
  const handleNewChat = () => {
    setMessages([]);
  };

  // 📤 Handle message send and simulate bot reply
  const handleSend = (msg) => {
    const trimmed = msg.trim();
    if (!trimmed) return;

    const updatedMessages = [...messages, { role: "user", content: trimmed }];

    // Simulated bot response (replace with API call)
    const botReply = {
      role: "assistant",
      content:
        "This is a simulated response. Replace this with your AI backend integration.",
    };

    setMessages([...updatedMessages, botReply]);
  };

  return (
    // Semantic wrapper for layout
    <section
      className="flex w-full h-full bg-gray-50 dark:bg-gray-900"
      role="region"
      aria-label="Chat interface"
    >
      {/* 🧭 Sidebar */}
      {visible && (
        <Sidebar
          newChat={handleNewChat}
          messages={messages}
          visible={visible}
          toggleSidebar={toggleSidebar}
        />
      )}

      {/* 💬 Main Chat Area */}
      <MainContent
        setMessages={setMessages}
        messages={messages}
        handleSend={handleSend}
      />
    </section>
  );
};

export default Home;
