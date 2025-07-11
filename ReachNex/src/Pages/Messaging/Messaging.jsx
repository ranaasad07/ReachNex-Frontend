
import React, { useEffect, useState, useContext } from "react";
import ChatList from "./ChatList";
import ChatDetail from "./ChatDetail";
import axios from "axios";
import AuthenticationContext from "../../components/Contexts/AuthenticationContext/AuthenticationContext";
import socket from "../../socket";
import "./Messaging.css"; // 👈 custom CSS file

const Messaging = () => {
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
