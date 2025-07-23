import React from "react";
import ProfileVisitorComponent from "./profileComponent/ProfileVisitorComponent";
import ProfileVisitorSkill from "./Skill/ProfileVisitorSkill";
import Experience2 from "./Experience/Experience2";

const ProfileVisitor = () => {
  return (
    <div>
      <ProfileVisitorComponent />
      <ProfileVisitorSkill/>
      <Experience2/>
    </div>
  );
};

export default ProfileVisitor;