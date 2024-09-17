import React from 'react';

const Stats = () => {
  return (
    <div>
      <h2>Stats</h2>
      <div className="stats-grid">
        <div className="stat-card">
          <h3>Total Students</h3>
          <p className="stat-value">42</p>
        </div>
        <div className="stat-card">
          <h3>Ongoing Sessions</h3>
          <p className="stat-value">7</p>
        </div>
        <div className="stat-card">
          <h3>Completed Sessions</h3>
          <p className="stat-value">156</p>
        </div>
        <div className="stat-card">
          <h3>Average Rating</h3>
          <p className="stat-value">4.8</p>
        </div>
      </div>
    </div>
  );
};

export default Stats;