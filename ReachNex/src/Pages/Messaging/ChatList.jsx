// // // import { useNavigate } from "react-router-dom";
// // // import "./ChatList.css";

// // // const ChatList = ({ users, selectedUser, setSelectedUser }) => {
// // //   const navigate = useNavigate();

// // //   return (
// // //     <div className="chatListContainer">
// // //       <h2 className="chatListHeader">Messaging</h2>

// // //       {users.map((user) => {
// // //         const isSelected = selectedUser?._id === user._id;

// // //         return (
// // //           <div
// // //             key={user._id}
// // //             onClick={() => {
// // //               setSelectedUser(user);
// // //             }}
// // //             className={`chatListItem ${isSelected ? "selected" : ""}`}
// // //           >
// // //             <div className="avatarWrapper">
// // //               <img
// // //                 src={
// // //                   user.profilePicture ||
// // //                   "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRX-cskA2FbOzFi7ACNiGruheINgAXEqFL1TQ&s"
// // //                 }
// // //                 alt="profile"
// // //                 className="chatAvatar"
// // //               />
// // //             </div>

// // //             <div className="chatInfo">
// // //               <div className="chatTop">
// // //                 <h3 className="chatUserName">
// // //                   {user.fullName || "Unknown User"}
// // //                 </h3>
// // //                 <span className="chatTime">
// // //                   {user.lastActive || "12:38 pm"}
// // //                 </span>
// // //               </div>
// // //               <p className="chatMessage">
// // //                 {user.lastMessage || "You are now connected"}
// // //               </p>
// // //               {user.senderName && (
// // //                 <span className="senderName">{user.senderName}:</span>
// // //               )}
// // //             </div>
// // //           </div>
// // //         );
// // //       })}
// // //     </div>
// // //   );
// // // };

// // // export default ChatList;




// // import { useNavigate } from "react-router-dom";
// // import "./ChatList.css";
// // import { useContext } from "react";
// // import AuthenticationContext from "../../components/Contexts/AuthenticationContext/AuthenticationContext";

// // const ChatList = ({ users, selectedUser, setSelectedUser }) => {
// //   const navigate = useNavigate();
// //   const { user: currentUser } = useContext(AuthenticationContext);

// //   return (
// //     <div className="chatListContainer">
// //       <h2 className="chatListHeader">Messaging</h2>

// //       {users.map((user) => {
// //         // ✅ Condition: skip if user is the logged-in user
// //         if (user._id === currentUser?._id) return null;

// //         const isSelected = selectedUser?._id === user._id;

// //         return (
// //           <div
// //             key={user._id}
// //             onClick={() => {
// //               setSelectedUser(user);
// //             }}
// //             className={`chatListItem ${isSelected ? "selected" : ""}`}
// //           >
// //             <div className="avatarWrapper">
// //               <img
// //                 src={
// //                   user.profilePicture ||
// //                   "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRX-cskA2FbOzFi7ACNiGruheINgAXEqFL1TQ&s"
// //                 }
// //                 alt="profile"
// //                 className="chatAvatar"
// //               />
// //             </div>

// //             <div className="chatInfo">
// //               <div className="chatTop">
// //                 <h3 className="chatUserName">
// //                   {user.fullName || "Unknown User"}
// //                 </h3>
// //                 <span className="chatTime">
// //                   {user.lastActive || "12:38 pm"}
// //                 </span>
// //               </div>
// //               <p className="chatMessage">
// //                 {user.lastMessage || "You are now connected"}
// //               </p>
// //               {user.senderName && (
// //                 <span className="senderName">{user.senderName}:</span>
// //               )}
// //             </div>
// //           </div>
// //         );
// //       })}
// //     </div>
// //   );
// // };

// export default ChatList;
import { useNavigate } from "react-router-dom";
import "./ChatList.css";
import { useContext } from "react";
import AuthenticationContext from "../../components/Contexts/AuthenticationContext/AuthenticationContext";

