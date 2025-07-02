// === 📁 src/Pages/Messaging/ChatList.jsx ===
import React from "react";

const ChatList = ({ users, selectedUser, setSelectedUser }) => {
  return (
    <div className="w-72 bg-white border-r border-gray-300 overflow-y-auto">
      <h2 className="text-lg font-semibold p-4 border-b">Online Users</h2>
      {users.map((user) => (
        <div
          key={user._id}
          onClick={() => setSelectedUser(user)}
          className={` flex items-center px-4 py-2 cursor-pointer hover:bg-gray-100 ${
            selectedUser?._id === user._id ? "bg-gray-200" : ""
          }`}

        >
          <img
            src={user.profilePicture || "/default.jpg"}
            alt="profile"
            className="w-10 h-10 rounded-full object-cover mr-3"
            width={100}
            height={100}
          />
          <div>
            <p className="font-medium">{user.fullName}</p>
            <p className="text-sm text-green-600">Online</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ChatList;
