import React from "react";
import style from "./Profile.module.css";
import Card from "./Card";

const Profile = () => {
  return (
    <Card padding={0}>
      <div className={style.profileWrapper}>
        {/* Banner Image */}
        <div className={style.profileImageContainer}>
          <img
            src="https://images.pexels.com/photos/573130/pexels-photo-573130.jpeg"
            alt="Background"
            className={style.profileBgImage}
          />
        </div>

        {/* User Image */}
        <div className={style.profileUserImage}>
          <img
            src="https://randomuser.me/api/portraits/men/75.jpg"
            alt="User"
            className={style.userImage}
          />
        </div>

        {/* User Data */}
        <div className={style.userData}>
          <div className={style.name}>Aiden</div>
          <div className={style.tagline}>@Software Engineer</div>
          <div className={style.address}>Japan</div>
          <div className={style.company}>SeeBiz</div>
        </div>
      </div>
    </Card>
  );
};

export default Profile;
