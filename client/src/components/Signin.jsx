import { X } from 'lucide-react';
import React from 'react';
import { Link } from 'react-router-dom';

const Signin = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-white dark:bg-[#232323] px-4">
      <div className="w-full max-w-md bg-gray-300 dark:bg-zinc-700 rounded-lg shadow-2xl p-6 relative">
        <div className='absolute right-3 top-3  p-0 cursor-pointer rounded-md'>
          <Link to={'/'}><X /></Link>
        </div>
        <h2 className="text-2xl font-bold text-center text-gray-800 dark:text-white mb-6">
          Sign In
        </h2>
        <form className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 px-1">
              Email
            </label>
            <input
              type="email"
              className="mt-1 w-full px-4 py-2 border rounded-md bg-gray-100  focus:outline-none "
              placeholder="arya@example.com"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 px-1">
              Password
            </label>
            <input
              type="password"
              className="mt-1 w-full px-4 py-2 border rounded-md bg-gray-100  focus:outline-none"
              placeholder="••••••••"
            />
          </div>
          <button
            type="submit"
            className="w-full py-2 px-4 bg-indigo-600 hover:bg-indigo-800 text-white font-semibold rounded-md transition duration-200"
          >
            Sign In
          </button>
        </form>
        <p className="mt-4 text-sm text-center text-gray-600 dark:text-gray-200">
          Create an account?{" "}
          <Link to={"/signup"} className="text-blue-500 hover:underline">
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Signin;
