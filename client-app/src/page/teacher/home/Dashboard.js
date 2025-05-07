import React from 'react';
import StudentTable from '../StudentTable/StudentTable';

function TeacherDashboard() {
  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('role');
    window.location.reload();
  };

  return (
    <div>
      <h2>Chào mừng giáo viên!</h2>
      <button onClick={handleLogout}>Đăng xuất</button>
      <StudentTable />
    </div>
  );
}

export default TeacherDashboard;