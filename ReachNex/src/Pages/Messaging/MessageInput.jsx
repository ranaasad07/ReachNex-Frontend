// src/Pages/Messaging/MessageInput.jsx
import React, { useState } from "react";

const MessageInput = ({ onSend }) => {
  const [text, setText] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!text.trim()) return;
    onSend(text.trim());
    setText("");
  };

  return (
    <form onSubmit={handleSubmit} className="flex p-4 border-t bg-white gap-2">
      <input
        type="text"
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Type a message..."
        className="flex-1 border border-gray-300 rounded-full px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-50"
      />
      <button
        type="submit"
        className="bg-blue-600 text-black px-5 py-2 rounded-full hover:bg-blue-700 transition text-sm"
      >
        Send
      </button>
    </form>
  );
};

export default MessageInput;
