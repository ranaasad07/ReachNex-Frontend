import React, { useState, useEffect } from 'react';
import './Skill.css';
import axios from 'axios';
import { AiOutlineClose } from 'react-icons/ai'; // 👈 Close icon import

const AddSkills = () => {
  const [skills, setSkills] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [newSkill, setNewSkill] = useState('');
  const token = localStorage.getItem('token');

  useEffect(() => {
    const fetchSkills = async () => {
      try {
        const res = await axios.get('http://localhost:5000/ReachNex/skills', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setSkills(res.data.skills || []);
      } catch (err) {
        console.error('Error fetching skills:', err);
      }
    };

    fetchSkills();
  }, [token]);

  const handleAddSkill = async () => {
    const skill = newSkill.trim();
    if (!skill || skills.includes(skill)) return;

    try {
      const res = await axios.post(
        'http://localhost:5000/ReachNex/skills',
        { skill },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        }
      );

      if (res.data.success) {
        setSkills(res.data.skills);
        setNewSkill('');
        setShowModal(false);
      } else {
        console.error(res.data.message);
      }
    } catch (err) {
      console.error('Error adding skill:', err);
    }
  };

  const handleDeleteSkill = async (skillToDelete) => {
    try {
      const res = await axios.delete(`http://localhost:5000/ReachNex/skills`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        data: { skill: skillToDelete },
      });

      if (res.data.success) {
        setSkills(res.data.skills);
      }
    } catch (err) {
      console.error('Error deleting skill:', err);
    }
  };

  return (
    <div className="skills-container">
      <div className="skills-header">
        <h3>Skills</h3>
        <button className="edit-button" onClick={() => setShowModal(true)}>✏️</button>
      </div>

      <div className="skills-display">
        {skills.map((skill, index) => (
          <div className="skill-pill" key={index}>
            {skill}
          </div>
        ))}
      </div>

      {showModal && (
        <div className="modal-overlay">
          <div className="modal-box">
            <h4>Add Skill</h4>

            <input
              type="text"
              placeholder="e.g. JavaScript"
              value={newSkill}
              onChange={(e) => setNewSkill(e.target.value)}
              className="modal-input"
            />

            <div className="modal-skill-list">
              {skills.map((skill, index) => (
                <div className="skill-chip-edit" key={index}>
                  {skill}
                  <button
                    className="delete-icon-btn"
                    onClick={() => handleDeleteSkill(skill)}
                    title="Delete Skill"
                  >
                    <AiOutlineClose />
                  </button>
                </div>
              ))}
            </div>

            <div className="modal-actions">
              <button onClick={handleAddSkill} className="save-skill-btn">Add</button>
              <button onClick={() => setShowModal(false)} className="done-skill-btn">Done</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AddSkills;
