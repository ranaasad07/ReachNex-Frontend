import React, { useState } from 'react';
import './Experience.css';
import { AiOutlinePlus, AiFillDelete } from 'react-icons/ai';
import { FaPen } from 'react-icons/fa';

const AddExperience = () => {
  const [experience, setExperience] = useState([
    {
      title: 'Frontend Developer',
      company: 'ABC Corp',
      location: 'Karachi',
      from: '2022-01-01',
      to: '2023-06-01',
      description: 'Worked on React UI and frontend integration.'
    }
  ]);

  const [showForm, setShowForm] = useState(false);
  const [editingIndex, setEditingIndex] = useState(null);
  const [form, setForm] = useState({
    title: '',
    company: '',
    location: '',
    from: '',
    to: '',
    description: ''
  });

  const handleSubmit = () => {
    if (editingIndex !== null) {
      const updated = [...experience];
      updated[editingIndex] = form;
      setExperience(updated);
    } else {
      setExperience([...experience, form]);
    }
    setShowForm(false);
    setForm({ title: '', company: '', location: '', from: '', to: '', description: '' });
    setEditingIndex(null);
  };

  const handleEdit = (exp, index) => {
    setForm(exp);
    setEditingIndex(index);
    setShowForm(true);
  };

  const handleDelete = (index) => {
    const updated = experience.filter((_, i) => i !== index);
    setExperience(updated);
  };

  return (
    <div className="experience-container">
      <div className="experience-header">
        <h3>Experience</h3>
        <button className="icon-btn" onClick={() => setShowForm(true)}><AiOutlinePlus /></button>
      </div>

      {experience.map((exp, index) => (
        <div className="experience-item" key={index}>
          <div>
            <strong>{exp.title}</strong> at {exp.company}
            <div>{exp.location} | {new Date(exp.from).toLocaleDateString()} - {new Date(exp.to).toLocaleDateString()}</div>
            <p>{exp.description}</p>
          </div>
          <div className="action-buttons">
            <button onClick={() => handleEdit(exp, index)}><FaPen /></button>
            <button onClick={() => handleDelete(index)}><AiFillDelete /></button>
          </div>
        </div>
      ))}

      {showForm && (
        <div className="modal-overlay">
          <div className="modal-box">
            <h4>{editingIndex !== null ? 'Edit Experience' : 'Add Experience'}</h4>
            <input placeholder="Title" value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} />
            <input placeholder="Company" value={form.company} onChange={(e) => setForm({ ...form, company: e.target.value })} />
            <input placeholder="Location" value={form.location} onChange={(e) => setForm({ ...form, location: e.target.value })} />
            <input type="date" value={form.from} onChange={(e) => setForm({ ...form, from: e.target.value })} />
            <input type="date" value={form.to} onChange={(e) => setForm({ ...form, to: e.target.value })} />
            <textarea placeholder="Description" value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })}></textarea>

            <div className="modal-actions">
              <button onClick={handleSubmit}>Save</button>
              <button onClick={() => {
                setShowForm(false);
                setForm({ title: '', company: '', location: '', from: '', to: '', description: '' });
                setEditingIndex(null);
              }}>Cancel</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AddExperience;
