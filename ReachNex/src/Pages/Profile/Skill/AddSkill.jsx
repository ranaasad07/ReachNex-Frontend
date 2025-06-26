import React, { useState, useEffect } from 'react';
import './Skill.css';
import axios from 'axios';
import { AiOutlineClose, AiOutlinePlus, AiFillDelete } from 'react-icons/ai';
import { FaPen } from 'react-icons/fa';

const AddSkills = () => {
  const [skills, setSkills] = useState([]);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showManagePanel, setShowManagePanel] = useState(false);
  const [newSkill, setNewSkill] = useState('');
  const [editSkill, setEditSkill] = useState('');
  const [editingIndex, setEditingIndex] = useState(null);
  const token = localStorage.getItem('token');

  useEffect(() => {
    const fetchSkills = async () => {
      try {
        const res = await axios.get('http://localhost:5000/ReachNex/skills', {
          headers: { Authorization: `Bearer ${token}` },
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
        setShowAddModal(false);
      }
    } catch (err) {
      console.error('Error adding skill:', err);
    }
  };

  const handleEditSkill = async () => {
    const skill = editSkill.trim();
    if (!skill || skills.includes(skill)) return;

    try {
      const res = await axios.put(
  `http://localhost:5000/ReachNex/skills/${editingIndex}`,
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
        setEditSkill('');
        setEditingIndex(null);
      }
    } catch (err) {
      console.error('Error editing skill:', err);
    }
  };

  const handleDeleteSkill = async (skillToDelete) => {
    try {
      const res = await axios.delete(`http://localhost:5000/ReachNex/skills`, {
        headers: { Authorization: `Bearer ${token}` },
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

        <div className="skill-header-icons">
          <button className="icon-btn black" onClick={() => setShowManagePanel(true)} title="Manage Skills">
            <FaPen size={15} />
          </button>

          <button className="icon-btn" onClick={() => setShowAddModal(true)} title="Add Skill">
            <AiOutlinePlus size={20} />
          </button>
        </div>
      </div>

      <div className="skills-display">
        {skills.map((skill, index) => (
          <div className="skill-pill" key={index}>{skill}</div>
        ))}
      </div>

      {showAddModal && (
        <div className="modal-overlay">
          <div className="modal-box">
            <h4>Add Skill</h4>
            <input
              type="text"
              placeholder="e.g. ReactJS"
              value={newSkill}
              onChange={(e) => setNewSkill(e.target.value)}
              className="modal-input"
            />
            <div className="modal-actions">
              <button onClick={handleAddSkill} className="save-skill-btn">Add</button>
              <button onClick={() => setShowAddModal(false)} className="done-skill-btn">Cancel</button>
            </div>
          </div>
        </div>
      )}

      {showManagePanel && (
        <div className="modal-overlay">
          <div className="modal-box">
            <h4>Manage Skills</h4>
            {skills.map((skill, index) => (
              <div key={index} className="manage-skill-row">
                <span>{skill}</span>
                <div className="manage-skill-buttons">
                  <button
                    onClick={() => {
                      setEditSkill(skill);
                      setEditingIndex(index);
                    }}
                    className="icon-btn"
                    title="Edit"
                  >
                    <FaPen />
                  </button>
                  <button
                    onClick={() => handleDeleteSkill(skill)}
                    className="icon-btn"
                    title="Delete"
                  >
                    <AiFillDelete />
                  </button>
                </div>
              </div>
            ))}
            {editingIndex !== null && (
              <div className="edit-skill-modal">
                <input
                  type="text"
                  placeholder="Edit skill"
                  value={editSkill}
                  onChange={(e) => setEditSkill(e.target.value)}
                />
                <div className="modal-actions">
                  <button onClick={handleEditSkill} className="save-skill-btn">Save</button>
                  <button
                    onClick={() => {
                      setEditSkill('');
                      setEditingIndex(null);
                    }}
                    className="done-skill-btn"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            )}
            <button onClick={() => setShowManagePanel(false)} className="done-skill-btn">Close</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default AddSkills;
