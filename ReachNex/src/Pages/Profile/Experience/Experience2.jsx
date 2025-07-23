import React, { useEffect, useState } from "react";
import "./Experience.css";
import axios from "axios";
import { useParams } from "react-router-dom";

const Experience2 = () => {
  const { id } = useParams(); // 🔁 now using userId
  const [experiences, setExperiences] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchExperiences = async () => {
    try {
      const res = await axios.get(`http://localhost:5000/ReachNex/experience/user/${id}`);
      setExperiences(res.data || []);
    } catch (err) {
      console.error("Error fetching visitor experiences:", err);
      setError("Failed to load experiences");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (id) {
      fetchExperiences();
    }
  }, [id]);

  const formatDate = (dateString) => {
    if (!dateString) return "";
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
    });
  };

  return (
    <div className="experience-container">
      <div className="experience-header">
        <h2>Experience</h2>
      </div>

      {loading && <p>Loading...</p>}
      {error && <p className="error-message">{error}</p>}

      <div className="experiences-list">
        {experiences.length === 0 && !loading ? (
          <p>No experiences available</p>
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
                {exp.description && (
                  <div className="experience-description">{exp.description}</div>
                )}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Experience2;
