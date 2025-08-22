import { useState } from "react";
import { PanelLeftOpen } from 'lucide-react';
import {Link} from 'react-router-dom'

const Navbar = ({toggleSidebar}) => {
  const [isOpen, setIsOpen] = useState(false);
  
  return (
    <nav className="fixed top-0 right-0 left-0 w-full z-30 bg-white dark:bg-gray-900 shadow-md">
      <div className="max-w-full mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-14">
          {/* Sidebar Button */}
          <button onClick={toggleSidebar} className="text-xl font-bold text-gray-800 dark:text-white cursor-pointer">
            <PanelLeftOpen />
          </button>

          {/* Name */}
          <div className="text-xl font-bold text-gray-800 dark:text-white">
            Ai Chatbot
          </div>

          {/* Sign Up Button */}
          <div className="">
            <Link to={'/signin'} className="text-white bg-blue-800 hover:bg-blue-700 px-2 py-1 rounded-md">Sign In</Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
