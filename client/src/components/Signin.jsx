import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { useAuth } from "../context/AuthProvider";
import { X } from "lucide-react";
import { Helmet } from "react-helmet";
const BACKEND_URL = import.meta.env.VITE_BACKEND_URL

export default function Signin() {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const {authToken, setAuthToken} = useAuth(); // Only using setter from context
  const navigate = useNavigate();

  // Handle input changes
  const handleChange = ({ target: { name, value } }) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Handle login submission
  const handleSignin = async (e) => {
    e.preventDefault(); // Prevent default form behavior
    setLoading(true);
    setError("");

    try {
      const { data } = await axios.post(
        `${BACKEND_URL}/api/users/login`,
        formData,
        {
          withCredentials: true,
          headers: { "Content-Type": "application/json" },
        }
      );

      // Persist token and user info
      localStorage.setItem("user", JSON.stringify(data.user));
      localStorage.setItem("token", data.token);
      setAuthToken(data.token);

      alert(data.message || "Login successful!");
      navigate("/");
    } catch (err) {
      const msg = err?.response?.data?.errors || "Login failed";
      setError(msg);
      console.error("Login error:", err);
    } finally {
      setLoading(false);
    }
  };

  // Disable button if fields are empty
  const isFormIncomplete = !formData.email.trim() || !formData.password.trim();

  return (
    <>
      {/* SEO Meta Tags */}
      <Helmet>
        <title>Login | Chatbot AI</title>
        <meta
          name="description"
          content="Log in to your Chatbot AI account to access personalized conversations and prompt history."
        />
      </Helmet>

      <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900 px-4">
        <div className="w-full relative max-w-md bg-white dark:bg-gray-800 rounded-xl shadow-md p-6 space-y-6">
          {/* Heading */}
          <h2 className="text-2xl font-bold text-center text-gray-800 dark:text-white">
            Welcome Back
          </h2>

          {/* Close button */}
          <Link to="/">
            <X className="absolute top-2 right-2 font-bold cursor-pointer hover:border hover:dark:border-gray-700 hover:border-gray-200 rounded p-1" />
          </Link>

          {/* Login Form */}
          <form className="space-y-4" onSubmit={handleSignin}>
            {/* Email Field */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                Email
              </label>
              <input
                type="email"
                name="email"
                placeholder="Email"
                value={formData.email}
                onChange={handleChange}
                className="mt-1 w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>

            {/* Password Field */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                Password
              </label>
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
              By signing up or logging in, you consent to Chatbot AI's{" "}
              <a href="#" className="underline">
                Terms of Use
              </a>{" "}
              and{" "}
              <a href="#" className="underline">
                Privacy Policy
              </a>
              .
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
              {loading ? "Logging In..." : "Login"}
            </button>
          </form>

          {/* Redirect to Signup */}
          <p className="text-sm text-center text-gray-600 dark:text-gray-400">
            Don't have an account?{" "}
            <Link to="/signup" className="text-indigo-600 hover:underline">
              Sign up
            </Link>
          </p>
        </div>
      </div>
    </>
  );
}
