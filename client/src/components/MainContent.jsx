import ChatInterface from "./ChatInterface";
import InputBox from "./InputBox";

const MainContent = ({ messages, handleSend }) => {
  return (
    <main className="flex  flex-col flex-1 w-screen h-screen bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 pt-14">
      
      {/* Chat Area */}
      <div className="flex-1 overflow-y-auto scrollbar-thin space-y-5 scrollbar-thumb-gray-400 scrollbar-track-transparent px-6">
        <ChatInterface messages={messages} />
      </div>

      {/* Input Box */}
      <div className="px-3">
        <InputBox onSend={handleSend} />
      </div>

      {/* Footer Message */}
      <div className="flex items-center justify-center w-full px-6 py-2 text-sm text-gray-600 dark:text-gray-300 text-center">
        <p>
          AI Chatbot can make mistakes. Check important info. See <span className="underline">Cookies Preferences</span>
        </p>
      </div>
    </main>
  );
};

export default MainContent;
