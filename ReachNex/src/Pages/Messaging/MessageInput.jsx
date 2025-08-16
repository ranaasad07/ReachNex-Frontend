// src/Pages/Messaging/MessageInput.jsx
import React, { useState } from "react";
import { SendHorizonal } from "lucide-react";
import "./MessageInput.css"; // Import custom CSS

const MessageInput = ({ onSend }) => {
  const [text, setText] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!text.trim()) return;
    onSend(text.trim());
    setText("");
  };

  return (
    <div className="message-input-wrapper">
      <form onSubmit={handleSubmit} className="message-form">
        <input
          type="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Write a message..."
          className="message-input"
        />
        <button type="submit" title="Send" className="send-button">
          <SendHorizonal size={16} />
          <span>Send</span>
        </button>
      </form>
    </div>
  );
};

export default MessageInput;
