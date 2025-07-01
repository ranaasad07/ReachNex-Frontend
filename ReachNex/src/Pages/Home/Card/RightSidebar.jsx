import React, { useState } from "react";
import "./RightSidebar.css";

const initialSuggestions = [
  {
    name: "HackerRank",
    description: "Company • Software Development",
    avatar: "https://ui-avatars.com/api/?name=HackerRank&background=0D8ABC&color=fff",
    isFollowing: false,
  },
  {
    name: "Technology Brainz",
    description: "Company • Information Technology & Services",
    avatar: "https://ui-avatars.com/api/?name=Technology+Brainz&background=0D8ABC&color=fff",
    isFollowing: false,
  },
  {
    name: "Ayesha Mansha",
    description: "Co-Founder at Brand ClickX | SEO Expert & Content Strategist | Helping Brands ...",
    avatar: "https://ui-avatars.com/api/?name=Ayesha+M&background=0D8ABC&color=fff",
    isFollowing: false,
  },
];

const RightSidebar = () => {
  const [suggestions, setSuggestions] = useState(initialSuggestions);

  const handleFollowToggle = (index) => {
    const updatedSuggestions = [...suggestions];
    updatedSuggestions[index].isFollowing = !updatedSuggestions[index].isFollowing;
    setSuggestions(updatedSuggestions);
  };

  return (
    <div className="rightSidebar">
      <h4 className="rightSidebar__title">Add to your feed</h4>
      <div className="rightSidebar__list">
        {suggestions.map((item, index) => (
          <div key={index} className="rightSidebar__item">
            <img src={item.avatar} alt={item.name} className="rightSidebar__avatar" />
            <div className="rightSidebar__info">
              <p className="rightSidebar__name">{item.name}</p>
              <p className="rightSidebar__desc">{item.description}</p>
              <button
                className={`rightSidebar__followBtn ${
                  item.isFollowing ? "following" : ""
                }`}
                onClick={() => handleFollowToggle(index)}
              >
                {item.isFollowing ? "Following" : "+ Follow"}
              </button>
            </div>
          </div>
        ))}
      </div>
      <a href="#" className="rightSidebar__link">View all recommendations →</a>
    </div>
  );
};

export default RightSidebar;
