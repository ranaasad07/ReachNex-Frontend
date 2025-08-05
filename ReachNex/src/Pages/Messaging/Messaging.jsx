

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

//   const getConversationId = (userId1, userId2) =>
//     [userId1, userId2].sort().join("_");

//   // Join socket room and listen for messages
//   useEffect(() => {
//     if (conversationId) {
//       socket.emit("joinRoom", conversationId);
//     }

//     socket.on("receiveMessage", (message) => {
//       setMessages((prev) => [...prev, message]);

//       const { senderId, receiverId } = message;
//       const conversationKey = getConversationId(senderId, receiverId);

//       // Increment unread count if chat not open and message is for current user
//       if (receiverId === currentUserId && selectedUser?._id !== senderId) {
//         setUnreadPerConversation((prev) => ({
//           ...prev,
//           [conversationKey]: (prev[conversationKey] || 0) + 1,
//         }));
//       }
//     });

//     return () => {
//       socket.off("receiveMessage");
//       socket.emit("leaveRoom", conversationId);
//     };
//   }, [conversationId, selectedUser, currentUserId]);

//   // Fetch users online
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

//   // Fetch unread counts per conversation
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

//   // API call to mark conversation as read (PUT request with conversationId in URL param)
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

//             // Mark as read on backend
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

  // Join socket room and listen for incoming messages
  useEffect(() => {
    if (conversationId) {
      socket.emit("joinRoom", conversationId);
    }

    socket.on("receiveMessage", (message) => {
      setMessages((prev) => [...prev, message]);

      const { senderId, receiverId } = message;
      const conversationKey = getConversationId(senderId, receiverId);

      // Increment unread count if current user is receiver and the chat with sender is not open
      if (receiverId === currentUserId && selectedUser?._id !== senderId) {
        setUnreadPerConversation((prev) => ({
          ...prev,
          [conversationKey]: (prev[conversationKey] || 0) + 1,
        }));
      }
    });

    return () => {
      socket.off("receiveMessage");
      if (conversationId) socket.emit("leaveRoom", conversationId);
    };
  }, [conversationId, selectedUser, currentUserId]);

  // Fetch users online
  const fetchUsers = async () => {
    try {
      const res = await axios.get("http://localhost:5000/ReachNex/online-users", {
        withCredentials: true,
        headers: { userid: currentUserId },
      });
      setUsers(res.data?.users || []);
    } catch (err) {
      console.error("Failed to fetch users:", err);
    }
  };

  // Fetch unread message counts per conversation
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

  // API call to mark conversation as read on backend
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

  // Initial data fetch when user is available
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
