import React from 'react'

function ChatInterface({ messages }) {
     return (
          <div className="flex-1 overflow-y-auto p-6 space-y-4 ">
               {messages.map((msg, idx) => (
                    <div key={idx} className={`p-4 rounded-lg ${msg.role === 'user' ? 'text-right font-bold ' : ' text-left '}`}>
                         <p className="text-gray-800 dark:text-gray-100">{msg.content}</p>
                    </div>
               ))}
          </div>
     )
}

export default ChatInterface
