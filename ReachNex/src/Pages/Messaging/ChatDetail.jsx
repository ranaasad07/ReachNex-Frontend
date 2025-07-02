import React, { useContext, useEffect, useState, useRef } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import AuthenticationContext from "../../components/Contexts/AuthenticationContext/AuthenticationContext";
import MessageInput from "./MessageInput";
import socket from "../../socket";


const ChatDetail = () => {
  const { id } = useParams(); // selected user ID
  const { user } = useContext(AuthenticationContext);
  const [messages, setMessages] = useState([]);
  const [receiver, setReceiver] = useState(null);
  const bottomRef = useRef();

  const currentUserId = user?._id;

  useEffect(() => {
    const fetchReceiver = async () => {
      const res = await axios.get(
        `http://localhost:5000/ReachNex/getuser/${id}`
      );
      setReceiver(res.data);
    };
    fetchReceiver();
  }, [id]);

    useEffect(() => {
    socket.on("receiveMessage", (message) => {
      setMessages((prev) => [...prev, message]);
    });
    return () => socket.off("receiveMessage");
  }, []);


  useEffect(() => {
    if (id && currentUserId) {
      axios
        .get(`http://localhost:5000/ReachNex/message/${id}`, {
          withCredentials: true,
          headers: { userid: currentUserId },
        })
        .then((res) => setMessages(res.data));
    }
  }, [id]);

  const handleSend = async (text) => {
    const res = await axios.post(
      `http://localhost:5000/ReachNex/message/send/${id}`,
      { text },
      {
        withCredentials: true,
        headers: {
          userid: currentUserId,
        },
      }
    );
//       socket.emit("sendMessage", {
//     ...res.data,
//     receiverId: id,
//   });
    // console.log("=-=-=-",JSON.stringify(messages))
    // console.log("=-=-=sxsss-",JSON.stringify(res.data))
    setMessages((prev) => [...prev, res.data]);
  };

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <div className="flex flex-col h-screen">
      <div className="p-4 bg-white border-b shadow">
        <h2 className="text-xl font-semibold">{receiver?.fullName}</h2>
      </div>
      <div className="flex-1 overflow-y-auto px-6 py-4 bg-gray-100">
        {messages.map((msg, index) => {
          const isMine = msg.senderId === currentUserId;
          return (
            <div
              key={index}
              className={`max-w-[70%] px-4 py-2 rounded-2xl shadow text-sm mb-3 ${
                isMine
                  ? "ml-auto bg-blue-500 text-white rounded-br-none"
                  : "mr-auto bg-white text-gray-900 rounded-bl-none"
              }`}
            >
              {msg.text}
            </div>
          );
        })}
        <div ref={bottomRef}></div>
      </div>
      <MessageInput onSend={handleSend} />
    </div>
  );
};

export default ChatDetail;
