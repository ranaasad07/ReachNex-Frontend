import { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import socket from "../../socket"; // adjust if needed
import { useNavigate } from "react-router-dom";

const NotificationContext = createContext();

export const NotificationProvider = ({ children }) => {
  const [notifications, setNotifications] = useState([]);
  const [userId, setUserId] = useState(null);
  const navigate = useNavigate();

  // Get user ID from token
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) return;

    try {
      const decoded = jwtDecode(token);
      const id = decoded.id || decoded._id;
      if (!id) return;
      setUserId(id);
    } catch (err) {
      console.error("Invalid token:", err);
      navigate("/");
    }
  }, [navigate]);

  // Connect to socket and fetch notifications
  useEffect(() => {
    if (!userId) return;

    socket.emit("join", userId);

    socket.on("notification", (data) => {
      setNotifications((prev) => [data, ...prev]);
    });

    axios
      .get(`http://localhost:5000/ReachNex/notifications/${userId}`)
      .then((res) => setNotifications(res.data))
      .catch((err) => {
        console.error("Error fetching notifications:", err);
        if (err.response?.status === 401) navigate("/");
      });

    return () => {
      socket.off("notification");
    };
  }, [userId, navigate]);

  const unreadCount = notifications.filter((n) => !n.isRead).length;

  const markAsRead = async (id) => {
    try {
      await axios.put(`http://localhost:5000/ReachNex/notifications/${id}/read`);
      setNotifications((prev) =>
        prev.map((n) => (n._id === id ? { ...n, isRead: true } : n))
      );
    } catch (err) {
      console.error("Error marking notification as read:", err);
    }
  };

  const markAllAsRead = async () => {
    try {
      await axios.put(`http://localhost:5000/ReachNex/notifications/mark-all-read/${userId}`);
      setNotifications((prev) => prev.map((n) => ({ ...n, isRead: true })));
    } catch (err) {
      console.error("Error marking all as read:", err);
    }
  };

  return (
    <NotificationContext.Provider
      value={{
        notifications,
        setNotifications,
        unreadCount,
        markAsRead,
        markAllAsRead,
      }}
    >
      {children}
    </NotificationContext.Provider>
  );
};

export const useNotifications = () => useContext(NotificationContext);
//need to update notification .jsx later after context 