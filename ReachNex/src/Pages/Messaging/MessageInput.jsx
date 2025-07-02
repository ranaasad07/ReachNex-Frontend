// === 📁 src/Pages/Messaging/MessageInput.jsx ===
import React, { useState } from "react";



const MessageInput = ({ onSend }) => {
  const [text, setText] = useState("");

  const handleSubmit = (e) => {
    console.log(text, "---------------------");
    e.preventDefault();
    if (!text.trim()) return;
    onSend(text.trim());
    setText("");
  };

  return (
    <form onSubmit={handleSubmit} className="flex p-4 border-t bg-white">
      <input
        type="text"
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Type a message..."
        className="flex-1 border rounded-full px-4 py-2 mr-2 focus:outline-none"
      />
      <button
        type="submit"
        className="bg-blue-500 text-white px-4 py-2 rounded-full hover:bg-blue-600"
      >
        Send
      </button>
    </form>
  );
};

export default MessageInput;
