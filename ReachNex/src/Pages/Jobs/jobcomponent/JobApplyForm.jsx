import React, { useState, useContext } from "react";
import axios from "axios";
import AuthenticationContext from "../../../components/Contexts/AuthenticationContext/AuthenticationContext";
import "./JobApplyForm.css";

const JobApplyForm = ({ jobId, onClose, onApplied }) => {
  const { user } = useContext(AuthenticationContext);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    coverLetter: "",
    resume: null,
  });

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: files ? files[0] : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = new FormData();
    payload.append("name", formData.name);
    payload.append("email", formData.email);
    payload.append("phone", formData.phone);
    payload.append("coverLetter", formData.coverLetter);
    payload.append("resume", formData.resume);
    payload.append("userId", user._id);

    try {
      await axios.post(
        `http://localhost:5000/ReachNex/jobs/${jobId}/apply`,
        payload
      );
      alert("✅ Application submitted successfully!");
      onApplied(jobId); // ✅ Notify parent to mark as applied
      onClose();        // ✅ Close the modal
    } catch (err) {
      console.error("❌ Failed to apply:", err);
      alert("Something went wrong!");
    }
  };

  return (
    <div className="jobApplyModal">
      <form onSubmit={handleSubmit} className="jobApplyForm">
        <h3>Apply for this job</h3>

        <input
          type="text"
          name="name"
          placeholder="Your Name"
          required
          value={formData.name}
          onChange={handleChange}
        />

        <input
          type="email"
          name="email"
          placeholder="Email"
          required
          value={formData.email}
          onChange={handleChange}
        />

        <input
          type="tel"
          name="phone"
          placeholder="Phone"
          required
          value={formData.phone}
          onChange={handleChange}
        />

        <textarea
          name="coverLetter"
          placeholder="Cover Letter"
          required
          value={formData.coverLetter}
          onChange={handleChange}
          rows="4"
        />

        <input
          type="file"
          name="resume"
          accept=".pdf"
          required
          onChange={handleChange}
        />

        <button type="submit">Submit Application</button>
        <button type="button" onClick={onClose}>Cancel</button>
      </form>
    </div>
  );
};

export default JobApplyForm;
