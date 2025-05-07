import React from 'react';
import StudentTable from '../../../components/StudentTable';

function Dashboard() {
  const handleLogout = () => {
    localStorage.removeItem('token');
    window.location.reload();
  };

  return (
    <div>
      <h2>Chào mừng bạn đã đăng nhập!</h2>
      <button onClick={handleLogout}>Đăng xuất</button>
      <StudentTable />
    </div>
  );
}

export default Dashboard;
