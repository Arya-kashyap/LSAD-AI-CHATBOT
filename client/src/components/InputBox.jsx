import React, { useState, useEffect, useRef } from "react";
import { Mic, MicOff, Send } from "lucide-react";
import FileUpload from "./FileUpload";
import axios from "axios";
const BACKEND_URL = import.meta.env.VITE_BACKEND_URL

function InputBox({ setMessages, setLoading, loading, setTypeMessage }) {
  // 🎙️ Voice recognition state
  const [message, setMessage] = useState("");
  const [listening, setListening] = useState(false);
  const recognitionRef = useRef(null);

  // 🎙️ Setup browser speech recognition
  useEffect(() => {
    const SpeechRecognition =
      window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) return;

    const recognition = new SpeechRecognition();
    recognition.continuous = true;
    recognition.interimResults = true;
    recognition.lang = "en-US";

    recognition.onresult = (event) => {
      let interim = "";
      let final = "";
      for (let i = event.resultIndex; i < event.results.length; i++) {
        const transcript = event.results[i][0].transcript;
        if (event.results[i].isFinal) {
          final += transcript + " ";
        } else {
          interim += transcript;
        }
      }
      setMessage(final + interim); // Live transcription
    };

    recognitionRef.current = recognition;
  }, []);

  // 🎙️ Toggle voice input
  const handleToggleListening = () => {
    if (!recognitionRef.current) return;
    if (!listening) {
      recognitionRef.current.start();
      setListening(true);
    } else {
      recognitionRef.current.stop();
      setListening(false);
    }
  };

  // 📁 File upload handler
  const handleUpload = (file) => {
    console.log("Uploading:", file.name);
    // You can send this to backend or preview it
  };

  // 📤 Send message to backend
  const handleSend = async () => {
    const trimmed = message.trim();
    if (!trimmed) return;

    setTypeMessage(trimmed);
    setMessage("");
    setLoading(true);

    try {
      const token = localStorage.getItem("token");

      const response = await axios.post(
        `${BACKEND_URL}/api/prompts/prompt`,
        { content: trimmed },
        {
          headers: { Authorization: `Bearer ${token}` },
          withCredentials: true,
        }
      );

      setMessages((prev) => [
        ...prev,
        { role: "user", content: trimmed },
        { role: "assistant", content: response.data.reply },
      ]);
    } catch (error) {
      console.error("Prompt error:", error);
      setMessages((prev) => [
        ...prev,
        { role: "user", content: trimmed },
        {
          role: "assistant",
          content:
            "Sorry, I couldn't process your request. Please try again later.",
        },
      ]);
    } finally {
      setLoading(false);
      setTypeMessage(null);
    }
  };

  return (
    <section
      className="max-w-4xl mx-auto border shadow-2xl dark:border-gray-700 p-2 rounded-3xl bg-gray-100 dark:bg-gray-800"
      aria-label="Chat input section"
    >
      <div className="flex flex-col w-full bg-transparent rounded-3xl p-1">
        {/* 📝 Text Input */}
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSend()}
          placeholder="Ask a question..."
          aria-label="Type your message"
          className="flex-grow w-full focus:outline-none bg-transparent text-black dark:text-gray-100 placeholder-gray-700 dark:placeholder-gray-400 rounded-lg"
        />

        {/* 🔘 Action Buttons */}
        <div className="flex items-center justify-end w-full mt-2 px-4 space-x-4">
          {/* 📁 File Upload */}
          <button
            onClick={() => {}}
            aria-label="Upload file"
            className="ml-2 text-indigo-600 hover:text-indigo-800"
          >
            <FileUpload className="w-5 h-5" onUpload={handleUpload} />
          </button>

          {/* 🎙️ Voice Toggle */}
          <button
            onClick={handleToggleListening}
            aria-label={listening ? "Stop voice input" : "Start voice input"}
            className={`${
              listening
                ? "text-red-800"
                : "text-indigo-600 hover:text-indigo-800"
            }`}
          >
            {listening ? <MicOff className="w-5 h-5" /> : <Mic className="w-5 h-5" />}
          </button>

          {/* 📤 Send Button */}
          <button
            onClick={handleSend}
            disabled={loading || !message.trim()}
            aria-label="Send message"
            className={`ml-2 ${
              loading || !message.trim()
                ? "text-gray-400 cursor-not-allowed"
                : "text-indigo-600 hover:text-indigo-800"
            }`}
          >
            <Send className="w-5 h-5" />
          </button>
        </div>
      </div>
    </section>
  );
}

export default InputBox;
