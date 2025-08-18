import React, { useState } from 'react'
import Sidebar from './Sidebar'
import Navbar from './Navbar'
import ChatInterface from './ChatInterface'
import InputBox from './InputBox'

function Home() {
     const [showSidebar, setShowSidebar] = useState(true);
     const toggleSidebar = () => setShowSidebar(!showSidebar);
     const [messages, setMessages] = useState([]);
     console.log(showSidebar);


     const handleSend = (msg) => {
          setMessages([...messages, { role: 'user', content: msg }, { role: 'ai', content: 'This is a response.' }]);
     };
     return (
          <div className="flex h-screen bg-gray-50 dark:bg-gray-950 text-gray-900 dark:text-white">
               {showSidebar && <Sidebar showSidebar={toggleSidebar} />}
               <div className="flex flex-col flex-1 mx-auto">
                    <Navbar showSidebar={toggleSidebar} />
                    <ChatInterface messages={messages} />
                    <InputBox onSend={handleSend} />
               </div>
          </div>
     )
}

export default Home
