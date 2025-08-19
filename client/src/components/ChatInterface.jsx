import { Bot } from 'lucide-react'
import React, { useRef, useEffect } from 'react'

function ChatInterface({ messages }) {
     // Auto Scrolling Code
     const bottomRef = useRef(null);

     useEffect(() => {
          bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
     }, [messages]);

     return (
          <div className="flex-1 overflow-y-auto p-6 space-y-4">
               {
                    messages && messages.length > 0 ? (
                         messages.map((msg, idx) => (
                              <div key={idx} className={`p-4 rounded-lg ${msg.role === 'user' ? 'text-right font-bold bg-gray-100 py-1 rounded-xl' : 'text-left'}`}>
                                   <p className="text-gray-800 dark:text-gray-100">{msg.content}</p>
                              </div>
                         ))
                    ) : (
                         <div className='flex flex-col items-center pt-36 md:pt-32'>
                              <div className='flex items-center justify-center text-3xl space-x-3'>
                                   <Bot className='text-indigo-800 w-8 h-8' />
                                   <h2>Hi! I'm AI Chatbot</h2>
                              </div>
                              <p className='text-sm text-gray-700'>How can I help you, Today?</p>
                         </div>
                    )
               }
               <div ref={bottomRef} />
          </div>
     )
}


export default ChatInterface
