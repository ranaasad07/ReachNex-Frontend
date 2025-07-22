// // import React from 'react';

// // const UserCard = ({ user, actionButtons }) => (
// //   <div className="user-card">
// //     <img
// //       src={user.profilePic || 'https://www.w3schools.com/howto/img_avatar.png'}
// //       alt={user.fullname}
// //     />
// //     <h4>{user.fullname}</h4>
// //     <p>{user.title || 'No Title'}</p>
// //     <span>{user.mutuals || user.email}</span>
// //     <div className="actions">
// //       {actionButtons.map((btn, idx) => (
// //         <button key={idx} onClick={btn.onClick} disabled={btn.disabled}>
// //           {btn.label}
// //         </button>
// //       ))}
// //     </div>
// //   </div>
// // );

// // export default UserCard;


// import React from 'react';
// // import defaultAvatar from '../../assets/default-avatar.png';

// const UserCard = ({ user, actions = [] }) => (
//   <div className="user-card">
//     <div className="user-info">
//       <img
//         src={user.profilePic || defaultAvatar }
//         alt={user.fullname}
//         className="user-avatar"
//       />
//       <div className="user-details">
//         <h4>{user.fullname}</h4>
//         <p>{user.title || user.email}</p>
//       </div>
//     </div>
//     <div className="user-actions">
//       {actions.map((action, i) => (
//         <button
//           key={i}
//           className={`btn ${action.className || ''}`}
//           onClick={action.onClick}
//         >
//           {action.label}
//         </button>
//       ))}
//     </div>
//   </div>
// );

// export default UserCard;

import ConnectionButton from "./ConnectionButton ";

const UserCard = ({ user, token }) => (
  <div className="user-card">
    <img src={user.profilePic || 'default-avatar.png'} alt={user.fullname} className="avatar" />
    <div className="user-info">
      <h4>{user.fullname}</h4>
      <p>{user.title || user.email}</p>
    </div>
    <ConnectionButton userId={user._id} token={token} onUpdate={() => { /* refresh lists if needed */ }} />
  </div>
);

export default UserCard;