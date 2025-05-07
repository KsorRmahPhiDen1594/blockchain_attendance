import React from 'react';

function StudentHome() {
  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('role');
    window.location.reload();
  };

  return (
    <div>
      <h2>Chào mừng sinh viên!</h2>
      <p>Bạn chỉ có quyền xem thông tin điểm danh.</p>
      <button onClick={handleLogout}>Đăng xuất</button>
    </div>
  );
}

export default StudentHome;
