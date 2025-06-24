// src/components/FilterTabs.jsx
import React from 'react';
import styles from './FilterTabs.module.css';

const tabs = ['All', 'Jobs', 'My posts', 'Mentions'];

const FilterTabs = ({ activeTab, setActiveTab }) => {
  return (
    <div className={styles.tabContainer}>
      {tabs.map((tab) => (
        <button
          key={tab}
          className={`${styles.tab} ${activeTab === tab ? styles.active : ''}`}
          onClick={() => setActiveTab(tab)}
        >
          {tab}
        </button>
      ))}
    </div>
  );
};

export default FilterTabs;

