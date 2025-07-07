import React, { useContext, useEffect, useState, useRef } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import AuthenticationContext from "../../components/Contexts/AuthenticationContext/AuthenticationContext";
import MessageInput from "./MessageInput";
import socket from "../../socket";
import style from "./ChatDetail.module.css";

const ChatDetail = () => {
  const { id } = useParams();
  const { user } = useContext(AuthenticationContext);
  const [messages, setMessages] = useState([]);
  const [receiver, setReceiver] = useState(null);
  const bottomRef = useRef();

  const currentUserId = user?._id;

  // Fetch Receiver Info
  useEffect(() => {
    const fetchReceiver = async () => {
      const res = await axios.get(
        `http://localhost:5000/ReachNex/getuser/${id}`
      );
      setReceiver(res.data.user);
    };
    fetchReceiver();
  }, [id]);

  // Socket: Receive Message
  useEffect(() => {
    socket.on("receiveMessage", (message) => {
      setMessages((prev) => [...prev, message]);
    });
    return () => socket.off("receiveMessage");
  }, []);

  // Fetch Chat Messages
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

  // Send Message
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

    socket.emit("sendMessage", {
      ...res.data,
      receiverId: id,
    });

    setMessages((prev) => [...prev, res.data]);
  };

  // Auto-scroll
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);
  console.log(receiver, "receiver============");
  return (
    <div className={style.chatContainer}>
      {/* Chat Header */}
      <div className={style.chatHeader}>
        <div className={style.headerContent}>
          <img
            src={
              receiver?.profilePicture ||
              "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRX-cskA2FbOzFi7ACNiGruheINgAXEqFL1TQ&s"
            }
            alt="receiver"
            className={style.userimg}
          />
          <div>
            <h2 className={style.userName}>
              {receiver?.fullName || "Loading..."}
            </h2>
            <p className={style.onlineText}>Online</p>
          </div>
        </div>
      </div>

      {/* Messages Area */}
      <div className={style.messageArea}>
        <div className={style.messageBox}>
          {messages.map((msg, index) => {
            const isMine = msg.senderId === currentUserId;
            return (
              <div
                key={index}
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

      {/* Input Box */}
      <div className={style.inputContainer}>
        <div className={style.inputBox}>
          <MessageInput onSend={handleSend} />
        </div>
      </div>
    </div>
  );
};

export default ChatDetail;
