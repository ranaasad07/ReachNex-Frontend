// src/App.jsx
import React, { useState } from 'react';
import FilterTabs from './FilterTabs';
import LinkedInCard from './LinkedInCard';

function App() {
  const [activeTab, setActiveTab] = useState('All');

  // 🧠 Static Mock Data with Types
  const posts = [
    { id: 1, message: "IMMEDIATE HIRING Please apply only if you have expertise in the mentioned skills.", type: 'job' },
    { id: 2, message: "My friend is hiring: Remote Contract Content Writer (3–4 yrs).", type: 'job' },
    { id: 3, message: "We're Hiring: Python Developer at Datics AI.", type: 'job' },
    { id: 4, message: "Posted: My experience as a dev intern.", type: 'post' },
    { id: 5, message: "Someone mentioned you in a comment.", type: 'mention' },
    { id: 6, message: "Shared insights about job hunting tips.", type: 'post' },
    { id: 7, message: "You were mentioned in Amna's post.", type: 'mention' }
  ];

  // 🧹 Filter Logic
  const filteredPosts = activeTab === 'All'
    ? posts
    : posts.filter(post => {
        if (activeTab === 'Jobs') return post.type === 'job';
        if (activeTab === 'My posts') return post.type === 'post';
        if (activeTab === 'Mentions') return post.type === 'mention';
        return true;
      });

  return (
    <div>
      <FilterTabs activeTab={activeTab} setActiveTab={setActiveTab} />
      {filteredPosts.length > 0 ? (
        filteredPosts.map(post => (
          <LinkedInCard key={post.id} message={post.message} />
        ))
      ) : (
        <p style={{ textAlign: 'center', color: '#888' }}>No notifications in this category.</p>
      )}
    </div>
  );
}

export default App;


