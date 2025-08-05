import React from "react";
import { useParams } from "react-router-dom";
import ProfileVisitorComponent from "./profileComponent/ProfileVisitorComponent";
import ProfileVisitorSkill from "./Skill/ProfileVisitorSkill";
import Experience2 from "./Experience/Experience2";

const ProfileVisitor = () => {
  const { id } = useParams(); // ✅ Get userId from URL

  return (
    <div>
      <ProfileVisitorComponent userId={id} />
      <ProfileVisitorSkill userId={id} />
      <Experience2 userId={id} />
    </div>
  );
};

export default ProfileVisitor;
