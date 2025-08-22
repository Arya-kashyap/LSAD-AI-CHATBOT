import { AudioLines, Mic, MicOff, Plus, Send } from 'lucide-react'
import React, { useState, useEffect, useRef } from 'react'
import FileUpload from './FileUpload';

function InputBox({ onSend }) {
  // Audio Detection code
  const [message, setMessage] = useState('');
  const [listening, setListening] = useState(false);
  const recognitionRef = useRef(null);

  useEffect(() => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
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
      setMessage(final + interim); // live text in input
    };
    recognitionRef.current = recognition;
  }, []);

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

  // File upload code
  const handleUpload = (file) => {
    console.log('Uploading:', file.name);
    // You can send this to backend or preview it
  };
  const fileInputRef = useRef(null);

  const triggerFileInput = () => {
    fileInputRef.current?.click();
  };

  // Input Send
  const handleSend = () => {
    if (message.trim()) {
      onSend(message);
      setMessage('');
    }
  };

  return (
    <div className="max-w-4xl mx-auto border shadow-2xl dark:border-gray-700 p-2 rounded-3xl bg-gray-100 dark:bg-gray-800">
      <div className="flex flex-col w-full bg-transparent rounded-3xl p-1">
        {/* Input area */}
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleSend()}
          placeholder="Ask a question..."
          className="flex-grow  w-full focus:outline-none bg-transparent text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 rounded-lg"
        />
        <div className='flex items-center justify-end w-full mt-2 px-4 space-x-4'>
          {/* File Upload Button */}
          <button
            className="ml-2 text-indigo-600 hover:text-indigo-800 "
          >
            <FileUpload className="w-5 h-5" onUpload={handleUpload} />
          </button>
          {/* Voice Button */}
          <button
            onClick={handleToggleListening}
            className={`${listening ? "text-red-800" : "text-indigo-600 hover:text-indigo-800"} `}
          >
            {listening ? <MicOff className="w-5 h-5" /> : <Mic className="w-5 h-5" />}
          </button>
          {/* Send Button */}
          <button
            onClick={handleSend}
            className="ml-2 text-indigo-600 hover:text-indigo-800 "
          >
            <Send className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  )
}

export default InputBox