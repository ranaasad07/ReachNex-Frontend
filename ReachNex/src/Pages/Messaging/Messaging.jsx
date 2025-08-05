
// // // import React, { useEffect, useState, useContext } from "react";
// // // import ChatList from "./ChatList";
// // // import ChatDetail from "./ChatDetail";
// // // import axios from "axios";
// // // import AuthenticationContext from "../../components/Contexts/AuthenticationContext/AuthenticationContext";
// // // import socket from "../../socket";
// // // import "./Messaging.css"; // 👈 custom CSS file

// // // const Messaging = () => {
// // //   const { user } = useContext(AuthenticationContext);
// // //   const currentUserId = user?._id;

// // //   const [conversationId, setConversationId] = useState(null);
// // //   const [messages, setMessages] = useState([]);
// // //   const [users, setUsers] = useState([]);
// // //   const [selectedUser, setSelectedUser] = useState(null);

// // //   useEffect(() => {
// // //     if (conversationId) {
// // //       socket.emit("joinRoom", conversationId);
// // //     }

// // //     socket.on("receiveMessage", (message) => {
// // //       setMessages((prev) => [...prev, message]);
// // //     });

// // //     return () => {
// // //       socket.off("receiveMessage");
// // //       socket.emit("leaveRoom", conversationId);
// // //     };
// // //   }, [conversationId]);

// // //   const fetchUsers = async () => {
// // //     const res = await axios.get("http://localhost:5000/ReachNex/online-users", {
// // //       withCredentials: true,
// // //       headers: { userid: currentUserId },
// // //     });
// // //     setUsers(res.data?.users);
// // //   };

// // //   useEffect(() => {
// // //     if (currentUserId) {
// // //       fetchUsers();
// // //     }
// // //   }, [currentUserId]);

// // //   return (
// // //     <div className="messaging-container">
// // //       <div className="chat-list-section">
// // //         <ChatList
// // //           users={users}
// // //           selectedUser={selectedUser}
// // //           setSelectedUser={setSelectedUser}
// // //         />
// // //       </div>

// // //       <div className="chat-detail-section">
// // //         {selectedUser ? (
// // //           <ChatDetail receiverId={selectedUser._id} />
// // //         ) : (
// // //           <div className="empty-chat">Select a chat to start messaging</div>
// // //         )}
// // //       </div>
// // //     </div>
// // //   );
// // // };

// // // export default Messaging;
// // import React, { useEffect, useState, useContext } from "react";
// // import ChatList from "./ChatList";
// // import ChatDetail from "./ChatDetail";
// // import axios from "axios";
// // import AuthenticationContext from "../../components/Contexts/AuthenticationContext/AuthenticationContext";
// // import socket from "../../socket";
// // import "./Messaging.css";

// // const Messaging = () => {
// //   const { user } = useContext(AuthenticationContext);
// //   const currentUserId = user?._id;

// //   const [conversationId, setConversationId] = useState(null);
// //   const [messages, setMessages] = useState([]);
// //   const [users, setUsers] = useState([]);
// //   const [selectedUser, setSelectedUser] = useState(null);
// //   const [unreadPerConversation, setUnreadPerConversation] = useState({});

// //   const getConversationId = (userId1, userId2) =>
// //     [userId1, userId2].sort().join("_");

// //   // ✅ Join room & listen for new messages
// //   useEffect(() => {
// //     if (conversationId) {
// //       socket.emit("joinRoom", conversationId);
// //     }

// //     socket.on("receiveMessage", (message) => {
// //       setMessages((prev) => [...prev, message]);

// //       const { senderId, receiverId } = message;
// //       const conversationKey = getConversationId(senderId, receiverId);

// //       if (receiverId === currentUserId && selectedUser?._id !== senderId) {
// //         // ✅ Update unread count only if chat is not open
// //         setUnreadPerConversation((prev) => ({
// //           ...prev,
// //           [conversationKey]: (prev[conversationKey] || 0) + 1,
// //         }));
// //       }
// //     });

// //     return () => {
// //       socket.off("receiveMessage");
// //       socket.emit("leaveRoom", conversationId);
// //     };
// //   }, [conversationId, selectedUser, currentUserId]);

// //   // ✅ Fetch online users
// //   const fetchUsers = async () => {
// //     const res = await axios.get("http://localhost:5000/ReachNex/online-users", {
// //       withCredentials: true,
// //       headers: { userid: currentUserId },
// //     });
// //     setUsers(res.data?.users);
// //   };

