
// // import React, { useEffect, useState, useContext } from "react";
// // import ChatList from "./ChatList";
// // import ChatBox from "./ChatBox";
// // import MessageInput from "./MessageInput";
// // import ChatDetail from "./ChatDetail";
// // import axios from "axios";
// // import AuthenticationContext from "../../components/Contexts/AuthenticationContext/AuthenticationContext";
// // import socket from "../../socket";

// // const Messaging = () => {
// //   const { user } = useContext(AuthenticationContext);
// //   const currentUserId = user?._id;

// //   const [users, setUsers] = useState([]);
// //   const [selectedUser, setSelectedUser] = useState(null);
// //   const [conversationId, setConversationId] = useState(null);
// //   const [messages, setMessages] = useState([]);

// //   // ✅ Join socket room and fetch users
// //   useEffect(() => {
// //     if (currentUserId) {
// //       socket.emit("join", currentUserId);
// //       fetchUsers();
// //     }
// //   }, [currentUserId]);

// //   // ✅ Get all users (with isOnline)
// //   const fetchUsers = async () => {
// //     try {
// //       const res = await axios.post(
// //         "http://localhost:5000/ReachNex/online-users",
// //         {
// //           withCredentials: true,
// //         }
// //       );

// //       const allUsers = res.data.users.filter((u) => u._id !== currentUserId); // remove self
// //       setUsers(allUsers);
// //     } catch (error) {
// //       console.error("Error fetching users:", error);
// //     }
// //   };

// //   // ✅ Open chat with selected user
// //   const openChat = async (user) => {
// //     try {
// //       setSelectedUser(user);
// //       console.log("🧠 clicked user:", user);

// //       const convoRes = await axios.post(
// //         "http://localhost:5000/ReachNex/conversations",
// //         { receiverId: user._id },
// //         {
// //           headers: { userid: currentUserId },
// //           withCredentials: true,
// //         }
// //       );

// //       const convoId = convoRes.data._id;
// //       setConversationId(convoId);

// //       const msgRes = await axios.get(
// //         `http://localhost:5000/ReachNex/getmessages/${convoId}`,
// //         {
// //           headers: { userid: currentUserId },
// //           withCredentials: true,
// //         }
// //       );

// //       setMessages(msgRes.data);
// //     } catch (err) {
// //       console.error("Error opening chat:", err);
// //     }
// //   };

// //   // ✅ Socket: receive messages
// //   useEffect(() => {
// //     socket.on("receiveMessage", (message) => {
// //       if (message.conversation === conversationId) {
// //         setMessages((prev) => [...prev, message]);
// //       }
// //     });

// //     return () => socket.off("receiveMessage");
// //   }, [conversationId]);

// //   // ✅ Send message
// //   const handleSend = async (text) => {
// //     if (!conversationId || !selectedUser) return;

// //     try {
// //       await axios.post(
// //         `http://localhost:5000/ReachNex/messages/${conversationId}`, // ✅ SAHI
// //         { text },
// //         {
// //           headers: { userid: currentUserId },
// //           withCredentials: true,
// //         }
// //       );

// //       const newMessage = res.data;

// //       socket.emit("sendMessage", {
// //         ...newMessage,
// //         receiverId: selectedUser._id,
// //       });

// //       setMessages((prev) => [...prev, newMessage]);
// //     } catch (error) {
// //       console.error("Error sending message:", error);
// //     }
// //   };

// //   return (
// //     <div className="flex w-full h-screen overflow-hidden bg-gray-100">
// //       <ChatList users={users} selectedUser={selectedUser} openChat={openChat} />
// //       <div className="flex flex-col flex-1">
// //         <ChatBox messages={messages} currentUserId={currentUserId} />
// //         {selectedUser && <MessageInput onSend={handleSend} />}
// //       </div>
// //     </div>
// //   );
// // };

// // export default Messaging;
// // src/Pages/Messaging/Messaging.jsx
// import React, { useEffect, useState, useContext } from "react";
// import ChatList from "./ChatList";
// import axios from "axios";
// import AuthenticationContext from "../../components/Contexts/AuthenticationContext/AuthenticationContext";
// import socket from "../../socket";

// const Messaging = () => {
//   const { user } = useContext(AuthenticationContext);
//   console.log("=-=--==-=",user)
//   const currentUserId = user?._id;
//   const [users, setUsers] = useState([]);

//   useEffect(() => {
//   if (conversationId) {
//     socket.emit("joinRoom", conversationId); // ✅ Join specific chat room
//   }

//   // socket listener
//   socket.on("receiveMessage", (message) => {
//     setMessages((prev) => [...prev, message]);
//   });

//   return () => {
//     socket.off("receiveMessage");
//     socket.emit("leaveRoom", conversationId); // optional: leave room on unmount
//   };
// }, [conversationId]);


//   const fetchUsers = async () => {
//     const res = await axios.get(
//       "http://localhost:5000/ReachNex/online-users",
//       {
//         withCredentials: true,
//         headers: { userid: currentUserId },
//       }
//     );
//     setUsers(res.data?.users);
//   };

//   return (
//     <div className="flex w-full h-screen overflow-hidden bg-gray-100">
//       <ChatList users={users} selectedUser={null} setSelectedUser={() => {}} />
//     </div>
//   );
// };

// export default Messaging;









import React, { useEffect, useState, useContext } from "react";
import ChatList from "./ChatList";
import axios from "axios";
import AuthenticationContext from "../../components/Contexts/AuthenticationContext/AuthenticationContext";
import socket from "../../socket";

const Messaging = () => {
  const { user } = useContext(AuthenticationContext);
  const currentUserId = user?._id;

  // ✅ Missing States Added:
  const [conversationId, setConversationId] = useState(null); // 👈 Fix 1
  const [messages, setMessages] = useState([]); // 👈 Fix 2
  const [users, setUsers] = useState([]);

  useEffect(() => {
    if (conversationId) {
      socket.emit("joinRoom", conversationId); // ✅ Join specific chat room
    }

    socket.on("receiveMessage", (message) => {
      setMessages((prev) => [...prev, message]);
    });

    return () => {
      socket.off("receiveMessage");
      socket.emit("leaveRoom", conversationId); // optional: leave room on unmount
    };
  }, [conversationId]);

  const fetchUsers = async () => {
    const res = await axios.get(
      "http://localhost:5000/ReachNex/online-users",
      {
        withCredentials: true,
        headers: { userid: currentUserId },
      }
    );
    setUsers(res.data?.users);
  };

  useEffect(() => {
    if (currentUserId) {
      fetchUsers();
    }
  }, [currentUserId]);

  return (
    <div className="flex w-full h-screen overflow-hidden bg-gray-100">
      <ChatList users={users} selectedUser={null} setSelectedUser={() => {}} />
    </div>
  );
};

export default Messaging;
