// import { useNavigate } from "react-router-dom";

// const ChatList = ({ users, selectedUser, setSelectedUser }) => {
//   const navigate = useNavigate();

//   return (
//     <div className="w-80 bg-white border-r border-gray-200 overflow-y-auto h-full">
//       <h2 className="text-lg font-semibold px-4 py-3 border-b border-gray-200 text-gray-800">
//         Messaging
//       </h2>

//       {users.map((user) => {
//         const isSelected = selectedUser?._id === user._id;

//         return (
//           <div
//             key={user._id}
//             onClick={() => {
//               setSelectedUser(user);
//               // navigate(`/messaging/${user._id}`);
//             }}
//             className={`flex items-start gap-3 px-4 py-3 cursor-pointer ${
//               isSelected ? "bg-blue-50" : "hover:bg-gray-50"
//             } border-b border-gray-100`}
//           >
//             {/* Profile Image */}
//             <div className="relative flex-shrink-0">
//               <img
//                 src={
//                   user.profilePicture ||
//                   "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRX-cskA2FbOzFi7ACNiGruheINgAXEqFL1TQ&s"
//                 }
//                 alt="profile"
//                 className="w-10 h-10 rounded-full object-cover"
//                 width={100}
//                 height={100}
//               />
//               {/* Online Dot - removed since not shown in image */}
//             </div>

//             {/* Text Content */}
//             <div className="flex-1 min-w-0">
//               <div className="flex justify-between items-baseline">
//                 <h3 className="font-medium text-sm text-gray-900 truncate">
//                   {user.fullName || "Unknown User"}
//                 </h3>
//                 <span className="text-xs text-gray-400 ml-2 whitespace-nowrap">
//                   {user.lastActive || "12:38 pm"}
//                 </span>
//               </div>
//               <p className="text-xs text-gray-500 truncate mt-1">
//                 {user.lastMessage || "You are now connected"}
//               </p>
//               {user.senderName && (
//                 <span className="text-xs text-gray-500">
//                   {user.senderName}:{" "}
//                 </span>
//               )}
//             </div>

//             {/* Unread Badge - removed since not shown in image */}
//           </div>
//         );
//       })}
//     </div>
//   );
// };

// export default ChatList;



























import { useNavigate } from "react-router-dom";
import "./ChatList.css";

const ChatList = ({ users, selectedUser, setSelectedUser }) => {
  const navigate = useNavigate();

  return (
    <div className="chatListContainer">
      <h2 className="chatListHeader">Messaging</h2>

      {users.map((user) => {
        const isSelected = selectedUser?._id === user._id;

        return (
          <div
            key={user._id}
            onClick={() => {
              setSelectedUser(user);
            }}
            className={`chatListItem ${isSelected ? "selected" : ""}`}
          >
            <div className="avatarWrapper">
              <img
                src={
                  user.profilePicture ||
                  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRX-cskA2FbOzFi7ACNiGruheINgAXEqFL1TQ&s"
                }
                alt="profile"
                className="chatAvatar"
              />
            </div>

            <div className="chatInfo">
              <div className="chatTop">
                <h3 className="chatUserName">
                  {user.fullName || "Unknown User"}
                </h3>
                <span className="chatTime">
                  {user.lastActive || "12:38 pm"}
                </span>
              </div>
              <p className="chatMessage">
                {user.lastMessage || "You are now connected"}
              </p>
              {user.senderName && (
                <span className="senderName">{user.senderName}:</span>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default ChatList;

