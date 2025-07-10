// src/components/LinkedInCard.jsx
import React from 'react';
import styles from './LinkedInCard.module.css';


const LinkedInCard = ({ message }) => {
  return (
    <div className={styles.card}>
      <div className={styles.content}>
        <div className={styles.name}>Faizan Tariq</div>
        <div className={styles.message}>{message}</div>
        <div className={styles.time}>1h</div>
      </div>
    </div>
  );
};

export default LinkedInCard;
