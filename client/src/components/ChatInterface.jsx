import { Bot } from "lucide-react";
import { useRef, useEffect } from "react";

const ChatInterface = ({ messages }) => {

  // Auto Scrolling Code
  const bottomRef = useRef(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  return (
    <div  className={`max-w-4xl mx-auto space-y-8 py-5
    ${messages && messages.length > 0 ? 'overflow-y-auto flex-1' : 'flex flex-col justify-center items-center h-full'}`}>
      {
        messages && messages.length > 0 ? (
          messages.map((msg, idx) => (
            <div key={idx} className={`rounded-lg  ${msg.role === 'user' ? 'text-right font-bold text-base py-2 px-3 rounded-xl bg-gray-100 dark:bg-gray-800' : 'px-3 text-left'}`}>
              <p className="text-gray-800 dark:text-gray-100">{msg.content}</p>
            </div>
          ))
        ) : (
          <div className='flex  flex-col '>
            <div className='flex items-center justify-center text-3xl space-x-3'>
              <Bot className='text-indigo-800 w-8 h-8' />
              <h2>Hi! I'm AI Chatbot</h2>
            </div>
            <p className='text-sm text-gray-700 dark:text-gray-300'>How can I help you, Today?</p>
          </div>
        )
      }
      <div ref={bottomRef} />
    </div>
  );
};

export default ChatInterface;
