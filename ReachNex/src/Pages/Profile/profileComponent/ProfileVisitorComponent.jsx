import React, { useEffect, useState } from "react";
import "./ProfileComponent.css";
import { useParams, useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import axios from "axios";

export default function ProfileVisitorComponent() {
  const { id } = useParams();
  const [perUser, setPerUser] = useState(null);
  const [connectionCount, setConnectionCount] = useState(0);
  const navigate  =useNavigate()
  // ✅ Fetch user details
  const fetchUser = async () => {
    try {
      const res = await axios.get(`http://localhost:5000/ReachNex/getuser/${id}`);
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

  useEffect(() => {
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
            <img src={perUser.profilePicture} alt="Profile" className="profile-img" />
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
        <p className="connection" onClick={() => {
                    const token = localStorage.getItem("token");
                    if (token) {
                      const decoded = jwtDecode(token);
                      const userId = decoded.id;
                      navigate(`/connections/${userId}`);
                    }
                  }}>
          Connections ({connectionCount})</p>
      </div>
    </div>
  );
}
