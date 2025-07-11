
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









// import React, { useEffect, useState, useContext } from "react";
// import ChatList from "./ChatList";
// import ChatDetail from "./ChatDetail"
// import axios from "axios";
// import AuthenticationContext from "../../components/Contexts/AuthenticationContext/AuthenticationContext";
// import socket from "../../socket";

// const Messaging = () => {
//   const { user } = useContext(AuthenticationContext);
//   const currentUserId = user?._id;

//   // ✅ Missing States Added:
//   const [conversationId, setConversationId] = useState(null); // 👈 Fix 1
//   const [messages, setMessages] = useState([]); // 👈 Fix 2
//   const [users, setUsers] = useState([]);

//   useEffect(() => {
//     if (conversationId) {
//       socket.emit("joinRoom", conversationId); // ✅ Join specific chat room
//     }

//     socket.on("receiveMessage", (message) => {
//       setMessages((prev) => [...prev, message]);
//     });

//     return () => {
//       socket.off("receiveMessage");
//       socket.emit("leaveRoom", conversationId); // optional: leave room on unmount
//     };
//   }, [conversationId]);

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

//   useEffect(() => {
//     if (currentUserId) {
//       fetchUsers();
//     }
//   }, [currentUserId]);

//   return (
//     <div className="flex w-full h-screen overflow-hidden bg-gray-100">
//       <ChatList users={users} selectedUser={null} setSelectedUser={() => {}} />
//         <ChatDetail/>
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
  const navigate = useNavigate();
  
  const { user } = useContext(AuthenticationContext);
  const currentUserId = user?._id;

  const [conversationId, setConversationId] = useState(null);
  const [messages, setMessages] = useState([]);
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);

  useEffect(() => {
    if (conversationId) {
      socket.emit("joinRoom", conversationId);
    }

    socket.on("receiveMessage", (message) => {
      setMessages((prev) => [...prev, message]);
    });

    return () => {
      socket.off("receiveMessage");
      socket.emit("leaveRoom", conversationId);
    };
  }, [conversationId]);

  const fetchUsers = async () => {
    const res = await axios.get("http://localhost:5000/ReachNex/online-users", {
      withCredentials: true,
      headers: { userid: currentUserId },
    });
    setUsers(res.data?.users);
  };

  useEffect(() => {
    if (currentUserId) {
      fetchUsers();
    }
  }, [currentUserId]);


    useEffect(() => {
    const tokenforlocalstorage = localStorage.getItem("token");
    console.log(tokenforlocalstorage, "mmmmmmmmmmmmmmmmmmmmmmmmmmmm");

    if (!tokenforlocalstorage) {
      // No token, redirect to login
      // navigate("/");
      alert("you need to login first")
      navigate("/")
      return;
    }

    let decoded;
    try {
      decoded = jwtDecode(tokenforlocalstorage);
    } catch (err) {
      console.log("Invalid token:", err);
      // navigate("/");
      return;
    }

    const { username, fullname, email, id } = decoded;
    console.log(id, "tttttttttt");

    if (!id) {
      // navigate("/");
      return;
    }

    // Verify user by ID on backend
    const verifyUser = async () => {
      try {
        const res = await axios.post(
          "http://localhost:5000/reachnex/verifyloginuser",
          { id }
        );

        // Assuming res.data.findUser contains user info
        // setUser(res.data.findUser);
      } catch (err) {
        console.log(err);
        console.log("Invalid credentials");
        // navigate("/");
      }
    };

    verifyUser();
  }, [navigate]);


  return (
    <div className="messaging-container">
      <div className="chat-list-section">
        <ChatList
          users={users}
          selectedUser={selectedUser}
          setSelectedUser={setSelectedUser}
        />
      </div>

      <div className="chat-detail-section">
        {selectedUser ? (
          <ChatDetail receiverId={selectedUser._id} />
        ) : (
          <div className="empty-chat">Select a chat to start messaging</div>
        )}
      </div>
    </div>
  );
};

export default Messaging;