// //   // ✅ Fetch per-conversation unread counts
// //   const fetchUnreadCounts = async () => {
// //     try {
// //       const res = await axios.get(
// //         `http://localhost:5000/ReachNex/message/unread-per-conversation`,
// //         {
// //           headers: { userid: currentUserId },
// //         }
// //       );
// // console.log("🔄 API response:", res.data);

// //       const counts = {};
// //       res.data?.forEach((item) => {
// //         counts[item.conversationId] = item.count;
// //         console.log(item)
// //       });

// //       setUnreadPerConversation(counts);
// //     } catch (err) {
// //       console.error("Failed to fetch unread counts:", err);
// //     }
// //   };

// //   useEffect(() => {
// //     if (currentUserId) {
// //       fetchUsers();
// //       fetchUnreadCounts();
// //     }
// //   }, [currentUserId]);

// //   return (
// //     <div className="messaging-container">
// //       <div className="chat-list-section">
// //         <ChatList
// //           users={users}
// //           selectedUser={selectedUser}
// //           setSelectedUser={(user) => {
// //             setSelectedUser(user);
// //             const key = getConversationId(currentUserId, user._id);
// //             setUnreadPerConversation((prev) => ({
// //               ...prev,
// //               [key]: 0, // reset unread count for selected chat
// //             }));
// //           }}
// //           unreadPerConversation={unreadPerConversation}
// //         />
// //       </div>

// //       <div className="chat-detail-section">
// //         {selectedUser ? (
// //           <ChatDetail
// //             receiverId={selectedUser._id}
// //             setConversationId={setConversationId}
// //           />
// //         ) : (
// //           <div className="empty-chat">Select a chat to start messaging</div>
// //         )}
// //       </div>
// //     </div>
// //   );
// // };

// // export default Messaging;

// // import React, { useEffect, useState, useContext } from "react";
// // import ChatList from "./ChatList";
// // import ChatDetail from "./ChatDetail";
// // import axios from "axios";
// // import AuthenticationContext from "../../components/Contexts/AuthenticationContext/AuthenticationContext";
// // import socket from "../../socket";
// // import "./Messaging.css";

// // const Messaging = () => {
// //   const { user } = useContext(AuthenticationContext);
// //   const currentUserId = user?._id;

// //   const [conversationId, setConversationId] = useState(null);
// //   const [messages, setMessages] = useState([]);
// //   const [users, setUsers] = useState([]);
// //   const [selectedUser, setSelectedUser] = useState(null);
// //   const [unreadPerConversation, setUnreadPerConversation] = useState({});

// //   const getConversationId = (userId1, userId2) =>
// //     [userId1, userId2].sort().join("_");

// //   // Join socket room and listen for messages
// //   useEffect(() => {
// //     if (conversationId) {
// //       socket.emit("joinRoom", conversationId);
// //     }

// //     socket.on("receiveMessage", (message) => {
// //       setMessages((prev) => [...prev, message]);

// //       const { senderId, receiverId } = message;
// //       const conversationKey = getConversationId(senderId, receiverId);

// //       // Increment unread count if chat not open and message is for current user
// //       if (receiverId === currentUserId && selectedUser?._id !== senderId) {
// //         setUnreadPerConversation((prev) => ({
// //           ...prev,
// //           [conversationKey]: (prev[conversationKey] || 0) + 1,
// //         }));
// //       }
// //     });

// //     return () => {
// //       socket.off("receiveMessage");
// //       socket.emit("leaveRoom", conversationId);
// //     };
// //   }, [conversationId, selectedUser, currentUserId]);

// //   // Fetch users online
// //   const fetchUsers = async () => {
// //     const res = await axios.get("http://localhost:5000/ReachNex/online-users", {
// //       withCredentials: true,
// //       headers: { userid: currentUserId },
// //     });
// //     setUsers(res.data?.users);
// //   };

// //   // Fetch unread counts per conversation
// //   const fetchUnreadCounts = async () => {
// //     try {
// //       const res = await axios.get(
// //         `http://localhost:5000/ReachNex/message/unread-per-conversation`,
// //         {
// //           headers: { userid: currentUserId },
// //         }
// //       );

// //       const counts = {};
// //       res.data?.forEach((item) => {
// //         counts[item.conversationId] = item.count;
// //       });

// //       setUnreadPerConversation(counts);
// //     } catch (err) {
// //       console.error("Failed to fetch unread counts:", err);
// //     }
// //   };

// //   // API call to mark conversation as read
// //   const markConversationAsRead = async (conversationId) => {
// //     try {
// //       await axios.post(
// //         "http://localhost:5000/ReachNex/message/mark-as-read",
// //         { conversationId },
// //         {
// //           headers: { userid: currentUserId },
// //           withCredentials: true,
// //         }
// //       );
// //     } catch (error) {
// //       console.error("Failed to mark conversation as read:", error);
// //     }
// //   };

