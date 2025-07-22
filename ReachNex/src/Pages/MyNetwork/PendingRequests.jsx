// // import React, { useEffect, useState } from 'react';
// // import axios from 'axios';
// // import UserCard from '../common/UserCard';

// // const PendingRequests = ({ token }) => {
// //   const [requests, setRequests] = useState([]);

// //   useEffect(() => {
// //     axios
// //       .get('http://localhost:5000/ReachNex/pending-requests', {
// //         headers: { Authorization: `Bearer ${token}` },
// //       })
// //       .then(({ data }) => setRequests(data.requests || []))
// //       .catch(console.error);
// //   }, [token]);

// //   const handleAction = (receiverId, action) =>
// //     axios
// //       .post(
// //         `http://localhost:5000/ReachNex/${action}`,
// //         { receiverId },
// //         { headers: { Authorization: `Bearer ${token}` } }
// //       )
// //       .then(() => setRequests((prev) => prev.filter((r) => r._id !== receiverId)))
// //       .catch(console.error);

// //   return (
// //     <div>
// //       <h3>Pending Requests</h3>
// //       <div className="grid">
// //         {requests.map((u) => (
// //           <UserCard
// //             key={u._id}
// //             user={u}
// //             actionButtons={[
// //               { label: 'Accept', onClick: () => handleAction(u._id, 'accept') },
// //               { label: 'Reject', onClick: () => handleAction(u._id, 'reject') },
// //             ]}
// //           />
// //         ))}
// //       </div>
// //     </div>
// //   );
// // };

// // export default PendingRequests;

// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import UserCard from './UserCard';

// const PendingRequests = ({ token }) => {
//   const [requests, setRequests] = useState([]);

//   useEffect(() => {
//     axios
//       .get('http://localhost:5000/ReachNex/pending-requests', {
//         headers: { Authorization: `Bearer ${token}` },
//       })
//       .then((res) => setRequests(res.data.requests || []))
//       .catch(console.error);
//   }, [token]);

//   const handleAccept = async (receiverId) => {
//     await axios.post(
//       'http://localhost:5000/ReachNex/accept',
//       { receiverId },
//       { headers: { Authorization: `Bearer ${token}` } }
//     );
//     setRequests(requests.filter((u) => u._id !== receiverId));
//   };

//   const handleReject = async (receiverId) => {
//     await axios.post(
//       'http://localhost:5000/ReachNex/reject',
//       { receiverId },
//       { headers: { Authorization: `Bearer ${token}` } }
//     );
//     setRequests(requests.filter((u) => u._id !== receiverId));
//   };

//   return (
//     <div className="section" id="pending">
//       <h3>Pending Requests</h3>
//       {requests.length === 0 ? (
//         <p>No pending requests</p>
//       ) : (
//         requests.map((user) => (
//           <UserCard
//             key={user._id}
//             user={user}
//             actions={[
//               { label: 'Accept', onClick: () => handleAccept(user._id), className: 'accept-btn' },
//               { label: 'Reject', onClick: () => handleReject(user._id), className: 'reject-btn' },
//             ]}
//           />
//         ))
//       )}
//     </div>
//   );
// };

// export default PendingRequests;

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import UserCard from './UserCard';

const PendingRequests = ({ token }) => {
  const [requests, setRequests] = useState([]);

  useEffect(() => {
    axios
      .get('http://localhost:5000/ReachNex/pending-requests', {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => setRequests(res.data.requests || []))
      .catch(console.error);
  }, [token]);

  const handleAccept = async (receiverId) => {
    await axios.post(
      'http://localhost:5000/ReachNex/accept',
      { receiverId },
      { headers: { Authorization: `Bearer ${token}` } }
    );
    setRequests(requests.filter((u) => u._id !== receiverId));
  };

  const handleReject = async (receiverId) => {
    await axios.post(
      'http://localhost:5000/ReachNex/reject',
      { receiverId },
      { headers: { Authorization: `Bearer ${token}` } }
    );
    setRequests(requests.filter((u) => u._id !== receiverId));
  };

  return (
    <div className="section" id="pending">
      <h3>Pending Requests</h3>
      {requests.length === 0 ? (
        <p>No pending requests</p>
      ) : (
        requests.map((user) => (
          <UserCard
            key={user._id}
            user={user}
            actions={[
              { label: 'Accept', onClick: () => handleAccept(user._id), className: 'accept-btn' },
              { label: 'Reject', onClick: () => handleReject(user._id), className: 'reject-btn' },
            ]}
          />
        ))
      )}
    </div>
  );
};

export default PendingRequests;
