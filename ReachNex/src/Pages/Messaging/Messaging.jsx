import React, { useEffect, useState } from "react";
import ChatList from "./ChatList";
import ChatBox from "./ChatBox";
import MessageInput from "./MessageInput";
import { io } from "socket.io-client";
import axios from "axios";
import { useContext } from "react";
import AuthenticationContext from "../../components/Contexts/AuthenticationContext/AuthenticationContext";
import socket from "../../socket";

// const socket = io("http://localhost:5000");

const Messaging = () => {
  const { user } = useContext(AuthenticationContext);
  console.log(JSON.stringify(user), "Cru userId======");
  // return;
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [messages, setMessages] = useState([]);

  const currentUserId = user?._id;
  console.log(user?._id, " userId======");
  // console.log(
  //   "-=-=-=-=-",
  //   user,
  //   "userId",
  //   user.id,
  //   "currentUser",
  //   currentUserId
  // );
  // const { user } = useContext(AuthenticationContext);
  // const [currentUserId, setCurrentUserId] = useState(null);

  // useEffect(() => {
  //   const fetchMe = async () => {
  //     const res = await axios.get("/ReachNex/check", { withCredentials: true });
  //     setCurrentUserId(res.data._id);
  // socket.emit("join", res.data._id);
  //   };
  //   fetchMe();
  // }, []);

  useEffect(() => {
    if (currentUserId) {
      socket.emit("join", currentUserId);
      fetchUsers();
    }
  }, [currentUserId]);

  const fetchUsers = async () => {
    const res = await axios.get(
      "http://localhost:5000/ReachNex/message/userlist",
      {
        withCredentials: true,
        headers: { userid: currentUserId },
      }
    );
    // console.log(res.data, "00000000000000000000000");
    setUsers(res.data);
  };

  useEffect(() => {
    console.log("selectedUser-----", selectedUser);
    if (selectedUser) {
      axios
        .get(`http://localhost:5000/ReachNex/message/${selectedUser._id}`, {
          withCredentials: true,
          headers: { userid: currentUserId },
        })
        .then((res) => setMessages(res.data));
    }
  }, [selectedUser]);

  const handleSend = async (text) => {
    console.log(selectedUser, "text--------");
    if (!selectedUser) return;
    const res = await axios.post(
      `http://localhost:5000/ReachNex/message/send/${selectedUser._id}`,
      {
        text,
      },
      {
        withCredentials: true,
        headers: {
          userid: currentUserId,
        },
      }
    );

    // socket.emit("sendMessage", {
    //   ...res.data,
    //   receiverId: selectedUser._id,
    // });
    setMessages((prev) => [...prev, res.data]);
  };

  return (
    <div className="flex w-full h-screen overflow-hidden bg-gray-100">
      <ChatList
        users={users}
        selectedUser={selectedUser}
        setSelectedUser={setSelectedUser}
      />
      {/* <div className="flex flex-col flex-1">
        <div className="flex-1 overflow-y-auto p-4 bg-gray-50">
          <ChatBox messages={messages} currentUserId={currentUserId} />
        </div>
        <MessageInput onSend={handleSend} />
      </div> */}
    </div>
  );
};

export default Messaging;
