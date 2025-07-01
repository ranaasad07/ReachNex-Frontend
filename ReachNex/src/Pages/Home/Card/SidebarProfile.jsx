import React from "react";
import { useContext } from "react";
import AuthenticationContext from "../../../components/Contexts/AuthenticationContext/AuthenticationContext";
import style from "./SidebarProfile.module.css";

const SidebarProfile = () => {
  const { user } = useContext(AuthenticationContext);
  console.log("------------------------------", user);
  // if (!user) return <p>Loading user...</p>;
  return (
    <div className={style.mainContainer}>
      <div className={style.card}>
        <div className={style.backgroundimage}>
          <img
            src="https://media.istockphoto.com/id/1317584985/photo/social-media-and-network.jpg?s=612x612&w=0&k=20&c=0d74KNiIifGvT10QDYvvsAchywxec4Xqk10-U_oe5IY=
"
            alt=""
          />
        </div>
        <img
          className={style.profilePic}
          src={
            user?.profilePicture
              ? user.profilePicture
              : "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRX-cskA2FbOzFi7ACNiGruheINgAXEqFL1TQ&s"
          }
          alt="Profile image"
        />
        <h3>{user?.fullName}</h3>
        <p>{user?.email}</p>
        <button className={style.button}>Experince</button>
      </div>
      {/* connections */}
      <div className={style.conectionCard}>
        <div className={style.connection}>
          <h3>Connections</h3>
          <p>45</p>
        </div>
        <div>
          <p>Grow your netwrok</p>
        </div>
      </div>
    </div>
  );
};

export default SidebarProfile;
