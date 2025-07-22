// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import UserCard from '../common/UserCard';

// const Suggestions = ({ token }) => {
//   const [users, setUsers] = useState([]);

//   useEffect(() => {
//     axios
//       .get('http://localhost:5000/ReachNex/all-users', {
//         headers: { Authorization: `Bearer ${token}` },
//       })
//       .then(({ data }) => setUsers(data.users || []))
//       .catch(console.error);
//   }, [token]);

//   const handleConnect = (receiverId) =>
//     axios
//       .post(
//         'http://localhost:5000/ReachNex/connect',
//         { receiverId },
//         { headers: { Authorization: `Bearer ${token}` } }
//       )
//       .then(() => alert('Request Sent'))
//       .catch(() => alert('Error'));

//   return (
//     <div>
//       <h3>People You May Know</h3>
//       <div className="grid">
//         {users.map((u) => (
//           <UserCard
//             key={u._id}
//             user={u}
//             actionButtons={[{ label: 'Connect', onClick: () => handleConnect(u._id) }]}
//           />
//         ))}
//       </div>
//     </div>
//   );
// };

// export default Suggestions;

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import UserCard from './UserCard';

const Suggestions = ({ token }) => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    axios
      .get('http://localhost:5000/ReachNex/all-users', {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => setUsers(res.data.users || []))
      .catch(console.error);
  }, [token]);

  const handleConnect = async (receiverId) => {
    try {
      await axios.post(
        'http://localhost:5000/ReachNex/connect',
        { receiverId },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setUsers(users.filter((u) => u._id !== receiverId));
    } catch (err) {
      console.error(err);
      alert('Failed to send request');
    }
  };

  return (
    <div className="section" id="suggestions">
      <h3>People You May Know</h3>
      {users.length === 0 ? (
        <p>No suggestions available</p>
      ) : (
        users.map((user) => (
          <UserCard
            key={user._id}
            user={user}
            actions={[
              {
                label: 'Connect',
                onClick: () => handleConnect(user._id),
                className: 'connect-btn',
              },
            ]}
          />
        ))
      )}
    </div>
  );
};

export default Suggestions;
