// // // src/App.jsx
// // import React, { useEffect, useState } from 'react';
// // import FilterTabs from './FilterTabs';
// // import LinkedInCard from './LinkedInCard';
// // import { useNavigate } from 'react-router-dom';

// // function Notification() {
// //   const [activeTab, setActiveTab] = useState('All');

// //   // 🧠 Static Mock Data with Types
// //   const posts = [
// //     { id: 1, message: "IMMEDIATE HIRING Please apply only if you have expertise in the mentioned skills.", type: 'job' },
// //     { id: 2, message: "My friend is hiring: Remote Contract Content Writer (3–4 yrs).", type: 'job' },
// //     { id: 3, message: "We're Hiring: Python Developer at Datics AI.", type: 'job' },
// //     { id: 4, message: "Posted: My experience as a dev intern.", type: 'post' },
// //     { id: 5, message: "Someone mentioned you in a comment.", type: 'mention' },
// //     { id: 6, message: "Shared insights about job hunting tips.", type: 'post' },
// //     { id: 7, message: "You were mentioned in Amna's post.", type: 'mention' }
// //   ];

// //   // 🧹 Filter Logic
// //   const filteredPosts = activeTab === 'All'
// //     ? posts
// //     : posts.filter(post => {
// //         if (activeTab === 'Jobs') return post.type === 'job';
// //         if (activeTab === 'My posts') return post.type === 'post';
// //         if (activeTab === 'Mentions') return post.type === 'mention';
// //         return true;
// //       });


// //   const navigate = useNavigate();
// //    useEffect(() => {
// //     const tokenforlocalstorage = localStorage.getItem("token");
// //     console.log(tokenforlocalstorage, "mmmmmmmmmmmmmmmmmmmmmmmmmmmm");

// //     if (!tokenforlocalstorage) {
// //       // No token, redirect to login
// //       // navigate("/");
// //       alert("you need to login first")
// //       navigate("/")
// //       return;
// //     }

// //     let decoded;
// //     try {
// //       decoded = jwtDecode(tokenforlocalstorage);
// //     } catch (err) {
// //       console.log("Invalid token:", err);
// //       // navigate("/");
// //       return;
// //     }

// //     const { username, fullname, email, id } = decoded;
// //     console.log(id, "tttttttttt");

// //     if (!id) {
// //       // navigate("/");
// //       return;
// //     }

// //     // Verify user by ID on backend
// //     const verifyUser = async () => {
// //       try {
// //         const res = await axios.post(
// //           "http://localhost:5000/reachnex/verifyloginuser",
// //           { id }
// //         );

// //         // Assuming res.data.findUser contains user info
// //         // setUser(res.data.findUser);
// //       } catch (err) {
// //         console.log(err);
// //         console.log("Invalid credentials");
// //         // navigate("/");
// //       }
// //     };

// //     verifyUser();
// //   }, [navigate]);
// //   return (
// //     <div>
// //       <FilterTabs activeTab={activeTab} setActiveTab={setActiveTab} />
// //       {filteredPosts.length > 0 ? (
// //         filteredPosts.map(post => (
// //           <LinkedInCard key={post.id} message={post.message} />
// //         ))
// //       ) : (
// //         <p style={{ textAlign: 'center', color: '#888' }}>No notifications in this category.</p>
// //       )}
// //     </div>
// //   );
// // }

// // export default Notification;


// // src/App.jsx
// // import React, { useEffect, useState } from 'react';
// // import FilterTabs from './FilterTabs';
// // import LinkedInCard from './LinkedInCard';
// // import { useNavigate } from 'react-router-dom';
// // import React, { useEffect, useState } from "react";
// // import socket from "../../socket.js";
// // function Notification() {

// //   const [notifications, setNotifications] = useState([]);

  
// //   // const [activeTab, setActiveTab] = useState('All');

// //   // 🧠 Static Mock Data with Types
// //   // const posts = [
// //   //   { id: 1, message: "IMMEDIATE HIRING Please apply only if you have expertise in the mentioned skills.", type: 'job' },
// //   //   { id: 2, message: "My friend is hiring: Remote Contract Content Writer (3–4 yrs).", type: 'job' },
// //   //   { id: 3, message: "We're Hiring: Python Developer at Datics AI.", type: 'job' },
// //   //   { id: 4, message: "Posted: My experience as a dev intern.", type: 'post' },
// //   //   { id: 5, message: "Someone mentioned you in a comment.", type: 'mention' },
// //   //   { id: 6, message: "Shared insights about job hunting tips.", type: 'post' },
// //   //   { id: 7, message: "You were mentioned in Amna's post.", type: 'mention' }
// //   // ];

