import React, { useEffect, useState, useContext } from "react";
import "./ProfileComponent.css";
import { useParams, useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import axios from "axios";
import AuthenticationContext from "../../../components/Contexts/AuthenticationContext/AuthenticationContext";

const ProfileVisitorComponent = () => {
  const { id } = useParams();
  const [perUser, setPerUser] = useState(null);
  const [connectionCount, setConnectionCount] = useState(0);
  const navigate = useNavigate();
  const { user } = useContext(AuthenticationContext);
  const [isRequested, setIsRequested] = useState(false);
  const [isConnected, setIsConnected] = useState(false);
  const [connectionStatus, setConnectionStatus] = useState("none"); // 'none', 'pending', 'connected'

  // ✅ Fetch user details
  const fetchUser = async () => {
    try {
      const res = await axios.get(
        `http://localhost:5000/ReachNex/getuser/${id}`
      );
      setPerUser(res.data.user);
    } catch (err) {
      console.error("Error loading user:", err);
    }
  };

  // ✅ Fetch connection count like ProfileComponent.jsx
  const fetchConnectionCount = async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await axios.get(
        `http://localhost:5000/ReachNex/user/connections/${id}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setConnectionCount(res.data.count);
    } catch (err) {
      console.error("Failed to fetch connection count:", err);
    }
  };

  // Add this function to check connection status
  useEffect(() => {
    const checkConnectionStatus = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await axios.get(
          `http://localhost:5000/ReachNex/checkconnection/${id}`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        // Update connection status based on response
        if (res.data.isConnected) {
          setConnectionStatus("connected");
        } else if (res.data.isRequested) {
          setConnectionStatus("pending");
        } else {
          setConnectionStatus("none");
        }
      } catch (err) {
        console.error("Error checking connection status:", err);
      }
    };

    if (id) {
      checkConnectionStatus();
    }
  }, [id]);

  // Handle connect button click
  const handleConnect = async () => {
    if (connectionStatus !== "none") return;

    try {
      const token = localStorage.getItem("token");
      await axios.post(
        "http://localhost:5000/ReachNex/send",
        { receiverId: id },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setConnectionStatus("pending");
      alert("Connection request sent ✅");
    } catch (err) {
      console.error("Error sending connection request:", err);
    }
  };

  const renderConnectionButton = () => {
    if (user?._id === id) return null; // Don't show button on own profile

    switch (connectionStatus) {
      case "connected":
        return (
          <div className="connection-actions">
            <button className="connect-btn connected" disabled>
              ✓ Connected
            </button>
            <button
              className="message-btn"
              onClick={() => navigate("/messaging")}
            >
              Message
            </button>
          </div>
        );
      case "pending":
        return (
          <button className="connect-btn requested" disabled>
            Pending
          </button>
        );
      default:
        return (
          <button className="connect-btn" onClick={handleConnect}>
            Connect
          </button>
        );
    }
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      alert("You need to login first");
      navigate("/login"); // Update path
      return;
    }

    if (id) {
      fetchUser();
      fetchConnectionCount();
    }
  }, [id]);

  return (
    <div className="profile-container">
      <div className="banner">
        {perUser?.bannerImage ? (
          <img src={perUser.bannerImage} alt="Banner" className="banner-img" />
        ) : (
          <div className="banner-placeholder" />
        )}

        <div className="profile-pic-wrapper">
          {perUser?.profilePicture ? (
            <img
              src={perUser.profilePicture}
              alt="Profile"
              className="profile-img"
            />
          ) : (
            <div className="profile-img placeholder">
              <img
                className="simpleImg"
                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRX-cskA2FbOzFi7ACNiGruheINgAXEqFL1TQ&s"
                alt="Default"
              />
            </div>
          )}
        </div>
      </div>

      <div className="details">
        <div className="name-row">
          <h2>{perUser?.fullName}</h2>
        </div>
        <p>{perUser?.profession}</p>
        <p>{perUser?.location}</p>
        <div className="connection-row">
          <p className="connection">Connections ({connectionCount})</p>
          {renderConnectionButton()}
        </div>
      </div>
    </div>
  );
};

export default ProfileVisitorComponent;
