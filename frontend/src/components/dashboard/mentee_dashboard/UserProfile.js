import React, { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../../context/AuthContext';
import '../../../styles/mentee_dashboard/UserProfile.css';

const UserProfile = () => {
  const { user, updateUserProfile } = useContext(AuthContext);
  const navigate = useNavigate();
  const [profile, setProfile] = useState({
    name: user?.name || '',
    age: '',
    currentLevel: '',
    institution: '',
    interestedSubjects: ''
  });

  const levels = ['Class 1', 'Class 2', 'Class 3', 'Class 4', 'Class 5', 'Class 6', 'Class 7', 'Class 8', 'Class 9', 'Class 10', 'Class 11', 'Class 12', 'Bachelors'];
  const subjects = ['Mathematics', 'Physics', 'Chemistry', 'Biology', 'Computer Science', 'Literature', 'History', 'Geography'];

  useEffect(() => {
    if (user?.profileCompleted) {
      navigate('/mentee/dashboard');
    }
  }, [user, navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfile(prevProfile => ({
      ...prevProfile,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await updateUserProfile({ ...profile, profileCompleted: true });
      navigate('/mentee/dashboard');
    } catch (error) {
      console.error('Failed to update profile:', error);
    }
  };

  return (
    <div className="user-profile">
      <h2>Complete Your Profile</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="name">Name</label>
          <input type="text" id="name" name="name" value={profile.name} onChange={handleChange} required />
        </div>
        <div className="form-group">
          <label htmlFor="age">Age</label>
          <input type="number" id="age" name="age" value={profile.age} onChange={handleChange} required />
        </div>
        <div className="form-group">
          <label htmlFor="currentLevel">Current Class/Level</label>
          <select id="currentLevel" name="currentLevel" value={profile.currentLevel} onChange={handleChange} required>
            <option value="">Select Class/Level</option>
            {levels.map(level => (
              <option key={level} value={level}>{level}</option>
            ))}
          </select>
        </div>
        <div className="form-group">
          <label htmlFor="institution">Current School/University</label>
          <input type="text" id="institution" name="institution" value={profile.institution} onChange={handleChange} required />
        </div>
        <div className="form-group">
          <label htmlFor="interestedSubjects">Interested Subjects</label>
          <select id="interestedSubjects" name="interestedSubjects" value={profile.interestedSubjects} onChange={handleChange} required>
            <option value="">Select Subject</option>
            {subjects.map(subject => (
              <option key={subject} value={subject}>{subject}</option>
            ))}
          </select>
        </div>
        <button type="submit" className="submit-btn">Save Profile</button>
      </form>
    </div>
  );
};

export default UserProfile;