// //   // 🧹 Filter Logic
// //   // const filteredPosts = activeTab === 'All'
// //   //   ? posts
// //   //   : posts.filter(post => {
// //   //       if (activeTab === 'Jobs') return post.type === 'job';
// //   //       if (activeTab === 'My posts') return post.type === 'post';
// //   //       if (activeTab === 'Mentions') return post.type === 'mention';
// //   //       return true;
// //   //     });


// //   const navigate = useNavigate();
// //    useEffect(() => {
// //     const tokenforlocalstorage = localStorage.getItem("token");
// //     console.log(tokenforlocalstorage, "mmmmmmmmmmmmmmmmmmmmmmmmmmmm");

// //     if (!tokenforlocalstorage) {
// //       // No token, redirect to login
// //       // navigate("/");
// //       alert("you need to login first")
// //       navigate("/")
// //       return;
// //     }

// //     let decoded;
// //     try {
// //       decoded = jwtDecode(tokenforlocalstorage);
// //     } catch (err) {
// //       console.log("Invalid token:", err);
// //       // navigate("/");
// //       return;
// //     }

// //     const { username, fullname, email, id } = decoded;
// //     console.log(id, "tttttttttt");

// //     if (!id) {
// //       // navigate("/");
// //       return;
// //     }

// //     // Verify user by ID on backend
// //     const verifyUser = async () => {
// //       try {
// //         const res = await axios.post(
// //           "http://localhost:5000/reachnex/verifyloginuser",
// //           { id }
// //         );

// //         // Assuming res.data.findUser contains user info
// //         // setUser(res.data.findUser);
// //       } catch (err) {
// //         console.log(err);
// //         console.log("Invalid credentials");
// //         // navigate("/");
// //       }
// //     };

// //     verifyUser();
// //   }, [navigate]);

// //   useEffect(() => {
// //     socket.emit("join", userId);

// //     socket.on("notification", (data) => {
// //       setNotifications(prev => [data, ...prev]);
// //     });

// //     fetch(`http://localhost:5000/ReachNex/notifications/${id}`)
// //       .then(res => res.json())
// //       .then(data => setNotifications(data));

// //     return () => socket.off("notification");
// //   }, [id]);
// //   return (
// //     <div>
// //       <button>🔔 {notifications.filter(n => !n.isRead).length}</button>
// //       <div className="dropdown">
// //         {notifications.map(n => (
// //           <div key={n._id}>
// //             <a href={n.link}>{n.message}</a>
// //           </div>
// //         ))}
// //       </div>
// //     </div>
// //   );
// // }

// // export default Notification;


// import React, { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";
// import axios from "axios";
// import {jwtDecode} from "jwt-decode";
// import socket from "../../socket.js";

// function Notification() {
//   const [notifications, setNotifications] = useState([]);
//   const navigate = useNavigate();
//   const [userId, setUserId] = useState(null);

//   useEffect(() => {
//     const token = localStorage.getItem("token");
//     if (!token) {
//       alert("You need to login first");
//       navigate("/");
//       return;
//     }

//     let decoded;
//     try {
//       decoded = jwtDecode(token);
//     } catch (err) {
//       console.error("Invalid token:", err);
//       navigate("/");
//       return;
//     }

//     const { id } = decoded;
//     if (!id) {
//       navigate("/");
//       return;
//     }

//     setUserId(id); // ✅ Set userId for socket

//     const verifyUser = async () => {
//       try {
//         await axios.post("http://localhost:5000/reachnex/verifyloginuser", { id });
//       } catch (err) {
//         console.error("Invalid credentials", err);
//         navigate("/");
//       }
//     };

//     verifyUser();
//   }, [navigate]);

  
//   //   if (!userId) return;

//   //   socket.emit("join", userId);

//   //   socket.on("notification", (data) => {
//   //     setNotifications((prev) => [data, ...prev]);
//   //   });

//   //   axios
//   //     .get(`http://localhost:5000/ReachNex/notifications/${userId}`)
//   //     .then((res) => setNotifications(res.data))
//   //     .catch((err) => console.error("Fetch notifications error:", err));

//   //   return () => {
//   //     socket.off("notification");
//   //   };
//   // }, [userId]);

//   return (
//     <div>
//       <button>
//         🔔 {notifications.filter((n) => !n.isRead).length}
//       </button>
//       <div className="dropdown">
//         {notifications.map((n) => (
//           <div key={n._id}>
//             <a href={n.link}>{n.message}</a>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// }

