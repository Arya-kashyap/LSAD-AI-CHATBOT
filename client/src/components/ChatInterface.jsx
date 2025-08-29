import { Bot } from "lucide-react";
import { useRef, useEffect, useState } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { tomorrow as codeTheme } from "react-syntax-highlighter/dist/esm/styles/prism";

const ChatInterface = ({ messages, setMessages, loading, typeMessage }) => {

  const promptEndRef = useRef(null);
  const bottomRef = useRef(null);


  // 🔄 Scroll to bottom on new message
  useEffect(() => {
    promptEndRef.current?.scrollIntoView({ behavior: "smooth" });
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  return (
    <section
      className={`max-w-4xl mx-auto space-y-8 py-5 ${messages?.length > 0
        ? "overflow-y-auto flex-1"
        : "flex flex-col justify-center items-center h-full"
        }`}
      role="region"
      aria-label="Chat conversation"
    >
      {/* 💬 Render messages */}
      {messages?.length > 0 ? (
        <>
          {messages.map((msg, idx) => (
            <div
              key={idx}
              className={`rounded-lg ${msg.role === "user"
                ? "flex justify-end text-right font-bold text-base py-2 px-3"
                : "px-3 text-left"
                }`}
            >

              {msg.role === "assistant" ? (
                <div className="w-full dark:text-white rounded-xl px-3 py-2 text-base whitespace-pre-wrap">
                  <ReactMarkdown
                    remarkPlugins={[remarkGfm]}
                    components={{
                      code({ inline, className, children, ...props }) {
                        const match = /language-(\w+)/.exec(className || "");
                        return !inline && match ? (
                          <SyntaxHighlighter
                            style={codeTheme}
                            language={match[1]}
                            PreTag="div"
                            className="rounded-lg mt-2"
                            {...props}
                          >
                            {String(children).replace(/\n$/, "")}
                          </SyntaxHighlighter>
                        ) : (
                          <code
                            className="bg-gray-800 px-1 py-0.5 rounded"
                            {...props}
                          >
                            {children}
                          </code>
                        );
                      },
                    }}
                  >
                    {msg.content}
                  </ReactMarkdown>
                </div>
              ) : (
                <div className="max-w-[65%] text-black dark:text-gray-100 bg-gray-100 dark:bg-gray-800 rounded-xl px-3 py-2 text-base whitespace-pre-wrap self-start">
                  {msg.content}
                </div>
              )}
            </div>
          ))}
          {loading && typeMessage && (
            <div className="flex justify-end max-w-[65%] text-black dark:text-gray-100 bg-gray-100 dark:bg-gray-800 rounded-xl px-3 py-2 text-base whitespace-pre-wrap self-end break-words ml-auto">{typeMessage}</div>
          )}

          {loading && (
            <div className="flex justify-start w-full">
              <div className="bg-[#2f2f2f] text-white px-4 py-3 rounded-xl text-sm animate-pulse">
                🤖Loading...
              </div>
            </div>
          )}

        </>
      ) : (
        // 🤖 Empty state greeting
        <div className="flex flex-col items-center justify-center text-center">
          <div className="flex items-center justify-center text-3xl space-x-3">
            <Bot className="text-indigo-900 w-8 h-8" aria-hidden="true" />
            <h2 className="font-semibold">Hi! I'm AI Chatbot</h2>
          </div>
          <p className="text-sm text-gray-700 dark:text-gray-300">
            How can I help you today?
          </p>
        </div>
      )}


      {/* 🔽 Scroll anchor */}
      <div ref={promptEndRef} />
      <div ref={bottomRef} />
    </section>
  );
};

export default ChatInterface;
