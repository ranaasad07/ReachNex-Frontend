
import React from "react";
import ProfileComponent from "./profileComponent/profileComponent";
import AddSkill from "./Skill/AddSkill";
import AddExperience from "./Experience/AddExperience ";


const Profile = () => {
  return (
    <div>

      <ProfileComponent />
      <AddSkill/>
      <div id="experience">
      <AddExperience/>
    </div>

    </div>
  );
};

export default Profile;
