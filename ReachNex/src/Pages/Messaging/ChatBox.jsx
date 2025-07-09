import React, { useEffect, useRef } from "react";

const ChatBox = ({ messages, currentUserId }) => {
  const bottomRef = useRef();

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <div className="flex-1 overflow-y-auto px-6 py-4 bg-[#fafafa] h-full">
      {messages.map((msg, index) => {
        const isMine = msg.sender === currentUserId;
        const isLastMine =
          isMine && messages.filter((m) => m.sender === currentUserId).at(-1)?._id === msg._id;

        return (
          <div key={index} className="mb-3">
            <div
              className={`max-w-[70%] px-4 py-2 rounded-2xl shadow-md text-sm break-words ${
                isMine
                  ? "ml-auto bg-blue-500 text-white rounded-br-none"
                  : "mr-auto bg-gray-200 text-gray-900 rounded-bl-none"
              }`}
            >
              {msg.text}
            </div>

            {isMine && isLastMine && (
              <p className="text-xs text-gray-500 text-right mt-1 pr-2">
                {msg.seen ? "Seen" : "Delivered"}
              </p>
            )}
          </div>
        );
      })}
      <div ref={bottomRef}></div>
    </div>
  );
};

export default ChatBox;
