import React, { useEffect, useState } from "react";
import "./RightSidebar.css";
import axios from "axios";

const RightSidebar = () => {
  const [suggestions, setSuggestions] = useState([]);
  const token = localStorage.getItem("token");

  const fetchSuggestions = async () => {
    try {
      const res = await axios.get("http://localhost:5000/ReachNex/suggestions", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setSuggestions(res.data);
    } catch (err) {
      console.error("Error fetching sidebar suggestions:", err);
    }
  };

  const handleConnect = async (receiverId) => {
    try {
      await axios.post(
        "http://localhost:5000/ReachNex/send",
        { receiverId },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      // ✅ Remove the connected user from list
      alert("Connection request sent ✅");
      
      setSuggestions((prev) => prev.filter((user) => user._id !== receiverId));
    } catch (err) {
      console.error("Error sending connection request:", err);
    }
  };

  useEffect(() => {
    if (token) fetchSuggestions();
  }, []);

  return (
    <div className="rightSidebar">
      <h4 className="rightSidebar__title">People you may know</h4>
      <div className="rightSidebar__list">
        {suggestions.map((item) => (
          <div key={item._id} className="rightSidebar__item">
            <img
              src={item.profilePicture || "https://ui-avatars.com/api/?name=User"}
              alt={item.fullName}
              className="rightSidebar__avatar"
            />
            <div className="rightSidebar__info">
              <p className="rightSidebar__name">{item.fullName}</p>
              <p className="rightSidebar__desc">{item.email}</p>
              <button
                className="rightSidebar__followBtn"
                onClick={() => handleConnect(item._id)}
              >
                Connect
              </button>
            </div>
          </div>
        ))}
      </div>
      <a href="/network" className="rightSidebar__link">
        View all recommendations →
      </a>
    </div>
  );
};

export default RightSidebar;
