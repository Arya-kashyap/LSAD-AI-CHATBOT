import { useState } from "react";
import ChatInterface from "./ChatInterface";
import InputBox from "./InputBox";

const MainContent = ({ messages, handleSend, setMessages }) => {

  const [loading, setLoading] = useState(false);
  const [typeMessage, setTypeMessage] = useState("");

  return (
    // Semantic <main> for SEO and accessibility
    <main
      className="flex flex-col flex-1 w-screen h-full bg-white dark:bg-gray-900 text-black dark:text-gray-100 pt-14 pb-2"
      role="main"
      aria-label="Chat interface"
    >
      {/* Chat Area */}
      <section
        className="flex-1 overflow-y-auto scrollbar-thin space-y-5 scrollbar-thumb-gray-400 scrollbar-track-transparent px-6"
        aria-label="Conversation history"
      >
        <ChatInterface messages={messages} setMessages={setMessages} loading={loading} typeMessage={typeMessage}/>
      </section>

      {/* Input Box */}
      <section className="px-3" aria-label="Message input">
        <InputBox onSend={handleSend} messages={messages} setMessages={setMessages} loading={loading} setLoading={setLoading} setTypeMessage={setTypeMessage}/>
      </section>

      {/* Footer Disclaimer */}
      <footer
        className="flex items-center justify-center w-full px-6 py-2 text-sm text-gray-800 dark:text-gray-300 text-center"
        aria-label="Disclaimer"
      >
        <p>
          AI Chatbot may generate inaccurate information. Please verify important details. See{" "}
          <a href="#" className="underline text-blue-600 dark:text-blue-400">
            Cookie Preferences
          </a>
          .
        </p>
      </footer>
    </main>
  );
};

export default MainContent;
