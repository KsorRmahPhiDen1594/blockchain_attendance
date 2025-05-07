import React, { useState } from 'react';

function Register() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  // Có thể thêm các trường khác (tên, tuổi, v.v.) nếu cần

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Gọi API đăng ký
    try {
      const response = await fetch('/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });
      const data = await response.json();
      if (response.ok) {
        console.log('Đăng ký thành công:', data);
        // Ở đây có thể chuyển hướng đến trang đăng nhập hoặc gọi onLogin tùy backend
        // Ví dụ: navigate('/'), hoặc sử dụng props.onLogin nếu muốn tự động đăng nhập
      } else {
        console.error('Đăng ký thất bại:', data);
      }
    } catch (error) {
      console.error('Lỗi khi kết nối API:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Đăng ký</h2>
      <label>
        Email:
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </label>
      <label>
        Mật khẩu:
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
      </label>
      <button type="submit">Đăng ký</button>
    </form>
  );
}

export default Register;
