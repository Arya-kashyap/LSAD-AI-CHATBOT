import { PanelRightOpen, PanelLeftOpen } from 'lucide-react'
import { Link } from 'react-router-dom'

function Navbar({ isSidebarOpen, showSidebar }) {

     return (
          <div className='flex items-center justify-between  dark:bg-gray-900 p-4 '>
               <div>
                    {!isSidebarOpen && (
                         <PanelLeftOpen
                              className="w-6 h-6 cursor-pointer absolute top-4 left-4 text-gray-700"
                              onClick={showSidebar}
                         />
                    )}
               </div>
               <div className='text-xl font-bold'>
                    AI Chatbot
               </div>
               <div>
                    <Link to={'/signin'} className='bg-indigo-600 hover:bg-indigo-800 text-white px-2 py-1 rounded-md'>Sign In</Link>
               </div>
          </div>
     )
}

export default Navbar
