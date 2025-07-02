// 📁 src/Pages/Messaging/ChatBox.jsx
import React, { useEffect, useRef } from "react";

const ChatBox = ({ messages, currentUserId }) => {
  const bottomRef = useRef();

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <div className="flex-1 overflow-y-auto px-6 py-4 bg-[#fafafa] h-full">
      {messages.map((msg, index) => {
        const isMine = msg.senderId === currentUserId;
        return (
          <div
            key={index}
            className={`max-w-[70%] px-4 py-2 rounded-2xl shadow-md text-sm break-words ${
              isMine
                ? "ml-auto bg-blue-500 text-white rounded-br-none"
                : "mr-auto bg-gray-200 text-gray-900 rounded-bl-none"
            } mb-3`}
          >
            {msg.text}
          </div>
        );
      })}
      <div ref={bottomRef}></div>
    </div>

    // <div className="flex-1 overflow-y-auto px-6 py-4 bg-white h-full">
    //   {messages.map((msg, index) => {
    //     const isMine = msg.senderId === currentUserId;
    //     return (
    //       <div
    //         key={index}
    //         className={`max-w-sm px-4 py-2 rounded-2xl shadow ${
    //           isMine
    //             ? "ml-auto bg-blue-500 text-white rounded-br-none"
    //             : "mr-auto bg-gray-100 text-gray-900 rounded-bl-none"
    //         } mb-3`}
    //       >
    //         {msg.text}
    //       </div>
    //     );
    //   })}
    //   <div ref={bottomRef}></div>
    // </div>
  );
};

export default ChatBox;
