// src/App.jsx
import React from 'react';
import LinkedInCard from './LinkedInCard';

function App() {
  // 🔁 Mock backend data
  const posts = [
    {
      id: 1,
      message: "IMMEDIATE HIRING Please apply only if you have expertise in the mentioned skills."
    },
    {
      id: 2,
      message: "My friend is hiring: Remote Contract Content Writer (3–4 yrs). Looking for SEO blog experts."
    },
    {
      id: 3,
      message: "We're Hiring: Senior Software Engineer (Python/Django) with 3–5 years experience."
    },
    {
      id: 4,
      message: "Content Creator Intern (YouTube) – turn ideas into viral content!"
    }
  ];

  return (
    <div>
      {posts.map(post => (
        <LinkedInCard key={post.id} message={post.message} />
      ))}
    </div>
  );
}

export default App;
