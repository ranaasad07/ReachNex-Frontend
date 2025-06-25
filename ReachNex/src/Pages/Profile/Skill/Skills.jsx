import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { FaPen } from 'react-icons/fa';
import './Skill.css';

const AddSkills = () => {
  const [skills, setSkills] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [newSkill, setNewSkill] = useState('');
  const [editingIndex, setEditingIndex] = useState(null);
  const [editedSkill, setEditedSkill] = useState('');

  const token = localStorage.getItem('token');

  const axiosInstance = axios.create({
    baseURL: 'http://localhost:5000/ReachNex', 
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  // Load skills on mount
  useEffect(() => {
    const fetchSkills = async () => {
      try {
        const res = await axiosInstance.get('/getSkill');
        setSkills(res.data.skills); // backend should return { skills: [...] }
      } catch (err) {
        console.error('Error fetching skills:', err);
      }
    };
    fetchSkills();
  }, []);

  // Add skill
  const handleAddSkill = async () => {
    const skill = newSkill.trim();
    if (!skill || skills.includes(skill)) return;

    try {
      const res = await axiosInstance.post('/addSkill', { skill });
      setSkills(res.data.skills);
      setNewSkill('');
    } catch (err) {
      console.error('Error adding skill:', err);
    }
  };

  // Delete skill
  const handleRemoveSkill = async (skillToRemove) => {
    try {
      const res = await axiosInstance.delete('/deleteSkill', {
        data: { skill: skillToRemove },
      });
      setSkills(res.data.skills);
    } catch (err) {
      console.error('Error deleting skill:', err);
    }
  };

  // Start editing
  const handleEdit = (index) => {
    setEditingIndex(index);
    setEditedSkill(skills[index]);
  };

  // Save edited skill
  const handleSaveEdit = async (index) => {
    const oldSkill = skills[index];
    const trimmed = editedSkill.trim();
    if (!trimmed || skills.includes(trimmed)) return;

    try {
      const res = await axiosInstance.put('/updateSkill', {
        oldSkill,
        newSkill: trimmed,
      });
      setSkills(res.data.skills);
      setEditingIndex(null);
      setEditedSkill('');
    } catch (err) {
      console.error('Error updating skill:', err);
    }
  };

  return (
    <div className="skills-container">
      <div className="skills-header">
        <h3>Skills</h3>
        <button className="edit-button" onClick={() => setShowModal(true)}>
          <FaPen size={14} />
        </button>
      </div>

      <div className="skills-display">
        {skills.map((skill, index) => (
          <div className="skill-pill" key={index}>{skill}</div>
        ))}
      </div>

      {showModal && (
        <div className="modal-overlay">
          <div className="modal-box">
            <h4>Add or Edit Skills</h4>

            <input
              type="text"
              placeholder="e.g. JavaScript"
              value={newSkill}
              onChange={(e) => setNewSkill(e.target.value)}
              className="modal-input"
            />
            <button onClick={handleAddSkill} className="save-skill-btn">Add</button>

            <div className="modal-skill-list">
              {skills.map((skill, index) => (
                <div className="skill-chip-edit" key={index}>
                  {editingIndex === index ? (
                    <>
                      <input
                        type="text"
                        value={editedSkill}
                        onChange={(e) => setEditedSkill(e.target.value)}
                        className="edit-skill-input"
                      />
                      <button onClick={() => handleSaveEdit(index)}>Save</button>
                    </>
                  ) : (
                    <>
                      {skill}
                      <span onClick={() => handleRemoveSkill(skill)}>&times;</span>
                      <span onClick={() => handleEdit(index)} className="edit-icon">✎</span>
                    </>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AddSkills;
