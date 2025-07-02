import React from 'react';
import defaultAvatar from './default-avatar.png';

const Connections = () => {
  const connections = [
    { id: 1, name: "Hamza Yousuf", role: "Software Engineer", avatar: defaultAvatar },
    { id: 2, name: "Maria Khan", role: "Product Manager", avatar: defaultAvatar },
  ];

  return (
    <div className="section">
      <h3>Your Connections</h3>
      {connections.map((conn) => (
        <div key={conn.id} className="profile-card">
          <div className="profile-info">
            <img src={conn.avatar} alt={conn.name} className="profile-avatar" />
            <div className="profile-text">
              <strong>{conn.name}</strong>
              <span>{conn.role}</span>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Connections;
