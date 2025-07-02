import React from 'react';
import defaultAvatar from './default-avatar.png'; // or use online placeholder

const Invitations = () => {
  const invites = [
    {
      id: 1,
      name: "Ali Khan",
      mutuals: "3 mutual connections",
      avatar: defaultAvatar
    },
    {
      id: 2,
      name: "Sara Ali",
      mutuals: "1 mutual connection",
      avatar: defaultAvatar
    },
  ];

  return (
    <div className="section">
      <h3>Invitations</h3>
      {invites.map((invite) => (
        <div key={invite.id} className="profile-card">
          <div className="profile-info">
            <img src={invite.avatar} alt={invite.name} className="profile-avatar" />
            <div className="profile-text">
              <strong>{invite.name}</strong>
              <span>{invite.mutuals}</span>
            </div>
          </div>
          <div className="profile-actions">
            <button className="btn-primary">Accept</button>
            <button className="btn-secondary">Ignore</button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Invitations;
