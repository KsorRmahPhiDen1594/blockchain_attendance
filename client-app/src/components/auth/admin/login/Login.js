import React, { useState } from 'react';

function Login({ onLogin }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (response.ok) {
        const { token, role } = data;
        localStorage.setItem('token', token);
        localStorage.setItem('role', role);
        onLogin(role);
      } else {
        setError(data.message || 'Đăng nhập thất bại.');
      }
    } catch (error) {
      setError('Lỗi kết nối đến máy chủ.');
    }
  };

  return (
    <div style={{ padding: '20px' }}>
      <h2>Đăng nhập</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <form onSubmit={handleSubmit}>
        <label>
          Email:
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </label>
        <br />
        <label>
          Mật khẩu:
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </label>
        <br />
        <button type="submit">Đăng nhập</button>
      </form>
    </div>
  );
}

export default Login;
