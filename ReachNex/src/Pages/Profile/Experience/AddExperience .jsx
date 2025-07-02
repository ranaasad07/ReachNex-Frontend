"use client"

import { useState, useEffect } from "react"
import axios from "axios"
import "./Experience.css"

const API_URL = "http://localhost:5000/ReachNex/experience"

const Experience = () => {
  const [experiences, setExperiences] = useState([])
  const [showForm, setShowForm] = useState(false)
  const [editingIndex, setEditingIndex] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const [form, setForm] = useState({
    title: "",
    company: "",
    location: "",
    from: "",
    to: "",
    description: "",
  })

  // Get auth token from localStorage
  const getAuthToken = () => {
    return localStorage.getItem("token") || ""
  }

  // Fetch experiences
  const fetchExperiences = async () => {
    try {
      setLoading(true)
      const token = getAuthToken()
      const response = await axios.get(API_URL, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      })

      if (Array.isArray(response.data)) {
        setExperiences(response.data)
      } else if (response.data.data && Array.isArray(response.data.data)) {
        setExperiences(response.data.data)
      } else {
        setExperiences([])
      }
      setError("")
    } catch (err) {
      console.error("Error fetching experiences:", err)
      setError("Failed to load experiences")
      setExperiences([])
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchExperiences()
  }, [])

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!form.title || !form.company) {
      setError("Title and Company are required")
      return
    }

    try {
      setLoading(true)
      setError("")
      const token = getAuthToken()

      if (editingIndex !== null) {
        // Update existing experience
        const expId = experiences[editingIndex]._id
        const response = await axios.put(`${API_URL}/${expId}`, form, {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        })

        const updatedExperiences = [...experiences]
        updatedExperiences[editingIndex] = response.data
        setExperiences(updatedExperiences)
      } else {
        // Add new experience
        const response = await axios.post(API_URL, form, {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        })

        setExperiences([response.data, ...experiences])
      }

      // Reset form
      resetForm()
    } catch (err) {
      console.error("Error saving experience:", err)
      setError(err.response?.data?.message || "Failed to save experience")
    } finally {
      setLoading(false)
    }
  }

  // Handle edit
  const handleEdit = (exp, index) => {
    setForm({
      title: exp.title || "",
      company: exp.company || "",
      location: exp.location || "",
      from: exp.from ? exp.from.slice(0, 10) : "",
      to: exp.to ? exp.to.slice(0, 10) : "",
      description: exp.description || "",
    })
    setEditingIndex(index)
    setShowForm(true)
    setError("")
  }

  // Handle delete
  const handleDelete = async (index) => {
    if (!window.confirm("Are you sure you want to delete this experience?")) {
      return
    }

    try {
      setLoading(true)
      const expId = experiences[index]._id
      const token = getAuthToken()

      await axios.delete(`${API_URL}/${expId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      })

      const updatedExperiences = experiences.filter((_, i) => i !== index)
      setExperiences(updatedExperiences)
      setError("")
    } catch (err) {
      console.error("Error deleting experience:", err)
      setError("Failed to delete experience")
    } finally {
      setLoading(false)
    }
  }

  // Reset form
  const resetForm = () => {
    setForm({
      title: "",
      company: "",
      location: "",
      from: "",
      to: "",
      description: "",
    })
    setShowForm(false)
    setEditingIndex(null)
    setError("")
  }

  // Format date for display
  const formatDate = (dateString) => {
    if (!dateString) return ""
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
    })
  }

  return (
    <div className="experience-container">
      <div className="experience-header">
        <h2>Experience</h2>
        <button className="add-btn" onClick={() => setShowForm(true)} disabled={loading}>
          <span className="plus-icon">+</span>
        </button>
      </div>

      {error && <div className="error-message">{error}</div>}

      {loading && !showForm && <div className="loading">Loading...</div>}

      <div className="experiences-list">
        {experiences.length === 0 && !loading ? (
          <div className="no-experiences">
            <p>No experiences added yet. Click the + button to add your first experience.</p>
          </div>
        ) : (
          experiences.map((exp, index) => (
            <div key={exp._id || index} className="experience-card">
              <div className="experience-content">
                <div className="experience-title">{exp.title}</div>
                <div className="experience-company">
                  {exp.company} {exp.location && `• ${exp.location}`}
                </div>
                <div className="experience-duration">
                  {formatDate(exp.from)} - {exp.to ? formatDate(exp.to) : "Present"}
                </div>
                {exp.description && <div className="experience-description">{exp.description}</div>}
              </div>
              <div className="experience-actions">
                <button className="edit-btn" onClick={() => handleEdit(exp, index)} disabled={loading} title="Edit">
                  ✏️
                </button>
                <button className="delete-btn" onClick={() => handleDelete(index)} disabled={loading} title="Delete">
                  🗑️
                </button>
              </div>
            </div>
          ))
        )}
      </div>

      {showForm && (
        <div className="modal-overlay" onClick={(e) => e.target === e.currentTarget && resetForm()}>
          <div className="modal-content">
            <div className="modal-header">
              <h3>{editingIndex !== null ? "Edit Experience" : "Add Experience"}</h3>
              <button className="close-btn" onClick={resetForm}>
                ×
              </button>
            </div>

            <form onSubmit={handleSubmit} className="experience-form">
              <div className="form-group">
                <label>Title *</label>
                <input
                  type="text"
                  placeholder="e.g. Software Engineer"
                  value={form.title}
                  onChange={(e) => setForm({ ...form, title: e.target.value })}
                  required
                />
              </div>

              <div className="form-group">
                <label>Company *</label>
                <input
                  type="text"
                  placeholder="e.g. Google"
                  value={form.company}
                  onChange={(e) => setForm({ ...form, company: e.target.value })}
                  required
                />
              </div>

              <div className="form-group">
                <label>Location</label>
                <input
                  type="text"
                  placeholder="e.g. San Francisco, CA"
                  value={form.location}
                  onChange={(e) => setForm({ ...form, location: e.target.value })}
                />
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label>Start Date</label>
                  <input type="date" value={form.from} onChange={(e) => setForm({ ...form, from: e.target.value })} />
                </div>
                <div className="form-group">
                  <label>End Date</label>
                  <input type="date" value={form.to} onChange={(e) => setForm({ ...form, to: e.target.value })} />
                </div>
              </div>

              <div className="form-group">
                <label>Description</label>
                <textarea
                  placeholder="Describe your role and achievements..."
                  value={form.description}
                  onChange={(e) => setForm({ ...form, description: e.target.value })}
                  rows="4"
                />
              </div>

              <div className="form-actions">
                <button type="button" className="cancel-btn" onClick={resetForm}>
                  Cancel
                </button>
                <button type="submit" className="save-btn" disabled={loading}>
                  {loading ? "Saving..." : "Save"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}

export default Experience
