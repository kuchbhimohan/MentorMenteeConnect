import React, { useState, useEffect, useCallback } from 'react';
import { getMatchingMentors, sendConnectionRequest } from '../../../services/api';
import TeacherProfilePopup from './TeacherProfilePopup';
import '../../../styles/mentee_dashboard/InterestedTeachers.css';

const InterestedTeachers = () => {
  const [teachers, setTeachers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedTeacher, setSelectedTeacher] = useState(null);

  useEffect(() => {
    const fetchMatchingMentors = async () => {
      try {
        const data = await getMatchingMentors();
        setTeachers(data);
        setLoading(false);
      } catch (err) {
        setError('Failed to fetch matching mentors');
        setLoading(false);
      }
    };

    fetchMatchingMentors();
  }, []);

  const handleTeacherClick = useCallback((teacher) => {
    setSelectedTeacher(teacher);
  }, []);

  const handleClosePopup = useCallback(() => {
    setSelectedTeacher(null);
  }, []);

  const handleConnectRequest = useCallback(async (teacherId) => {
    try {
      await sendConnectionRequest(teacherId);
      alert('Connection request sent successfully!');
      handleClosePopup();
    } catch (error) {
      console.error('Error sending connection request:', error);
      alert('Failed to send connection request. Please try again.');
    }
  }, [handleClosePopup]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="interested-teachers-container">
      <h2>Teachers You Might Be Interested In</h2>
      <div className="teachers-grid">
        {teachers.map((teacher) => (
          <div 
            key={teacher._id} 
            className="teacher-card"
            onClick={() => handleTeacherClick(teacher)}
          >
            <h3>{teacher.name}</h3>
            <p>Expert in {teacher.subjectExpertise}</p>
          </div>
        ))}
      </div>
      {selectedTeacher && (
        <TeacherProfilePopup 
          teacher={selectedTeacher} 
          onClose={handleClosePopup}
          onConnect={handleConnectRequest}
        />
      )}
    </div>
  );
};

export default InterestedTeachers;