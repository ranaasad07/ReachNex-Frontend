import React, { useState, useEffect } from "react";
import "./Skill.css";
import { useParams } from "react-router-dom";
import axios from "axios";

const ProfileVisitorSkill = () => {
  const [skills, setSkills] = useState([]);
  const { id } = useParams(); // profile owner's userId

  useEffect(() => {
    const fetchSkills = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/ReachNex/skills/${id}`);
        if (Array.isArray(res.data.skills)) {
          setSkills(res.data.skills);
        }
      } catch (err) {
        console.error("Error fetching visitor skills:", err);
      }
    };

    if (id) {
      fetchSkills();
    }
  }, [id]);

  return (
    <div className="skills-container">
      <div className="skills-header">
        <h3>Skills</h3>
      </div>

      <div className="skills-display">
        {skills.length > 0 ? (
          skills.map((skill, index) => (
            <div className="skill-pill" key={index}>
              {skill}
            </div>
          ))
        ) : (
          <p style={{ marginTop: 10 }}>No skills added.</p>
        )}
      </div>
    </div>
  );
};

export default ProfileVisitorSkill;
