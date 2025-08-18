import { PanelRightOpen, PanelLeftOpen } from 'lucide-react'
import React from 'react'

function Navbar({ showSidebar }) {

     return (
          <div className='flex items-center justify-between  dark:bg-gray-900 p-4 border-b border-gray-300 dark:border-gray-700'>
               <div>
                    <PanelLeftOpen className="w-6 h-6 cursor-pointer" onClick={showSidebar} />
               </div>
               <div className='text-xl font-bold'>
                    AI Chatbot
               </div>
               <div>
                    <button className='bg-indigo-600 hover:bg-indigo-800 text-white px-2 py-1 rounded-md'>Login</button>
               </div>
          </div>
     )
}

export default Navbar
