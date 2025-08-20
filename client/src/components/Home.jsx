import React, { useState } from 'react'
import Sidebar from './Sidebar'
import Navbar from './Navbar'
import ChatInterface from './ChatInterface'
import InputBox from './InputBox'

function Home() {
     // Open Sidebar code
     const [isSidebarOpen, setIsSidebarOpen] = useState(false);
     const showSidebar = () => setIsSidebarOpen(true);
     const hideSidebar = () => setIsSidebarOpen(false);
     
     // Output and Input data
     const [messages, setMessages] = useState([]);
     const handleNewChat = () => {
          setMessages([])
     }
     const handleSend = (msg) => {
          setMessages([...messages, { role: 'user', content: msg }, { role: 'ai', content: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Esse, amet labore enim sed deserunt beatae. Vel, corrupti, ipsum esse possimus magni iure quod, ducimus veritatis ad quibusdam pariatur provident reiciendis hic eveniet? Nemo doloribus tenetur ea culpa deleniti, nostrum placeat dolor explicabo temporibus possimus. Ipsam provident, officiis fugit quisquam, voluptates deleniti ducimus animi libero ratione vitae dignissimos! Culpa a earum impedit maiores alias modi, magni nihil nemo quia. Obcaecati officia earum fuga eos cum qui at eligendi libero! Dolor praesentium velit modi quas, blanditiis, asperiores cumque doloribus quo, inventore labore possimus? Aperiam unde asperiores distinctio, repudiandae cumque veritatis magni porro.' }]);
     };

     return (
          <div className="flex h-screen bg-gray-50 dark:bg-[#232323] text-gray-900 dark:text-white">
               {/* Sidebar */}
               <div className="flex">
                    {isSidebarOpen && <Sidebar onClose={hideSidebar} messages={handleNewChat}/>}
               </div>
               {/* Main Content */}
               <div className="flex flex-col flex-1 mx-auto">
                    <Navbar isSidebarOpen={isSidebarOpen} showSidebar={showSidebar} />
                    <ChatInterface messages={messages} />
                    <InputBox onSend={handleSend} />
                    <div className='px-6 py-2 w-full text-center text-sm'>
                         <p className='text-center text-gray-600 dark:text-gray-300'>AI Chatbot can make mistakes. Check important info. See <span className='underline'>Cookies Preferences</span></p>
                    </div>
               </div>
          </div>
     )
}

export default Home
