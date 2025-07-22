import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import AuthenticationContext from "../../../components/Contexts/AuthenticationContext/AuthenticationContext";
import style from "./SidebarProfile.module.css";
import axios from "axios";
import io from "socket.io-client";

const socket = io("http://localhost:5000");

const SidebarProfile = () => {
  const { user } = useContext(AuthenticationContext);
  const navigate = useNavigate();
  const [connectionCount, setConnectionCount] = useState(0);

  const fetchConnectionCount = async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await axios.get("http://localhost:5000/ReachNex/user/connections", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setConnectionCount(res.data.count);
    } catch (err) {
      console.error("Failed to fetch connection count:", err);
    }
  };

  useEffect(() => {
    if (!user?._id) return;

    socket.emit("join", user._id); // Join own room
    fetchConnectionCount();

    socket.on("connectionAccepted", () => {
      fetchConnectionCount();
    });

    return () => {
      socket.off("connectionAccepted");
    };
  }, [user?._id]);

  const goToExperience = () => {
    navigate(`/profile/${user._id}#experience`);
  };
  const goToProfile = () =>{
    navigate(`/profile/${user.username}`)
  }
  return (
    <div className={style.mainContainer}>
      <div className={style.card}>
        <div className={style.backgroundimage}>
          <img 
            src="https://media.istockphoto.com/id/1317584985/photo/social-media-and-network.jpg?s=612x612&w=0&k=20&c=0d74KNiIifGvT10QDYvvsAchywxec4Xqk10-U_oe5IY="
            alt="Background"
          />
        </div>
        <img onClick={goToProfile}
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
          <h3>Connections</h3>
          <p>{connectionCount}</p>
        </div>
        <div>
          <p>Grow your network</p>
        </div>
      </div>
    </div>
  );
};

export default SidebarProfile;
