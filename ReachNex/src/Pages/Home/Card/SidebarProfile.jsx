import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import AuthenticationContext from "../../../components/Contexts/AuthenticationContext/AuthenticationContext";
import style from "./SidebarProfile.module.css";
import axios from "axios";
import socket from "../../../socket";
import { jwtDecode } from "jwt-decode";

const SidebarProfile = () => {
  const { user } = useContext(AuthenticationContext);
  const navigate = useNavigate();
  const [connectionCount, setConnectionCount] = useState(0);

  const fetchConnectionCount = async () => {
    try {
      const token = localStorage.getItem("token");
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

  useEffect(() => {
    if (!user?._id) return;

    // Initial fetch
    fetchConnectionCount();

    // Listen for ANY connection updates
    socket.on("connectionUpdated", () => {
      console.log("Connection update received");
      fetchConnectionCount();
    });

    // Listen for connection accepts
    socket.on("connectionAccepted", () => {
      console.log("Connection accepted");
      fetchConnectionCount();
    });

    // Listen for new connection requests
    socket.on("newConnection", () => {
      console.log("New connection");
      fetchConnectionCount();
    });

    return () => {
      socket.off("connectionUpdated");
      socket.off("connectionAccepted");
      socket.off("newConnection");
    };
  }, [user?._id]);

  const goToExperience = () => {
    navigate(`/profile/${user._id}#experience`);
  };
  const goToProfile = () => {
    navigate("/profile/me");
  };
  return (
    <div className={style.mainContainer}>
      <div className={style.card}>
        <div className={style.backgroundimage}>
          <img
            src="https://media.istockphoto.com/id/1317584985/photo/social-media-and-network.jpg?s=612x612&w=0&k=20&c=0d74KNiIifGvT10QDYvvsAchywxec4Xqk10-U_oe5IY="
            alt="Background"
          />
        </div>
        <img
          onClick={goToProfile}
          className={style.profilePic}
          src={
            user?.profilePicture
              ? user.profilePicture
              : "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRX-cskA2FbOzFi7ACNiGruheINgAXEqFL1TQ&s"
          }
          alt="Profile"
        />
        <h3>{user?.fullName}</h3>
        <p>{user?.email}</p>
        <button className={style.button} onClick={goToExperience}>
          Experience
        </button>
      </div>

      <div className={style.conectionCard}>
        <div className={style.connection}>
          <h3
            onClick={() => {
              const token = localStorage.getItem("token");
              if (token) {
                const decoded = jwtDecode(token);
                const userId = decoded.id;
                navigate(`/connections/${userId}`);
              }
            }}
          >
            Connections
          </h3>
          <p
            onClick={() => {
              const token = localStorage.getItem("token");
              if (token) {
                const decoded = jwtDecode(token);
                const userId = decoded.id;
                navigate(`/connections/${userId}`);
              }
            }}
          >
            {" "}
            ({connectionCount})
          </p>
        </div>
        <div>
          <p>Grow your network</p>
        </div>
      </div>
    </div>
  );
};

export default SidebarProfile;
