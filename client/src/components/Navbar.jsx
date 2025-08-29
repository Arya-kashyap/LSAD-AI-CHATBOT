import { useState, useEffect } from "react";
import { PanelLeftOpen } from "lucide-react";
import { Link } from "react-router-dom";
import {useAuth} from '../context/AuthProvider'

const Navbar = ({ toggleSidebar }) => {
  const {authToken, setAuthToken} = useAuth();

  return (
    <header>
      {/* Semantic <nav> for accessibility and SEO */}
      <nav
        className="fixed top-0 left-0 right-0 w-full z-30 bg-white dark:bg-gray-900 shadow-md"
        role="navigation"
        aria-label="Main navigation"
      >
        <div className="max-w-full mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-14">
            {/* Sidebar Toggle Button */}
            <button
              onClick={toggleSidebar}
              aria-label="Toggle sidebar"
              className="text-xl font-bold text-black dark:text-gray-100 cursor-pointer"
            >
              <PanelLeftOpen />
            </button>

            {/* Brand Name */}
            <Link
              to="/"
              className="text-xl font-bold text-black dark:text-gray-100"
              aria-label="Go to homepage"
            >
              AI Chatbot
            </Link>

            {/* Auth Button */}
            {authToken ? (
              <div></div>
            ) : (
              <Link
                to="/signin"
                className="text-white bg-blue-800 hover:bg-blue-700 px-2 py-1 rounded-md"
              >
                Sign In
              </Link>
            )}
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
