// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import UserCard from '../common/UserCard';

// const ConnectionsList = ({ token }) => {
//   const [list, setList] = useState([]);

//   useEffect(() => {
//     axios
//       .get('http://localhost:5000/ReachNex/connections', {
//         headers: { Authorization: `Bearer ${token}` },
//       })
//       .then(({ data }) => setList(data.connections || []))
//       .catch(console.error);
//   }, [token]);

//   const handleRemove = (receiverId) =>
//     axios
//       .post(
//         'http://localhost:5000/ReachNex/remove-connection',
//         { receiverId },
//         { headers: { Authorization: `Bearer ${token}` } }
//       )
//       .then(() => setList((prev) => prev.filter((u) => u._id !== receiverId)))
//       .catch(console.error);

//   return (
//     <div>
//       <h3>Your Connections</h3>
//       <div className="grid">
//         {list.map((u) => (
//           <UserCard
//             key={u._id}
//             user={u}
//             actionButtons={[{ label: 'Remove', onClick: () => handleRemove(u._id) }]}
//           />
//         ))}
//       </div>
//     </div>
//   );
// };

// export default ConnectionsList;

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import UserCard from './UserCard';

const ConnectionsList = ({ token }) => {
  const [connections, setConnections] = useState([]);

  useEffect(() => {
    axios
      .get('http://localhost:5000/ReachNex/connections', {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => setConnections(res.data.connections || []))
      .catch(console.error);
  }, [token]);

  const handleRemove = async (receiverId) => {
    await axios.post(
      'http://localhost:5000/ReachNex/remove-connection',
      { receiverId },
      { headers: { Authorization: `Bearer ${token}` } }
    );
    setConnections(connections.filter((u) => u._id !== receiverId));
  };

  return (
    <div className="section" id="connections">
      <h3>Your Connections</h3>
      {connections.length === 0 ? (
        <p>You have no connections yet.</p>
      ) : (
        connections.map((user) => (
          <UserCard
            key={user._id}
            user={user}
            actions={[
              { label: 'Remove', onClick: () => handleRemove(user._id), className: 'remove-btn' },
            ]}
          />
        ))
      )}
    </div>
  );
};

export default ConnectionsList;