// export default Notification;
// import React, { useEffect, useState, useContext } from "react";
// import { useNavigate } from "react-router-dom";
// import axios from "axios";
// import { jwtDecode} from "jwt-decode";
// import socket from "../../socket"; // Adjust path if needed
// import  AuthenticationContext from "../../components/Contexts/AuthenticationContext/AuthenticationContext";

// function Notification() {
//   const [notifications, setNotifications] = useState([]);
//   const navigate = useNavigate();
//   const { user } = useContext(AuthenticationContext); // assuming you store user in context
//   const userId = user?._id;
//    console.log(user)
//   useEffect(() => {
//     // if (!userId) {
//     //   alert("You need to login first");
//     //   navigate("/");
//     //   return;
//     // }

//     // Join socket room for this user
//     socket.emit("join", userId);

//     // Listen for real-time notifications
//     socket.on("notification", (data) => {
//       setNotifications((prev) => [data, ...prev]);
//     });

//     // Fetch initial notifications from backend
//     axios
//       .get(`http://localhost:5000/ReachNex/notifications/${userId}`)
//       .then((res) => setNotifications(res.data))
//       .catch((err) => {
//         console.error("Error fetching notifications:", err);
//         if (err.response?.status === 401) {
//           navigate("/");
//         }
//       });

//     // Cleanup on unmount
//     return () => {
//       socket.off("notification");
//     };
//   }, [userId, navigate]);

//   // Mark a notification as read
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

//   // Mark all as read
//   const markAllAsRead = async () => {
//     try {
//       await axios.put(`http://localhost:5000/ReachNex/notifications/mark-all-read/${userId}`);
//       setNotifications((prev) => prev.map((n) => ({ ...n, isRead: true })));
//     } catch (err) {
//       console.error("Error marking all as read:", err);
//     }
//   };

//   // Delete a notification
//   const deleteNotification = async (id) => {
//     try {
//       await axios.delete(`http://localhost:5000/ReachNex/notifications/${id}`);
//       setNotifications((prev) => prev.filter((n) => n._id !== id));
//     } catch (err) {
//       console.error("Error deleting notification:", err);
//     }
//   };

//   return (
//     <div className="notification-page" style={{ padding: 20 }}>
//       <h2>Notifications</h2>
//       <button onClick={markAllAsRead} style={{ marginBottom: 10 }}>
//         Mark all as read
//       </button>
//       {notifications.length === 0 ? (
//         <p>No notifications.</p>
//       ) : (
//         <ul style={{ listStyle: "none", padding: 0 }}>
//           {notifications.map((n) => (
//             <li
//               key={n._id}
//               style={{
//                 backgroundColor: n.isRead ? "#f0f0f0" : "#d1e7dd",
//                 marginBottom: 8,
//                 padding: 12,
//                 borderRadius: 6,
//                 display: "flex",
//                 justifyContent: "space-between",
//                 alignItems: "center",
//               }}
//             >
//               <a
//                 href={n.link}
//                 style={{ textDecoration: "none", color: "black", flexGrow: 1 }}
//                 onClick={() => markAsRead(n._id)}
//               >
//                 {n.message}
//               </a>
//               <button
//                 onClick={() => deleteNotification(n._id)}
//                 style={{
//                   marginLeft: 10,
//                   backgroundColor: "transparent",
//                   border: "none",
//                   cursor: "pointer",
//                   color: "red",
//                 }}
//                 aria-label="Delete notification"
//               >
//                 &times;
//               </button>
//             </li>
//           ))}
//         </ul>
//       )}
//     </div>
//   );
// }

// export default Notification;
// import React, { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";
// import axios from "axios";
// import {jwtDecode} from "jwt-decode";
// import socket from "../../socket";

// function Notification() {
//   const [notifications, setNotifications] = useState([]);
//   const navigate = useNavigate();

//   // Get user ID by decoding JWT token from localStorage
//   const getUserIdFromToken = () => {
//     const token = localStorage.getItem("token");
//     if (!token) return null;
//     try {
//       const decoded = jwtDecode(token);
//       return decoded.id || decoded._id || null; // depends on how your token payload is structured
//     } catch (err) {
//       console.error("Invalid token:", err);
//       return null;
//     }
//   };

//   const userId = getUserIdFromToken();

//   // Redirect if no user ID
//   useEffect(() => {
//     if (!userId) {
//       alert("You need to login first");
//       navigate("/");
//     }
//   }, [userId, navigate]);

//   // Fetch notifications and setup socket only if userId exists
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
//         if (err.response?.status === 401) {
//           navigate("/");
//         }
//       });

