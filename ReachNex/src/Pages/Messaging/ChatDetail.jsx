
// // 📁 src/Pages/Messaging/ChatDetail.jsx
// import React, { useContext, useEffect, useState, useRef } from "react";
// import { useParams } from "react-router-dom";
// import axios from "axios";
// import AuthenticationContext from "../../components/Contexts/AuthenticationContext/AuthenticationContext";
// import MessageInput from "./MessageInput";
// import socket from "../../socket";
// import style from "./ChatDetail.module.css";

// const ChatDetail = () => {
//   const { id: receiverId } = useParams();
//   const { user } = useContext(AuthenticationContext);
//   const [messages, setMessages] = useState([]);
//   const [receiver, setReceiver] = useState(null);
//   const [conversationId, setConversationId] = useState(null);
//   const bottomRef = useRef();
//   const currentUserId = user?._id;

//   // ✅ Fetch conversation and join room
//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const receiverRes = await axios.get(`http://localhost:5000/ReachNex/getuser/${receiverId}`);
//         setReceiver(receiverRes.data.user);

//         const convoRes = await axios.post(`http://localhost:5000/ReachNex/conversations`, {
//           receiverId
//         }, {
//           headers: { userid: currentUserId }
//         });

//         const convId = convoRes.data._id;
//         setConversationId(convId);

//         const msgRes = await axios.get(`http://localhost:5000/ReachNex/getmessages/${convId}`);
//         setMessages(msgRes.data);

//         socket.emit("joinRoom", convId);
//       } catch (err) {
//         console.error("Fetch Error:", err.message);
//       }
//     };

//     if (currentUserId && receiverId) {
//       fetchData();
//     }

//     return () => {
//       socket.emit("leaveRoom", conversationId);
//     };
//   }, [receiverId, currentUserId]);

//   // ✅ Real-time receive messages
//   useEffect(() => {
//     const handleMessage = (message) => {
//       if (message.conversation === conversationId) {
//         setMessages((prev) => [...prev, message]);
//       }
//     };

//     socket.on("receiveMessage", handleMessage);
//     return () => socket.off("receiveMessage", handleMessage);
//   }, [conversationId]);

//   useEffect(() => {
//     bottomRef.current?.scrollIntoView({ behavior: "smooth" });
//   }, [messages]);

//   // ✅ Send message
//   const handleSend = async (text) => {
//     try {
//       const res = await axios.post(`http://localhost:5000/ReachNex/messages`, {
//         text
//       }, {
//         headers: {
//           senderid: currentUserId,
//           receiverid: receiverId,
//           conversationid: conversationId
//         }
//       });

//       const newMsg = res.data;
//       socket.emit("sendMessage", { ...newMsg, receiverId });
//       setMessages((prev) => [...prev, newMsg]);
//     } catch (err) {
//       console.error("Send Error:", err.message);
//     }
//   };

//   return (
//     <div className={style.chatContainer}>
//       {/* Header */}
//       <div className={style.chatHeader}>
//         <div className={style.headerContent}>
//           <img
//             src={receiver?.profilePicture || "https://i.pravatar.cc/150?img=56"}
//             alt="profile"
//             className={style.userimg}
//           />
//           <div>
//             <h2 className={style.userName}>{receiver?.fullName || "Loading..."}</h2>
//             <p className={style.onlineText}>Online</p>
//           </div>
//         </div>
//       </div>

//       {/* Body */}
//       <div className={style.messageArea}>
//         <div className={style.messageBox}>
//           {messages.map((msg, i) => {
//             const isMine = msg.senderId === currentUserId || msg.senderId?._id === currentUserId;
//             return (
//               <div key={i} className={isMine ? style.myMessage : style.theirMessage}>
//                 <p>{msg.text}</p>
//                 <p className={style.timeText}>
//                   {new Date(msg.createdAt).toLocaleTimeString()}
//                 </p>
//               </div>
//             );
//           })}
//           <div ref={bottomRef}></div>
//         </div>
//       </div>

//       {/* Input */}
//       <div className={style.inputContainer}>
//         <div className={style.inputBox}>
//           <MessageInput onSend={handleSend} />
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ChatDetail;







// import React, { useContext, useEffect, useState, useRef } from "react";
// import { useParams } from "react-router-dom";
// import axios from "axios";
// import AuthenticationContext from "../../components/Contexts/AuthenticationContext/AuthenticationContext";
// import MessageInput from "./MessageInput";
// import socket from "../../socket";
// import style from "./ChatDetail.module.css";

// const ChatDetail = () => {
//   const { id: receiverId } = useParams();
//   const { user } = useContext(AuthenticationContext);
//   const [messages, setMessages] = useState([]);
//   const [receiver, setReceiver] = useState(null);
//   const [conversationId, setConversationId] = useState(null);
//   const bottomRef = useRef();
//   const currentUserId = user?._id;

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const receiverRes = await axios.get(`http://localhost:5000/ReachNex/getuser/${receiverId}`);
//         setReceiver(receiverRes.data.user);

//         const convoRes = await axios.post(`http://localhost:5000/ReachNex/conversations`, {
//           receiverId
//         }, {
//           headers: { userid: currentUserId }
//         });

//         const convId = convoRes.data._id;
//         setConversationId(convId);

//         const msgRes = await axios.get(`http://localhost:5000/ReachNex/getmessages/${convId}`);
//         setMessages(msgRes.data);

//         socket.emit("joinRoom", convId);
//       } catch (err) {
//         console.error("Error fetching chat data:", err.message);
//       }
//     };

//     if (currentUserId && receiverId) {
//       fetchData();
//     }

//     return () => {
//       socket.emit("leaveRoom", conversationId);
//     };
//   }, [receiverId, currentUserId]);

