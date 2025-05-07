import React from 'react';

function AdminDashboard() {
  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('role');
    window.location.reload();
  };

  return (
    <div>
      <h2>Dashboard Quản trị viên</h2>
      <p>Quản lý giáo viên, phân quyền hệ thống tại đây.</p>
      <button onClick={handleLogout}>Đăng xuất</button>
    </div>
  );
}

export default AdminDashboard;