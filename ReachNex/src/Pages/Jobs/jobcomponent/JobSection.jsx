import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import "./JobSection.css";

import AuthenticationContext from "../../../components/Contexts/AuthenticationContext/AuthenticationContext";

const JobsSection = () => {
  const { user } = useContext(AuthenticationContext);
  const [jobs, setJobs] = useState([]);
  const [showForm, setShowForm] = useState(false);

  const [newJob, setNewJob] = useState({
    title: "",
    company: "",
    location: "",
    employmentType: "",
    logoUrl: "",
    description: "",
  });

  // ✅ Fetch jobs on component load
  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const res = await axios.get("http://localhost:5000/ReachNex/jobs");
        setJobs(res.data); // set all jobs from backend
      } catch (err) {
        console.error("❌ Error fetching jobs:", err);
      }
    };

    fetchJobs();
  }, []);

  const toggleForm = () => setShowForm((prev) => !prev);

  const handleChange = (e) => {
    setNewJob({ ...newJob, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!newJob.title || !newJob.company) return;

    try {
      const response = await axios.post("http://localhost:5000/ReachNex/jobs", {
        userId: user._id,
        ...newJob,
      });

      setJobs([response.data, ...jobs]); // new job on top
      setNewJob({
        title: "",
        company: "",
        location: "",
        employmentType: "",
        logoUrl: "",
        description: "",
      });
      setShowForm(false);
    } catch (err) {
      console.error("Failed to post job:", err);
    }
  };

  return (
    <div className="jobsSection">
      <div className="jobsSection__header">
        <h2>Jobs you may be interested in</h2>
        <button className="toggleFormBtn" onClick={toggleForm}>
          {showForm ? "Cancel" : "+ Post a Job"}
        </button>
      </div>

      {showForm && (
        <form onSubmit={handleSubmit} className="addJobForm">
          <div className="formRow">
            <input
              type="text"
              name="title"
              placeholder="Job Title *"
              value={newJob.title}
              onChange={handleChange}
              required
            />
            <input
              type="text"
              name="company"
              placeholder="Company *"
              value={newJob.company}
              onChange={handleChange}
              required
            />
          </div>
          <div className="formRow">
            <input
              type="text"
              name="location"
              placeholder="Location"
              value={newJob.location}
              onChange={handleChange}
            />
            <input
              type="text"
              name="employmentType"
              placeholder="Employment Type"
              value={newJob.employmentType}
              onChange={handleChange}
            />
          </div>
          <input
            type="text"
            name="logoUrl"
            placeholder="Company Logo URL (optional)"
            value={newJob.logoUrl}
            onChange={handleChange}
          />
          <textarea
            name="description"
            placeholder="Job Description"
            value={newJob.description}
            onChange={handleChange}
            rows={4}
            className="jobTextarea"
          ></textarea>

          <button type="submit">Submit Job</button>
        </form>
      )}

      {/* ✅ Jobs Display Section */}
      <div className="jobCardsContainer">
        {jobs.map((job, index) => (
          <div key={index} className="jobCard">
            <img
              src={job.logoUrl || `https://ui-avatars.com/api/?name=${job.company}`}
              alt={job.company}
              className="jobCard__logo"
            />
            <div className="jobCard__info">
              <h3>{job.title}</h3>
              <p className="company">{job.company}</p>
              <p className="location">{job.location}</p>
              <span className="employmentType">{job.employmentType}</span>
            </div>
            <button className="jobCard__applyBtn">Apply</button>
          </div>
        ))}
      </div>

      <p className="jobsSection__footer">Based on your profile and search activity</p>
    </div>
  );
};

export default JobsSection;