const ChatList = ({
  users,
  selectedUser,
  setSelectedUser,
  unreadPerConversation = {},
}) => {
  const navigate = useNavigate();
  const { user: currentUser } = useContext(AuthenticationContext);

  const getConversationId = (userId1, userId2) =>
    [userId1, userId2].sort().join("_");

  return (
    <div className="chatListContainer">
      <h2 className="chatListHeader">Messaging</h2>

      {/* {users.map((user) => {
        if (user._id === currentUser?._id) return null;

        const isSelected = selectedUser?._id === user._id;
        const conversationKey = getConversationId(currentUser._id, user._id);
        const unreadCount = unreadPerConversation[conversationKey] || 0;

        return (
          <div
            key={user._id}
            onClick={() => setSelectedUser(user)}
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
                <h3 className="chatUserName">{user.fullName || "Unknown User"}</h3>
                <span className="chatTime">{user.lastActive || "12:38 pm"}</span>
              </div>
              <p className="chatMessage">
                {user.lastMessage || "You are now connected"}
              </p>
              {user.senderName && (
                <span className="senderName">{user.senderName}:</span>
              )}
            </div>

            {unreadCount > 0 && (
              <span className="unread-badge">{unreadCount}</span>
            )}
          </div>
        );
      })} */}
      {users.map((user) => {
  if (user._id === currentUser?._id) return null;

  const isSelected = selectedUser?._id === user._id;
  const conversationKey = getConversationId(currentUser._id, user._id);
  const unreadCount = unreadPerConversation[conversationKey] || 0;

  return (
    <div
      key={user._id}
      onClick={() => setSelectedUser(user)}
      className={`chatListItem ${isSelected ? "selected" : ""}`}
    >
      {/* avatar and other user info here */}

      <div className="chatInfo">
        <div className="chatTop">
          <h3 className="chatUserName">{user.fullName || "Unknown User"}</h3>
          <span className="chatTime">{user.lastActive || "12:38 pm"}</span>
        </div>
        <p className="chatMessage">
          {user.lastMessage || "You are now connected"}
          {unreadCount > 0 && (
            <span className="unread-badge">{unreadCount}</span>
          )}
        </p>
        {user.senderName && (
          <span className="senderName">{user.senderName}:</span>
        )}
      </div>

      {/* optionally a separate unread badge somewhere else */}
    </div>
  );
})}

    </div>
  );
};

export default ChatList;


// import { useNavigate } from "react-router-dom";
// import "./ChatList.css";
// import { useContext } from "react";
// import AuthenticationContext from "../../components/Contexts/AuthenticationContext/AuthenticationContext";

// const ChatList = ({
//   users,
//   selectedUser,
//   setSelectedUser,
//   unreadPerConversation = {},
// }) => {
//   const navigate = useNavigate();
//   const { user: currentUser } = useContext(AuthenticationContext);

//   const getConversationId = (userId1, userId2) =>
//     [userId1, userId2].sort().join("_");

//   return (
//     <div className="chatListContainer">
//       <h2 className="chatListHeader">Messaging</h2>

//       {users.map((user) => {
//         if (user._id === currentUser?._id) return null;

//         const isSelected = selectedUser?._id === user._id;
//         const conversationKey = getConversationId(currentUser._id, user._id);
//         const unreadCount = unreadPerConversation[conversationKey] || 0;

//         return (
//           <div
//             key={user._id}
//             onClick={() => setSelectedUser(user)}
//             className={`chatListItem ${isSelected ? "selected" : ""}`}
//           >
//             <div className="avatarWrapper">
//               <img
//                 src={
//                   user.profilePicture ||
//                   "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRX-cskA2FbOzFi7ACNiGruheINgAXEqFL1TQ&s"
//                 }
//                 alt="profile"
//                 className="chatAvatar"
//               />
//             </div>

//             <div className="chatInfo">
//               <div className="chatTop">
//                 <h3 className="chatUserName">{user.fullName || "Unknown User"}</h3>
//                 <span className="chatTime">{user.lastActive || "12:38 pm"}</span>
//               </div>

//               <div className="chatBottom">
//                 <p className="chatMessage">{user.lastMessage || "You are now connected"}</p>
//                 {unreadCount > 0 && (
//                   <span className="unread-badge">{unreadCount}</span>
//                 )}
//               </div>

//               {user.senderName && (
//                 <span className="senderName">{user.senderName}:</span>
//               )}
//             </div>
//           </div>
//         );
//       })}
//     </div>
//   );
// };

// export default ChatList;