// //   useEffect(() => {
// //     if (currentUserId) {
// //       fetchUsers();
// //       fetchUnreadCounts();
// //     }
// //   }, [currentUserId]);

// //   return (
// //     <div className="messaging-container">
// //       <div className="chat-list-section">
// //         <ChatList
// //           users={users}
// //           selectedUser={selectedUser}
// //           setSelectedUser={async (user) => {
// //             setSelectedUser(user);

// //             const key = getConversationId(currentUserId, user._id);

// //             // Mark as read on backend
// //             await markConversationAsRead(key);

// //             // Reset unread count locally
// //             setUnreadPerConversation((prev) => ({
// //               ...prev,
// //               [key]: 0,
// //             }));
// //           }}
// //           unreadPerConversation={unreadPerConversation}
// //         />
// //       </div>

// //       <div className="chat-detail-section">
// //         {selectedUser ? (
// //           <ChatDetail receiverId={selectedUser._id} setConversationId={setConversationId} />
// //         ) : (
// //           <div className="empty-chat">Select a chat to start messaging</div>
// //         )}
// //       </div>
// //     </div>
// //   );
// // };

// // export default Messaging;

import React, { useEffect, useState, useContext } from "react";
import ChatList from "./ChatList";
import ChatDetail from "./ChatDetail";
import axios from "axios";
import AuthenticationContext from "../../components/Contexts/AuthenticationContext/AuthenticationContext";
import socket from "../../socket";
import "./Messaging.css";

const Messaging = () => {
  const { user } = useContext(AuthenticationContext);
  const currentUserId = user?._id;

  const [conversationId, setConversationId] = useState(null);
  const [messages, setMessages] = useState([]);
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [unreadPerConversation, setUnreadPerConversation] = useState({});

  const getConversationId = (userId1, userId2) =>
    [userId1, userId2].sort().join("_");

  // Join socket room and listen for messages
  useEffect(() => {
    if (conversationId) {
      socket.emit("joinRoom", conversationId);
    }

    socket.on("receiveMessage", (message) => {
      setMessages((prev) => [...prev, message]);

      const { senderId, receiverId } = message;
      const conversationKey = getConversationId(senderId, receiverId);

      // Increment unread count if chat not open and message is for current user
      if (receiverId === currentUserId && selectedUser?._id !== senderId) {
        setUnreadPerConversation((prev) => ({
          ...prev,
          [conversationKey]: (prev[conversationKey] || 0) + 1,
        }));
      }
    });

    return () => {
      socket.off("receiveMessage");
      socket.emit("leaveRoom", conversationId);
    };
  }, [conversationId, selectedUser, currentUserId]);

  // Fetch users online
  const fetchUsers = async () => {
    try {
      const res = await axios.get("http://localhost:5000/ReachNex/online-users", {
        withCredentials: true,
        headers: { userid: currentUserId },
      });
      setUsers(res.data?.users);
    } catch (err) {
      console.error("Failed to fetch users:", err);
    }
  };

  // Fetch unread counts per conversation
  const fetchUnreadCounts = async () => {
    try {
      const res = await axios.get(
        `http://localhost:5000/ReachNex/message/unread-per-conversation`,
        {
          headers: { userid: currentUserId },
        }
      );

      const counts = {};
      res.data?.forEach((item) => {
        counts[item.conversationId] = item.count;
      });

      setUnreadPerConversation(counts);
    } catch (err) {
      console.error("Failed to fetch unread counts:", err);
    }
  };

  // API call to mark conversation as read (PUT request with conversationId in URL param)
  const markConversationAsRead = async (convId) => {
    try {
      await axios.put(
        `http://localhost:5000/ReachNex/message/conversation/${convId}/read`,
        {}, // empty body
        {
          headers: { userid: currentUserId },
          withCredentials: true,
        }
      );
    } catch (error) {
      console.error("Failed to mark conversation as read:", error);
    }
  };

  useEffect(() => {
    if (currentUserId) {
      fetchUsers();
      fetchUnreadCounts();
    }
  }, [currentUserId]);

  return (
    <div className="messaging-container">
      <div className="chat-list-section">
        <ChatList
          users={users}
          selectedUser={selectedUser}
          setSelectedUser={async (user) => {
            setSelectedUser(user);

            const key = getConversationId(currentUserId, user._id);

            // Mark as read on backend
            await markConversationAsRead(key);

            // Reset unread count locally
            setUnreadPerConversation((prev) => ({
              ...prev,
              [key]: 0,
            }));

            setConversationId(key);
          }}
          unreadPerConversation={unreadPerConversation}
        />
      </div>

      <div className="chat-detail-section">
        {selectedUser ? (
          <ChatDetail receiverId={selectedUser._id} setConversationId={setConversationId} />
        ) : (
          <div className="empty-chat">Select a chat to start messaging</div>
        )}
      </div>
    </div>
  );
};

