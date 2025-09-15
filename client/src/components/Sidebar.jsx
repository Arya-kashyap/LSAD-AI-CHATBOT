import { Bot, Edit, LogOut, User, X } from "lucide-react";
import { useEffect, useState } from "react";
import axios from "axios";
import { useAuth } from "../context/AuthProvider";
import { useNavigate } from "react-router-dom";
const BACKEND_URL = import.meta.env.VITE_BACKEND_URL
import User_Image from "../assets/user image.jpg";
import toast from "react-hot-toast";

const Sidebar = ({ visible, toggleSidebar, messages, newChat }) => {
  const [showLogout, setShowLogout] = useState(false);
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const navigate = useNavigate();
  const { authToken, setAuthToken } = useAuth();
  const user = JSON.parse(localStorage.getItem("user"));

  // Fetch user prompt history when messages change
  useEffect(() => {
    const fetchHistory = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) throw new Error("Missing auth token");

        const { data } = await axios.post(
          `${BACKEND_URL}/api/users/history`,
          {},
          {
            headers: { Authorization: `Bearer ${token}` },
            withCredentials: true,
          }
        );

        setHistory(data.history || []);
      } catch (err) {
        console.error("Error fetching user history:", err);
        setError(err.response?.data?.error || "Failed to load history");
      } finally {
        setLoading(false);
      }
    };

    fetchHistory();
  }, [messages]);

  // Handle logout
  const handleLogout = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post(`${BACKEND_URL}/api/users/logout`, {}, { withCredentials: true });
      localStorage.removeItem("user");
      localStorage.removeItem("token");
      setAuthToken(null);
      toast.success(data.message || "Logged out");
      navigate("/signin");
    } catch (error) {
      if(error?.response?.data?.errors){
        toast.error(error.response.data.errors);
      }
      console.error("Logout error:", error);
    }
  };

  return (
    <aside
      className={`fixed top-0 left-0 h-[calc(100vh-3rem)] md:h-full box-border shadow-2xl overflow-hidden w-[60%] md:static md:w-[24%] bg-gray-200 dark:bg-gray-800 text-black dark:text-gray-100 p-2 transition-transform duration-300 ease-in-out z-40 ${visible ? "translate-x-0" : "-translate-x-full"
        }`}
      aria-label="Sidebar navigation"
    >
      {/* Header */}
      <div className="flex items-center justify-between px-3 py-3">
        <Bot aria-hidden="true" />
        <button onClick={toggleSidebar} aria-label="Close sidebar">
          <X />
        </button>
      </div>

      {/* New Chat Button */}
      <div className="w-full py-1 md:mt-5">
        <button
          onClick={newChat}
          className="w-full py-2 bg-indigo-600 hover:bg-indigo-800 text-white rounded-xl mb-3"
        >
          + New Chat
        </button>
        <h3 className="font-bold px-1">Chat History</h3>
      </div>

      {/* Chat History */}
      <div className="flex-1 h-2/3 md:h-2/3 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-400 dark:scrollbar-thumb-white/20 scrollbar-track-transparent space-y-3 py-2 px-1">
        {loading ? (
          <p className="text-sm text-gray-500 dark:text-gray-400">Loading history...</p>
        ) : error ? (
          <p className="text-sm text-red-500">{error}</p>
        ) : history.length === 0 ? (
          <p className="text-sm text-gray-500 dark:text-gray-400">No chat history yet.</p>
        ) : (
          <div className="dark:text-gray-100 text-black">
            {history.map((p, index) => (
              <div key={index} className="py-1">
                <div className="p-2 hover:bg-gray-300 hover:dark:bg-gray-700 rounded-lg cursor-pointer">
                  {/* For small screens (max 25 chars) */}
                  <p className="block md:hidden">
                    {(p.content?.trim()?.slice(0, 22) || "[No content]") +
                      (p.content?.trim()?.length > 22 ? "..." : "")}
                  </p>

                  {/* For medium and up screens (max 35 chars) */}
                  <p className="hidden md:block">
                    {(p.content?.trim()?.slice(0, 35) || "[No content]") +
                      (p.content?.trim()?.length > 35 ? "..." : "")}
                  </p>

                  <small className="text-gray-400 dark:text-gray-600 text-sm">
                    {new Date(p.createdAt).toLocaleString()}
                  </small>
                </div>
              </div>
            ))}

          </div>
        )}
      </div>

      {/* Footer with user info and logout */}
      <footer className="dark:bg-gray-700 bg-gray-300 rounded-xl mt-6 md:mt-0">
        <div
          className="flex items-center gap-x-3 cursor-pointer p-4"
          onClick={() => setShowLogout((prev) => !prev)}
          aria-label="Toggle logout"
        >
          <img
            className="rounded-full w-8 h-8"
            src={User_Image}
            alt=""
          />
          <span>{`${user?.firstName || "Guest"} ${user?.lastName || ""}`}</span>
        </div>

        {showLogout && (
          <div

            className="fixed left-1 bottom-24 md:bottom-20 flex z-50 items-center w-56 bg-gray-400 dark:bg-gray-600 border border-gray-400 dark:border-gray-600 rounded-xl py-1 px-2 shadow-lg"
            aria-label="Logout"
          >
            <div className="w-full flex flex-col gap-1">
              <div className="flex items-center gap-2 cursor-pointer w-full hover:bg-gray-500 hover:dark:bg-gray-500 p-2 rounded-md">
                <User className="w-5 h-5"/>
                {`${user?.email.slice(0, 17) || "guest@gmail.com"} ...`}
              </div>
              <div className="flex items-center gap-2 cursor-pointer w-full hover:bg-gray-500 hover:dark:bg-gray-500 p-2 rounded-md">
                <Edit className="w-5 h-5"/>
                Edit Profile
              </div>
              <div className="flex items-center gap-2 cursor-pointer w-full hover:bg-gray-500 hover:dark:bg-gray-500 p-2 rounded-md" onClick={handleLogout}>
                <LogOut className="w-5 h-5"/>
                Logout
              </div>
            </div>
          </div>
        )}
      </footer>
    </aside>
  );
};

export default Sidebar;
