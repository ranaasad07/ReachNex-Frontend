import React, { useEffect, useState } from "react";
import "./NetworkPage.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import PendingRequests from "./networkComponent/PendingRequest";
import io from "socket.io-client";

const socket = io("http://localhost:5000");

const Network = () => {
  const navigate = useNavigate();
  const [suggested, setSuggested] = useState([]);
  const [connectionCount, setConnectionCount] = useState(0);
  const token = localStorage.getItem("token");

  const fetchConnectionCount = async () => {
    try {
      const res = await axios.get(
        "http://localhost:5000/ReachNex/user/connections",
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setConnectionCount(res.data.count);
    } catch (err) {
      console.error("Failed to fetch connection count:", err);
    }
  };

  const fetchSuggestions = async () => {
    try {
      const res = await axios.get(
        "http://localhost:5000/ReachNex/suggestions",
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setSuggested(res.data.map((user) => ({ ...user, requested: false })));
    } catch (err) {
      console.error("Error fetching suggestions:", err);
    }
  };

  const handleConnect = async (receiverId) => {
    try {
      await axios.post(
        "http://localhost:5000/ReachNex/send",
        { receiverId },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      alert("Connection request sent ✅");

      // ✅ Remove user from suggestions immediately
      setSuggested((prev) => prev.filter((user) => user._id !== receiverId));

      fetchConnectionCount();
    } catch (err) {
      console.error("Error sending connection request:", err);
    }
  };

  useEffect(() => {
    if (!token) {
      alert("You need to login first");
      navigate("/");
      return;
    }

    let userId = "";
    try {
      const decoded = jwtDecode(token);
      userId = decoded.userId;
      socket.emit("join", userId); // ✅ Join your own socket room
    } catch (err) {
      console.error("Invalid token");
      navigate("/");
      return;
    }

    // ✅ Listen for real-time connection accept event
    socket.on("connectionAccepted", ({ receiverId }) => {
      if (receiverId === userId) {
        fetchConnectionCount(); // ✅ Real-time update on receiver side
      }
    });

    fetchSuggestions();
    fetchConnectionCount();

    return () => {
      socket.off("connectionAccepted");
    };
  }, []);

 const goToProfile = (user) => {
  navigate(`/profile/user/${user._id}`); // ✅ visitor route with ID
};

  return (
    <div className="network-layout">
      <aside className="network-sidebar">
        <h3>Manage my network</h3>
        <li
          onClick={() => {
            const token = localStorage.getItem("token");
            if (token) {
              const decoded = jwtDecode(token);
              const userId = decoded.id;
              navigate(`/connections/${userId}`);
            }
          }}
        >
          Connections ({connectionCount})
        </li>
      </aside>

      <main className="network-main">
        <PendingRequests
          onConnectionChange={fetchConnectionCount}
          refreshSuggestions={fetchSuggestions}
        />

        <h2>People you may know</h2>
        <div className="suggestion-grid">
          {suggested.length === 0 ? (
            <p>No suggestions available</p>
          ) : (
            suggested.map((person) => (
              <div key={person._id} className="suggestion-card">
                <img
                onClick={() => goToProfile(person)}
                  src={
                    person.profilePicture ||
                    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRX-cskA2FbOzFi7ACNiGruheINgAXEqFL1TQ&s"
                  }
                  alt={person.fullName}
                  style={{ cursor: "pointer" }}
                />

                <h4 onClick={() => goToProfile(person)}  
                >{person.fullName}</h4>
                <span>{person.email}</span>
                <br />
                <button onClick={() => handleConnect(person._id)}>
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
