import React, { useState, useEffect } from 'react';
import { getMatchingMentors } from '../../../services/api';
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

  const handleTeacherClick = (teacher) => {
    setSelectedTeacher(teacher);
  };

  const handleClosePopup = () => {
    setSelectedTeacher(null);
  };

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
        />
      )}
    </div>
  );
};

export default InterestedTeachers;