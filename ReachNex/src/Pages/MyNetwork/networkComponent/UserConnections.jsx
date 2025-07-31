import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import "./UserConnections.css";

const UserConnections = () => {
  const { userId } = useParams();
  const navigate = useNavigate();
  const [connections, setConnections] = useState([]);
  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchConnections = async () => {
      try {
        let actualUserId = userId;

        if (userId === "me") {
          const decoded = jwtDecode(token);
          actualUserId = decoded.id;
        }

        const res = await axios.get(
          `http://localhost:5000/ReachNex/connections/${actualUserId}`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );

        setConnections(res.data.connections);
      } catch (err) {
        console.error("Failed to fetch connections", err);
      }
    };

    fetchConnections();
  }, [userId, token]);
  const goToVisitorProfile = (userId) => {
  navigate(`/profile/user/${userId}`);
};


  return (
    <div className="connections-page">
      <h2>Your Connections</h2>
      {connections.length === 0 ? (
        <p className="no-connection-text">You have no connections yet.</p>
      ) : (
        <div className="connections-grid">
          {connections.map((conn) => (
            <div key={conn._id} className="connection-card">
              <img
              onClick={() => goToVisitorProfile(conn._id)}
                src={conn.profilePicture ||"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRX-cskA2FbOzFi7ACNiGruheINgAXEqFL1TQ&s"}
                alt={conn.fullName}
                className="connection-avatar"
                style={{ cursor: "pointer" }}
              />
              <div className="connection-info">
                <h4 onClick={() => goToVisitorProfile(conn._id)}
                  style={{ cursor: "pointer" }}
                  >{conn.fullName}</h4>
                {/* <p>{conn.email}</p> */}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default UserConnections;
