// === 📁 src/Pages/Messaging/ChatBox.jsx ===
import React, { useEffect, useRef } from "react";

const ChatBox = ({ messages, currentUserId }) => {
  const bottomRef = useRef();

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <div className="flex-1 overflow-y-auto p-4 bg-white h-full">
      {messages.map((msg, index) => (
        <div
          key={index}
          className={`max-w-xs mb-2 px-4 py-2 rounded-lg ${
            msg.senderId === currentUserId
              ? "ml-auto bg-blue-500 text-white"
              : "mr-auto bg-gray-200 text-gray-900"
          }`}
        >
          {msg.text}
        </div>
      ))}
      <div ref={bottomRef}></div>
    </div>
  );
};

export default ChatBox;
