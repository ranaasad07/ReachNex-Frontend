import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './PendingRequests.css';
import io from 'socket.io-client';

const socket = io("http://localhost:5000");

const PendingRequests = ({ onConnectionChange, refreshSuggestions }) => {
  const [pending, setPending] = useState([]);
  const token = localStorage.getItem("token");

  const fetchPending = async () => {
    try {
      const res = await axios.get("http://localhost:5000/ReachNex/pending", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setPending(res.data);
    } catch (err) {
      console.error("Error fetching pending requests", err);
    }
  };

  const acceptRequest = async (requestId) => {
    try {
      await axios.post(
        "http://localhost:5000/ReachNex/accept",
          { requestId },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      fetchPending();
      refreshSuggestions();
      onConnectionChange();
    } catch (err) {
      console.error("Error accepting request", err);
    }
  };

  const rejectRequest = async (senderId) => {
    try {
      await axios.post(
        "http://localhost:5000/ReachNex/reject",
        { senderId },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      fetchPending();
      refreshSuggestions();
      onConnectionChange();
    } catch (err) {
      console.error("Error rejecting request", err);
    }
  };

  useEffect(() => {
    fetchPending();

    // Real-time listener (no online detection needed)
    socket.on("new_request", ({ receiverId }) => {
      const myId = JSON.parse(atob(token.split(".")[1])).id;
      if (receiverId === myId) {
        fetchPending();
      }
    });

    return () => {
      socket.off("new_request");
    };
  }, []);

  return (
    <div className="pending-section">
      <h3>Pending Requests</h3>
      {pending.length === 0 ? (
        <p>No pending requests</p>
      ) : (
        pending.map((req) => (
          <div key={req._id} className="pending-card">
           <img
  src={
    req.sender.profilePicture
      ? req.sender.profilePicture
      : `https://ui-avatars.com/api/?name=${encodeURIComponent(req.sender.fullName)}`
  }
  alt={req.sender.fullName}
/>

            <div className="pending-info">
              <h4>{req.sender.fullName}</h4>
              <p>{req.sender.email}</p>
              <div className="pending-actions">
                <button className="accept-btn" onClick={() => acceptRequest(req._id)}>

                  Accept
                </button>
                <button className="reject-btn" onClick={() => rejectRequest(req.sender._id)}>
                  Reject
                </button>
              </div>
            </div>
          </div>    
        ))
      )}
    </div>
  );
};

export default PendingRequests;
