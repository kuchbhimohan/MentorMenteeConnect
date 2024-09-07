import React from 'react';
import { Routes, Route } from 'react-router-dom';
import CommonHomePage from './pages/common/CommonHomePage';
// import LoginPage from './pages/auth/LoginPage';
// import SignUpPage from './pages/auth/SignUpPage';
// import MentorDashboardPage from './pages/mentor/MentorDashboardPage';
// import MenteeDashboardPage from './pages/mentee/MenteeDashboardPage';

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<CommonHomePage />} />
      {/* <Route path="/login" element={<LoginPage />} /> */}
      {/* <Route path="/signup" element={<SignUpPage />} /> */}
      {/* <Route path="/mentor/dashboard" element={<MentorDashboardPage />} /> */}
      {/* <Route path="/mentee/dashboard" element={<MenteeDashboardPage />} /> */}
      {/* Add more routes as needed */}
    </Routes>
  );
};

export default AppRoutes;