import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Register from './components/auth/admin/register/register';
import Login from './components/auth/admin/login/Login';
import AdminDashboard from './components/auth/admin/page/Dashboard';
import TeacherDashboard from './page/teacher/home/Dashboard';
import StudentHome from './page/student/home/home';

function App() {
  const [role, setRole] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('token');
    const userRole = localStorage.getItem('role');
    if (token && userRole) {
      setIsAuthenticated(true);
      setRole(userRole);
    }
  }, []);

  const handleLogin = (userRole) => {
    localStorage.setItem('role', userRole); // đảm bảo role được lưu
    setRole(userRole);
    setIsAuthenticated(true);
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('role');
    setIsAuthenticated(false);
    setRole(null);
  };

  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={
            isAuthenticated && role ? (
              <Navigate to={`/${role}`} replace />
            ) : (
              <Login onLogin={handleLogin} />
            )
          }
        />
        <Route
          path="/register"
          element={
            isAuthenticated && role ? (
              <Navigate to={`/${role}`} replace />
            ) : (
              <Register />
            )
          }
        />
        <Route
          path="/admin"
          element={
            isAuthenticated && role === 'admin' ? (
              <AdminDashboard onLogout={handleLogout} />
            ) : (
              <Navigate to="/" replace />
            )
          }
        />
        <Route
          path="/teacher"
          element={
            isAuthenticated && role === 'teacher' ? (
              <TeacherDashboard onLogout={handleLogout} />
            ) : (
              <Navigate to="/" replace />
            )
          }
        />
        <Route
          path="/student"
          element={
            isAuthenticated && role === 'student' ? (
              <StudentHome onLogout={handleLogout} />
            ) : (
              <Navigate to="/" replace />
            )
          }
        />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
}

export default App;