//   // 👇 only append if message not already in list
//   useEffect(() => {
//     const handler = (message) => {
//       if (message.conversation === conversationId) {
//         setMessages((prev) => {
//           const alreadyExists = prev.some((msg) => msg._id === message._id);
//           return alreadyExists ? prev : [...prev, message];
//         });
//       }
//     };

//     socket.on("receiveMessage", handler);
//     return () => socket.off("receiveMessage", handler);
//   }, [conversationId]);

//   useEffect(() => {
//     bottomRef.current?.scrollIntoView({ behavior: "smooth" });
//   }, [messages]);

//   const handleSend = async (text) => {
//     try {
//       const res = await axios.post(`http://localhost:5000/ReachNex/messages`,
//         { text },
//         {
//           headers: {
//             senderid: currentUserId,
//             receiverid: receiverId,
//             conversationid: conversationId
//           }
//         });

//       // 👇 don't setMessages here — real-time socket will handle it
//       socket.emit("sendMessage", { ...res.data, receiverId });
//     } catch (err) {
//       console.error("Send error:", err.message);
//     }
//   };

//   return (
//     <div className={style.chatContainer}>
//       <div className={style.chatHeader}>
//         <div className={style.headerContent}>
//           <img
//             src={receiver?.profilePicture || "https://i.pravatar.cc/150?img=56"}
//             alt="profile"
//             className={style.userimg}
//           />
//           <div>
//             <h2 className={style.userName}>{receiver?.fullName || "Loading..."}</h2>
//             <p className={style.onlineText}>Online</p>
//           </div>
//         </div>
//       </div>

//       <div className={style.messageArea}>
//         <div className={style.messageBox}>
//           {messages.map((msg, index) => {
//             const isMine = msg.senderId === currentUserId || msg.senderId?._id === currentUserId;
//             return (
//               <div
//                 key={msg._id}
//                 className={isMine ? style.myMessage : style.theirMessage}
//               >
//                 <p>{msg.text}</p>
//                 <p className={style.timeText}>
//                   {new Date(msg.createdAt).toLocaleTimeString()}
//                 </p>
//               </div>
//             );
//           })}
//           <div ref={bottomRef}></div>
//         </div>
//       </div>

//       <div className={style.inputContainer}>
//         <div className={style.inputBox}>
//           <MessageInput onSend={handleSend} />
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ChatDetail;





import React, { useContext, useEffect, useState, useRef } from "react";
import axios from "axios";
import AuthenticationContext from "../../components/Contexts/AuthenticationContext/AuthenticationContext";
import MessageInput from "./MessageInput";
import socket from "../../socket";
import style from "./ChatDetail.module.css";

const ChatDetail = ({ receiverId }) => {
  const { user } = useContext(AuthenticationContext);
  const [messages, setMessages] = useState([]);
  const [receiver, setReceiver] = useState(null);
  const [conversationId, setConversationId] = useState(null);
  const bottomRef = useRef();
  const currentUserId = user?._id;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const receiverRes = await axios.get(`http://localhost:5000/ReachNex/getuser/${receiverId}`);
        setReceiver(receiverRes.data.user);

        const convoRes = await axios.post(`http://localhost:5000/ReachNex/conversations`, {
          receiverId
        }, {
          headers: { userid: currentUserId }
        });

        const convId = convoRes.data._id;
        setConversationId(convId);

        const msgRes = await axios.get(`http://localhost:5000/ReachNex/getmessages/${convId}`);
        setMessages(msgRes.data);

        socket.emit("joinRoom", convId);
      } catch (err) {
        console.error("Error fetching chat data:", err.message);
      }
    };

    if (currentUserId && receiverId) {
      fetchData();
    }

    return () => {
      socket.emit("leaveRoom", conversationId);
    };
  }, [receiverId, currentUserId]);

  useEffect(() => {
    const handler = (message) => {
      if (message.conversation === conversationId) {
        setMessages((prev) => {
          const alreadyExists = prev.some((msg) => msg._id === message._id);
          return alreadyExists ? prev : [...prev, message];
        });
      }
    };

    socket.on("receiveMessage", handler);
    return () => socket.off("receiveMessage", handler);
  }, [conversationId]);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSend = async (text) => {
    try {
      const res = await axios.post(`http://localhost:5000/ReachNex/messages`,
        { text },
        {
          headers: {
            senderid: currentUserId,
            receiverid: receiverId,
            conversationid: conversationId
          }
        });

      socket.emit("sendMessage", { ...res.data, receiverId });
    } catch (err) {
      console.error("Send error:", err.message);
    }
  };

  return (
    <div className={style.chatContainer}>
      <div className={style.chatHeader}>
        <div className={style.headerContent}>
          <img
            src={receiver?.profilePicture || "https://i.pravatar.cc/150?img=56"}
            alt="profile"
            className={style.userimg}
          />
          <div>
            <h2 className={style.userName}>{receiver?.fullName || "Loading..."}</h2>
            <p className={style.onlineText}>Online</p>
          </div>
        </div>
      </div>

      <div className={style.messageArea}>
        <div className={style.messageBox}>
          {messages.map((msg) => {
            const isMine = msg.senderId === currentUserId || msg.senderId?._id === currentUserId;
            return (
              <div
                key={msg._id}
                className={isMine ? style.myMessage : style.theirMessage}
              >
                <p>{msg.text}</p>
                <p className={style.timeText}>
                  {new Date(msg.createdAt).toLocaleTimeString()}
                </p>
              </div>
            );
          })}
          <div ref={bottomRef}></div>
        </div>
      </div>

      <div className={style.inputContainer}>
        <div className={style.inputBox}>
          <MessageInput onSend={handleSend} />
        </div>
      </div>
    </div>
  );
};

export default ChatDetail;
