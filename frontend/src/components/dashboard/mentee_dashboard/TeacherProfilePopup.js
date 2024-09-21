import React from 'react';
import '../../../styles/mentee_dashboard/TeacherProfilePopup.css';

const TeacherProfilePopup = ({ teacher, onClose }) => {
  return (
    <div className="popup-overlay">
      <div className="popup-content">
        <button className="close-btn" onClick={onClose}>&times;</button>
        <h2>{teacher.name}</h2>
        <div className="profile-details">
          <p><strong>Teaching Language:</strong> {teacher.teachingLanguage}</p>
          <p><strong>Highest Degree:</strong> {teacher.highestDegree}</p>
          <p><strong>Subject Expertise:</strong> {teacher.subjectExpertise}</p>
          <p><strong>Institute:</strong> {teacher.institute}</p>
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
    </div>
  );
};

export default TeacherProfilePopup;