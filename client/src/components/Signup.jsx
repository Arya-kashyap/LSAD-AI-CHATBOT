import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { X } from "lucide-react";
import { Helmet } from "react-helmet";
import toast from "react-hot-toast";
const BACKEND_URL = import.meta.env.VITE_BACKEND_URL

export default function Signup() {
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // Form state
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: ''
  });

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  // Handle signup submission
  const handleSignup = async (e) => {
    e.preventDefault(); // Prevent default form submission
    setLoading(true);
    setError('');

    try {
      const { data } = await axios.post(`${BACKEND_URL}/api/users/signup`, formData, {
        withCredentials: true,
        headers: { 'Content-Type': 'application/json' }
      });

      toast.success(data.message || 'Signup successful!');
      navigate('/signin');
    } catch (error) {
      if (error?.response?.data?.errors) {
        setError(error.response.data.errors);
      }
      console.error('Signup error:', error);
    } finally {
      setLoading(false);
    }
  };

  // Disable button if any field is empty
  const isFormIncomplete = Object.values(formData).some(val => !val.trim());

  return (
    <>
      {/* SEO Meta Tags */}
      <Helmet>
        <title>Signup | Chatbot AI</title>
        <meta name="description" content="Create your Chatbot AI account to access personalized conversations and prompt history." />
      </Helmet>

      <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900 px-4 pt-6">
        <div className="w-full relative max-w-md bg-white dark:bg-gray-800 rounded-xl shadow-md p-4 space-y-4">
          <h2 className="text-2xl font-bold text-center text-gray-800 dark:text-white">Create an Account</h2>

          {/* Close button */}
          <Link to="/">
            <X className="absolute top-2 right-2 font-bold cursor-pointer hover:border hover:dark:border-gray-700 hover:border-gray-200 rounded p-1" />
          </Link>

          {/* Signup Form */}
          <form className="space-y-3" onSubmit={handleSignup}>
            {/* First Name */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">First Name</label>
              <input
                type="text"
                name="firstName"
                placeholder="First Name"
                value={formData.firstName}
                onChange={handleChange}
                className="mt-1 w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>

            {/* Last Name */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Last Name</label>
              <input
                type="text"
                name="lastName"
                placeholder="Last Name"
                value={formData.lastName}
                onChange={handleChange}
                className="mt-1 w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>

            {/* Email */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Email</label>
              <input
                type="email"
                name="email"
                placeholder="Email"
                value={formData.email}
                onChange={handleChange}
                className="mt-1 w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>

            {/* Password */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Password</label>
              <input
                type="password"
                name="password"
                placeholder="Password"
                value={formData.password}
                onChange={handleChange}
                className="mt-1 w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>

            {/* Error Message */}
            {error && <p className="text-red-500 text-sm my-2">{error}</p>}

            {/* Legal Notice */}
            <p className="text-xs text-gray-400 my-3 text-center">
              By signing up or logging in, you consent to Chatbot AI's <a href="#" className="underline">Terms of Use</a> and <a href="#" className="underline">Privacy Policy</a>.
            </p>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading || isFormIncomplete}
              className={`w-full py-2 px-4 font-semibold rounded-md transition ${
                loading || isFormIncomplete
                  ? "bg-indigo-400 cursor-not-allowed"
                  : "bg-indigo-600 hover:bg-indigo-700 text-white"
              }`}
            >
              {loading ? "Signing..." : "Signup"}
            </button>
          </form>

          {/* Redirect to login */}
          <p className="text-sm text-center text-gray-600 dark:text-gray-400">
            Already have an account? <Link to="/signin" className="text-indigo-600 hover:underline">Log in</Link>
          </p>
        </div>
      </div>
    </>
  );
}
