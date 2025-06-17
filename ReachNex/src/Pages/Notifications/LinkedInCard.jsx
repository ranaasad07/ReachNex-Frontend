// src/components/LinkedInCard.jsx
import React from 'react';
import styles from './LinkedInCard.module.css';
// import profilePic from '../assets/profile.png'; // Aap koi bhi placeholder image use kar sakte ho

const LinkedInCard = ({ message }) => {
  return (
    <div className={styles.card}>
      {/* <img src={profilePic} alt="Profile" className={styles.avatar} /> */}
      <div className={styles.content}>
        <div className={styles.name}>Inshrah Tariq</div>
        <div className={styles.message}>{message}</div>
        <div className={styles.time}>1h</div>
      </div>
    </div>
  );
};

export default LinkedInCard;
