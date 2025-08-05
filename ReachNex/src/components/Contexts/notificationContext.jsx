// import { createContext, useContext, useEffect, useState } from "react";
// import axios from "axios";
// import { jwtDecode } from "jwt-decode";
// import socket from "../../socket"; // adjust if needed
// import { useNavigate } from "react-router-dom";

// const NotificationContext = createContext();

// // export const NotificationProvider = ({ children }) => {
// //   const [notifications, setNotifications] = useState([]);
// //   const [userId, setUserId] = useState(null);
// //   const navigate = useNavigate();

// //   // Get user ID from token
// //   useEffect(() => {
// //     const token = localStorage.getItem("token");
// //     if (!token) return;

// //     try {
// //       const decoded = jwtDecode(token);
// //       const id = decoded.id || decoded._id;
// //       if (!id) return;
// //       setUserId(id);
// //     } catch (err) {
// //       console.error("Invalid token:", err);
// //       navigate("/");
// //     }
// //   }, [navigate]);

// //   // Connect to socket and fetch notifications
// //   useEffect(() => {
// //     if (!userId) return;

// //     socket.emit("join", userId);

// //     socket.on("notification", (data) => {
// //       setNotifications((prev) => [data, ...prev]);
// //     });

// //     axios
// //       .get(`http://localhost:5000/ReachNex/notifications/${userId}`)
// //       .then((res) => setNotifications(res.data))
// //       .catch((err) => {
// //         console.error("Error fetching notifications:", err);
// //         if (err.response?.status === 401) navigate("/");
// //       });

// //     return () => {
// //       socket.off("notification");
// //     };
// //   }, [userId, navigate]);

// //   const unreadCount = notifications.filter((n) => !n.isRead).length;

// //   const markAsRead = async (id) => {
// //     try {
// //       await axios.put(`http://localhost:5000/ReachNex/notifications/${id}/read`);
// //       setNotifications((prev) =>
// //         prev.map((n) => (n._id === id ? { ...n, isRead: true } : n))
// //       );
// //     } catch (err) {
// //       console.error("Error marking notification as read:", err);
// //     }
// //   };

// //   const markAllAsRead = async () => {
// //     try {
// //       await axios.put(`http://localhost:5000/ReachNex/notifications/mark-all-read/${userId}`);
// //       setNotifications((prev) => prev.map((n) => ({ ...n, isRead: true })));
// //     } catch (err) {
// //       console.error("Error marking all as read:", err);
// //     }
// //   };

// //   return (
// //     <NotificationContext.Provider
// //       value={{
// //         notifications,
// //         setNotifications,
// //         unreadCount,
// //         markAsRead,
// //         markAllAsRead,
// //       }}
// //     >
// //       {children}
// //     </NotificationContext.Provider>
// //   );
// // };

// // export const useNotifications = () => useContext(NotificationContext);
// // //need to update notification .jsx later after context 

// export const NotificationProvider = ({ children }) => {
//   const [notifications, setNotifications] = useState([]);
//   const [unreadMessageCount, setUnreadMessageCount] = useState(0);
//   const [userId, setUserId] = useState(null);
//   const navigate = useNavigate();

//   // ✅ Decode JWT to get userId
//   useEffect(() => {
//     const token = localStorage.getItem("token");
//     if (!token) return;

//     try {
//       const decoded = jwtDecode(token);
//       const id = decoded.id || decoded._id;
//       if (!id) return;
//       setUserId(id);
//     } catch (err) {
//       console.error("Invalid token:", err);
//       navigate("/");
//     }
//   }, [navigate]);

//   // ✅ Fetch Notifications + Listen via Socket
//   useEffect(() => {
//     if (!userId) return;

//     socket.emit("join", userId);

//     socket.on("notification", (data) => {
//       setNotifications((prev) => [data, ...prev]);
//     });

//     axios
//       .get(`http://localhost:5000/ReachNex/notifications/${userId}`)
//       .then((res) => setNotifications(res.data))
//       .catch((err) => {
//         console.error("Error fetching notifications:", err);
//         if (err.response?.status === 401) navigate("/");
//       });

//     return () => {
//       socket.off("notification");
//     };
//   }, [userId, navigate]);

//   // ✅ Fetch Unread Message Count
//   // useEffect(() => {
//   //   if (!userId) return;

