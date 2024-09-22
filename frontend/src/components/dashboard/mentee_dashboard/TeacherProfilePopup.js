import React from 'react';
import '../../../styles/mentee_dashboard/TeacherProfilePopup.css';

const TeacherProfilePopup = ({ teacher, onClose, onConnect }) => {
  const handleConnect = () => {
    if (typeof onConnect === 'function') {
      onConnect(teacher._id);
    } else {
      console.error('onConnect is not a function');
    }
  };

  return (
    <div className="popup-overlay">
      <div className="popup-content">
        <button className="close-btn" onClick={onClose}>&times;</button>
        <div className="teacher-header">
          <h2>{teacher.name}</h2>
          <button className="connect-btn" onClick={handleConnect}>
            Connect to Teacher
          </button>
        </div>
        <div className="profile-details">
          <div className="detail-item">
            <span className="detail-label">Teaching Language:</span>
            <span className="detail-value">{teacher.teachingLanguage}</span>
          </div>
          <div className="detail-item">
            <span className="detail-label">Highest Degree:</span>
            <span className="detail-value">{teacher.highestDegree}</span>
          </div>
          <div className="detail-item">
            <span className="detail-label">Subject Expertise:</span>
            <span className="detail-value">{teacher.subjectExpertise}</span>
          </div>
          <div className="detail-item">
            <span className="detail-label">Institute:</span>
            <span className="detail-value">{teacher.institute}</span>
          </div>
        </div>
        <div className="bio-section">
          <h3>Bio</h3>
          <p>{teacher.bio}</p>
        </div>
        {teacher.achievements && (
          <div className="achievements-section">
            <h3>Achievements</h3>
            <p>{teacher.achievements}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default TeacherProfilePopup;