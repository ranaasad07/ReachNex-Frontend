import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ConnectionButton = ({ userId, token, onUpdate }) => {
  /*
  States:
  - noRequest: not connected, no pending requests (button: Connect)
  - requestSent: you sent request (button: Pending, disabled)
  - requestReceived: user sent request to you (buttons: Accept, Reject)
  - connected: already connected (button: Connected, can remove)
  */

  const [status, setStatus] = useState('loading'); // loading | noRequest | requestSent | requestReceived | connected

  useEffect(() => {
    // Fetch connection status between current user and userId
    const fetchStatus = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/ReachNex/connection-status/${userId}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setStatus(res.data.status); // expect backend returns status string
      } catch (err) {
        console.error(err);
        setStatus('noRequest');
      }
    };
    fetchStatus();
  }, [userId, token]);

  const sendRequest = async () => {
    try {
      await axios.post('http://localhost:5000/ReachNex/connect', { receiverId: userId }, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setStatus('requestSent');
      onUpdate?.();
    } catch (err) {
      console.error(err);
      alert('Failed to send request');
    }
  };

  const acceptRequest = async () => {
    try {
      await axios.post('http://localhost:5000/ReachNex/accept', { senderId: userId }, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setStatus('connected');
      onUpdate?.();
    } catch (err) {
      console.error(err);
      alert('Failed to accept request');
    }
  };

  const rejectRequest = async () => {
    try {
      await axios.post('http://localhost:5000/ReachNex/reject', { senderId: userId }, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setStatus('noRequest');
      onUpdate?.();
    } catch (err) {
      console.error(err);
      alert('Failed to reject request');
    }
  };

  const removeConnection = async () => {
    try {
      await axios.post('http://localhost:5000/ReachNex/remove-connection', { receiverId: userId }, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setStatus('noRequest');
      onUpdate?.();
    } catch (err) {
      console.error(err);
      alert('Failed to remove connection');
    }
  };

  if (status === 'loading') {
    return <button disabled>Loading...</button>;
  }

  switch (status) {
    case 'noRequest':
      return <button onClick={sendRequest} className="btn connect-btn">Connect</button>;

    case 'requestSent':
      return <button disabled className="btn pending-btn">Pending</button>;

    case 'requestReceived':
      return (
        <>
          <button onClick={acceptRequest} className="btn accept-btn">Accept</button>
          <button onClick={rejectRequest} className="btn reject-btn">Reject</button>
        </>
      );

    case 'connected':
      return (
        <>
          <button disabled className="btn connected-btn">Connected</button>
          <button onClick={removeConnection} className="btn remove-btn">Remove</button>
        </>
      );

    default:
      return <button disabled>Error</button>;
  }
};

export default ConnectionButton;