//   //   const fetchUnreadMessages = async () => {
//   //     try {
//   //       const res = await axios.get(`http://localhost:5000/ReachNex/message/unread-count`, {
//   //         headers: { userid: userId },
//   //       });
//   //       setUnreadMessageCount(res.data.unreadCount || 0);
//   //     } catch (err) {
//   //       console.error("Error fetching unread message count:", err);
//   //     }
//   //   };

//   //   fetchUnreadMessages();

//   //   const interval = setInterval(fetchUnreadMessages, 30000); // refresh every 30s
//   //   return () => clearInterval(interval);
//   // }, [userId]);
// useEffect(() => {
//   if (!userId) return;

//   // === Initial fetch in case unreadMessageCount is outdated ===
//   const fetchUnreadMessages = async () => {
//     try {
//       const res = await axios.get(`http://localhost:5000/ReachNex/message/unread-count`, {
//         headers: { userid: userId },
//       });
//       setUnreadMessageCount(res.data.unreadCount || 0);
//     } catch (err) {
//       console.error("Error fetching unread message count:", err);
//     }
//   };

//   fetchUnreadMessages();

//   // === Fallback polling every 2 mins (adjust as needed) ===
//   const interval = setInterval(fetchUnreadMessages, 120000); // 2 min

//   // === Real-time update from Socket.IO ===
//   socket.on("unreadMessageCount", (count) => {
//     setUnreadMessageCount(count);
//   });

//   return () => {
//     clearInterval(interval);
//     socket.off("unreadMessageCount");
//   };
// }, [userId]);

//   // ✅ Notification Utility
//   const unreadCount = notifications.filter((n) => !n.isRead).length;

//   const markAsRead = async (id) => {
//     try {
//       await axios.put(`http://localhost:5000/ReachNex/notifications/${id}/read`);
//       setNotifications((prev) =>
//         prev.map((n) => (n._id === id ? { ...n, isRead: true } : n))
//       );
//     } catch (err) {
//       console.error("Error marking notification as read:", err);
//     }
//   };

//   const markAllAsRead = async () => {
//     try {
//       await axios.put(`http://localhost:5000/ReachNex/notifications/mark-all-read/${userId}`);
//       setNotifications((prev) => prev.map((n) => ({ ...n, isRead: true })));
//     } catch (err) {
//       console.error("Error marking all as read:", err);
//     }
//   };

//   return (
//     <NotificationContext.Provider
//       value={{
//         notifications,
//         setNotifications,
//         unreadCount,
//         unreadMessageCount,
//         markAsRead,
//         markAllAsRead,
//       }}
//     >
//       {children}
//     </NotificationContext.Provider>
//   );
// };
//  export const useNotifications = () => useContext(NotificationContext);

import { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import socket from "../../socket";
import { useNavigate } from "react-router-dom";

const NotificationContext = createContext();

export const NotificationProvider = ({ children }) => {
  const [notifications, setNotifications] = useState([]);
  const [unreadMessageCount, setUnreadMessageCount] = useState(0);
  const [connectionRequestCount, setConnectionRequestCount] = useState(0);
  const [userId, setUserId] = useState(null);
  const navigate = useNavigate();

  // ✅ Decode JWT
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

  // ✅ Fetch Notifications + Listen via Socket
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

  // ✅ Fetch Unread Message Count + Listen
  useEffect(() => {
    if (!userId) return;

    const fetchUnreadMessages = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/ReachNex/message/unread-count`, {
          headers: { userid: userId },
        });
        setUnreadMessageCount(res.data.unreadCount || 0);
      } catch (err) {
        console.error("Error fetching unread message count:", err);
      }
    };

    fetchUnreadMessages();
    // const interval = setInterval(fetchUnreadMessages, 120000); // 2 mins

    
    return () => {
      // clearInterval(interval);
      
    };
  }, [userId]);

  // ✅ Fetch Connection Request Count + Listen
  useEffect(() => {
    if (!userId) return;

    const fetchConnectionRequestCount = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/ReachNex/connection-requests/count`, {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        });
        setConnectionRequestCount(res.data.count || 0);
      } catch (err) {
        console.error("Error fetching connection request count:", err);
      }
    };

    fetchConnectionRequestCount();

    socket.on("connectionRequestCountUpdate", (data) => {
      setConnectionRequestCount(data.count);
    });

    return () => {
      socket.off("connectionRequestCountUpdate");
    };
  }, [userId]);

  // ✅ Notification helpers
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
        unreadMessageCount,
        connectionRequestCount,
        markAsRead,
        markAllAsRead,
      }}
    >
      {children}
    </NotificationContext.Provider>
  );
};

export const useNotifications = () => useContext(NotificationContext);