export default Messaging;
// import React, { useEffect, useState, useContext } from "react";
// import ChatList from "./ChatList";
// import ChatDetail from "./ChatDetail";
// import axios from "axios";
// import AuthenticationContext from "../../components/Contexts/AuthenticationContext/AuthenticationContext";
// import socket from "../../socket";
// import "./Messaging.css";

// const Messaging = () => {
//   const { user } = useContext(AuthenticationContext);
//   const currentUserId = user?._id;

//   const [conversationId, setConversationId] = useState(null);
//   const [messages, setMessages] = useState([]);
//   const [users, setUsers] = useState([]);
//   const [selectedUser, setSelectedUser] = useState(null);
//   const [unreadPerConversation, setUnreadPerConversation] = useState({});

//   // Helper: create consistent conversationId key from two userIds
//   const getConversationId = (userId1, userId2) =>
//     [userId1, userId2].sort().join("_");

//   // Join socket room and listen for new messages
//   useEffect(() => {
//     if (conversationId) {
//       socket.emit("joinRoom", conversationId);
//     }

//     const handleReceiveMessage = (message) => {
//       setMessages((prev) => [...prev, message]);

//       const { senderId, receiverId } = message;
//       const conversationKey = getConversationId(senderId, receiverId);

//       // If current user is receiver and chat with sender is NOT open, increment unread count
//       if (receiverId === currentUserId && selectedUser?._id !== senderId) {
//         setUnreadPerConversation((prev) => ({
//           ...prev,
//           [conversationKey]: (prev[conversationKey] || 0) + 1,
//         }));
//       }
//     };

//     socket.on("receiveMessage", handleReceiveMessage);

//     return () => {
//       socket.off("receiveMessage", handleReceiveMessage);
//       if (conversationId) {
//         socket.emit("leaveRoom", conversationId);
//       }
//     };
//   }, [conversationId, selectedUser, currentUserId]);

//   // Fetch online users from backend
//   const fetchUsers = async () => {
//     try {
//       const res = await axios.get("http://localhost:5000/ReachNex/online-users", {
//         withCredentials: true,
//         headers: { userid: currentUserId },
//       });
//       setUsers(res.data?.users);
//     } catch (err) {
//       console.error("Failed to fetch users:", err);
//     }
//   };

//   // Fetch unread counts per conversation from backend
//   const fetchUnreadCounts = async () => {
//     try {
//       const res = await axios.get(
//         `http://localhost:5000/ReachNex/message/unread-per-conversation`,
//         {
//           headers: { userid: currentUserId },
//         }
//       );

//       const counts = {};
//       res.data?.forEach((item) => {
//         counts[item.conversationId] = item.count;
//       });

//       setUnreadPerConversation(counts);
//     } catch (err) {
//       console.error("Failed to fetch unread counts:", err);
//     }
//   };

//   // Mark a conversation as read (calls backend API)
//   const markConversationAsRead = async (convId) => {
//     try {
//       await axios.put(
//         `http://localhost:5000/ReachNex/message/conversation/${convId}/read`,
//         {}, // empty body
//         {
//           headers: { userid: currentUserId },
//           withCredentials: true,
//         }
//       );
//     } catch (error) {
//       console.error("Failed to mark conversation as read:", error);
//     }
//   };

//   // Load initial data: users & unread counts
//   useEffect(() => {
//     if (currentUserId) {
//       fetchUsers();
//       fetchUnreadCounts();
//     }
//   }, [currentUserId]);

//   return (
//     <div className="messaging-container">
//       <div className="chat-list-section">
//         <ChatList
//           users={users}
//           selectedUser={selectedUser}
//           setSelectedUser={async (user) => {
//             setSelectedUser(user);

//             const key = getConversationId(currentUserId, user._id);

//             // Mark conversation as read in backend
//             await markConversationAsRead(key);

//             // Reset unread count locally
//             setUnreadPerConversation((prev) => ({
//               ...prev,
//               [key]: 0,
//             }));

//             setConversationId(key);
//           }}
//           unreadPerConversation={unreadPerConversation}
//         />
//       </div>

//       <div className="chat-detail-section">
//         {selectedUser ? (
//           <ChatDetail receiverId={selectedUser._id} setConversationId={setConversationId} />
//         ) : (
//           <div className="empty-chat">Select a chat to start messaging</div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default Messaging;