//     return () => {
//       socket.off("notification");
//     };
//   }, [userId, navigate]);

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
//       await axios.put(
//         `http://localhost:5000/ReachNex/notifications/mark-all-read/${userId}`
//       );
//       setNotifications((prev) => prev.map((n) => ({ ...n, isRead: true })));
//     } catch (err) {
//       console.error("Error marking all as read:", err);
//     }
//   };

//   const deleteNotification = async (id) => {
//     try {
//       await axios.delete(`http://localhost:5000/ReachNex/notifications/${id}`);
//       setNotifications((prev) => prev.filter((n) => n._id !== id));
//     } catch (err) {
//       console.error("Error deleting notification:", err);
//     }
//   };

//   return (
//     <div style={{ padding: 20 }}>
//       <h2>Notifications</h2>
//       <button onClick={markAllAsRead} style={{ marginBottom: 10 }}>
//         Mark all as read
//       </button>
//       {notifications.length === 0 ? (
//         <p>No notifications.</p>
//       ) : (
//         <ul style={{ listStyle: "none", padding: 0 }}>
//           {notifications.map((n) => (
//             <li
//               key={n._id}
//               style={{
//                 backgroundColor: n.isRead ? "#f0f0f0" : "#d1e7dd",
//                 marginBottom: 8,
//                 padding: 12,
//                 borderRadius: 6,
//                 display: "flex",
//                 justifyContent: "space-between",
//                 alignItems: "center",
//               }}
//             >
//               <a
//                 href={n.link}
//                 onClick={() => markAsRead(n._id)}
//                 style={{ textDecoration: "none", color: "black", flexGrow: 1 }}
//               >
//                 {n.message}
//               </a>
//               <button
//                 onClick={() => deleteNotification(n._id)}
//                 style={{
//                   marginLeft: 10,
//                   backgroundColor: "transparent",
//                   border: "none",
//                   cursor: "pointer",
//                   color: "red",
//                   fontSize: 20,
//                   lineHeight: 1,
//                 }}
//                 aria-label="Delete notification"
//               >
//                 &times;
//               </button>
//             </li>
//           ))}
//         </ul>
//       )}
//     </div>
//   );
// }

// export default Notification;
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import socket from "../../socket";

function Notification() {
  const [notifications, setNotifications] = useState([]);
  const navigate = useNavigate();

  const getUserIdFromToken = () => {
    const token = localStorage.getItem("token");
    if (!token) return null;
    try {
      const decoded = jwtDecode(token);
      return decoded.id || decoded._id || null;
    } catch (err) {
      console.error("Invalid token:", err);
      return null;
    }
  };

  const userId = getUserIdFromToken();

  useEffect(() => {
    if (!userId) {
      alert("You need to login first");
      navigate("/");
    }
  }, [userId, navigate]);

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
        if (err.response?.status === 401) {
          navigate("/");
        }
      });

    return () => {
      socket.off("notification");
    };
  }, [userId, navigate]);

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
      await axios.put(
        `http://localhost:5000/ReachNex/notifications/mark-all-read/${userId}`
      );
      setNotifications((prev) => prev.map((n) => ({ ...n, isRead: true })));
    } catch (err) {
      console.error("Error marking all as read:", err);
    }
  };

  const deleteNotification = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/ReachNex/notifications/${id}`);
      setNotifications((prev) => prev.filter((n) => n._id !== id));
    } catch (err) {
      console.error("Error deleting notification:", err);
    }
  };

  return (
    <div style={{ padding: 20 }}>
      <h2>Notifications</h2>
      <button onClick={markAllAsRead} style={{ marginBottom: 10 }}>
        Mark all as read
      </button>
      {notifications.length === 0 ? (
        <p>No notifications.</p>
      ) : (
        <ul style={{ listStyle: "none", padding: 0 }}>
          {notifications.map((n) => (
            <li
              key={n._id}
              style={{
                backgroundColor: n.isRead ? "#f0f0f0" : "#d1e7dd",
                marginBottom: 8,
                padding: 12,
                borderRadius: 6,
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <span
                onClick={() => {
                  markAsRead(n._id);
                  navigate(n.link); // SPA navigation
                }}
                style={{
                  textDecoration: "none",
                  color: "black",
                  flexGrow: 1,
                  cursor: "pointer",
                }}
              >
                {n.message}
              </span>
              <button
                onClick={() => deleteNotification(n._id)}
                style={{
                  marginLeft: 10,
                  backgroundColor: "transparent",
                  border: "none",
                  cursor: "pointer",
                  color: "red",
                  fontSize: 20,
                  lineHeight: 1,
                }}
                aria-label="Delete notification"
              >
                &times;
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default Notification;
