import React, { useEffect, useState } from 'react';
import './NetworkPage.css';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import {jwtDecode} from 'jwt-decode';

const Network = () => {
  const navigate = useNavigate();
  const [suggested, setSuggested] = useState([]);

  useEffect(() => {
    // Step 1: Get token
    const token = localStorage.getItem("token");

    // Step 2: Redirect if token missing
    if (!token) {
      alert("You need to login first");
      navigate("/");
      return;
    }

    // Step 3: Decode token
    let decoded;
    try {
      decoded = jwtDecode(token);
    } catch (err) {
      console.error("Invalid token");
      navigate("/");
      return;
    }

    // Step 4: Fetch suggestions from backend
    const fetchSuggestions = async () => {
      try {
        const res = await axios.get("http://localhost:5000/ReachNex/suggestions", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        // Add UI field `requested: false` initially
        const formatted = res.data.map((user) => ({
          ...user,
          requested: false,
        }));

        setSuggested(formatted);
      } catch (err) {
        console.log("Error fetching suggestions:", err);
      }
    };

    fetchSuggestions();
  }, [navigate]);

  // Send connection request
  const handleConnect = async (receiverId) => {
    const token = localStorage.getItem("token");

    try {
      await axios.post(
        "http://localhost:5000/ReachNex/network/send",
        { receiverId },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      // Mark user as "requested" in UI
      setSuggested((prev) =>
        prev.map((user) =>
          user._id === receiverId ? { ...user, requested: true } : user
        )
      );
    } catch (err) {
      console.error("Error sending connection request:", err);
    }
  };

  return (
    <div className="network-layout">
      <aside className="network-sidebar">
        <h3>Manage my network</h3>
        <ul>
          <li>Connections</li>
          <li>Contacts</li>
          <li>Following & Followers</li>
          <li>Groups</li>
          <li>Events</li>
          <li>Pages</li>
        </ul>
      </aside>

      <main className="network-main">
        <h2>People you may know</h2>
        <div className="suggestion-grid">
          {suggested.length === 0 ? (
            <p>No suggestions available</p>
          ) : (
            suggested.map((person) => (
              <div key={person._id} className="suggestion-card">
                <img src={person.avatar} alt={person.name} />
                <h4>{person.fullName}</h4>
                {/* <p>{person.profession || "No title yet"}</p> */}
                <span>{person.email}</span>
                <br />
                <button
                  onClick={() => handleConnect(person._id)}
                  disabled={person.requested}
                >
                  {person.requested ? "Requested" : "Connect"}
                </button>
              </div>
            ))
          )}
        </div>
      </main>
    </div>
  );
};

export default Network;
