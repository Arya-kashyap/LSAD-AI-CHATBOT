import { Bot, LogOut, X } from "lucide-react";
import { useEffect, useState } from "react";
import axios from "axios";
import { useAuth } from "../context/AuthProvider";
import { useNavigate } from "react-router-dom";
const BACKEND_URL = import.meta.env.VITE_BACKEND_URL

const Sidebar = ({ visible, toggleSidebar, messages, newChat }) => {
  const [showLogout, setShowLogout] = useState(false);
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const navigate = useNavigate();
  const {authToken, setAuthToken} = useAuth();
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
  const handleLogout = async () => {
    try {
      const { data } = await axios.post(`${BACKEND_URL}/api/users/logout`, {}, { withCredentials: true });
      localStorage.removeItem("user");
      localStorage.removeItem("token");
      setAuthToken(null);
      alert(data.message || "Logged out");
      navigate("/signin");
    } catch (err) {
      console.error("Logout error:", err);
      alert("Logout failed");
    }
  };

  return (
    <aside
      className={`fixed top-0 left-0 h-[calc(100vh-4rem)] md:h-full box-border shadow-2xl overflow-hidden w-[60%] md:static md:w-[24%] bg-gray-200 dark:bg-gray-800 text-black dark:text-gray-100 p-2 transition-transform duration-300 ease-in-out z-40 ${
        visible ? "translate-x-0" : "-translate-x-full"
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
      <div className="w-full py-1">
        <button
          onClick={newChat}
          className="w-full py-2 bg-indigo-600 hover:bg-indigo-800 text-white rounded-xl mb-3"
        >
          + New Chat
        </button>
        <h3 className="font-bold px-1">Chat History</h3>
      </div>

      {/* Chat History */}
      <div className="flex-1 h-3/4 md:h-2/3 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-400 dark:scrollbar-thumb-white/20 scrollbar-track-transparent space-y-3 py-3 px-1">
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
                  <p>{p.content?.trim() || "[No content]"}</p>
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
      <footer className="dark:bg-gray-700 bg-gray-300 rounded-xl mb-6 md:mb-0">
        <div
          className="flex items-center gap-x-3 cursor-pointer p-4"
          onClick={() => setShowLogout((prev) => !prev)}
          aria-label="Toggle logout"
        >
          <img
            className="rounded-full w-8 h-8"
            src=""
            alt={`${user?.firstName || "Guest"} profile`}
          />
          <span>{`${user?.firstName || "Guest"} ${user?.lastName || ""}`}</span>
        </div>

        {showLogout && (
          <button
            onClick={handleLogout}
            className="fixed left-3 bottom-20 md:bottom-2 flex z-50 items-center text-sm gap-2 rounded-lg transition bg-gray-400 px-2 py-1 hover:bg-gray-500 dark:bg-gray-600 hover:dark:bg-gray-500"
            aria-label="Logout"
          >
            <LogOut />
            Logout
          </button>
        )}
      </footer>
    </aside>
  );
};

export default Sidebar;
