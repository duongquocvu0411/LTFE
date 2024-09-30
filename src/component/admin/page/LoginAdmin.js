import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const LoginAdmin = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  // Thông tin đăng nhập ảo
  const fakeAdmin = {
    username: 'admin',
    password: '123456',
  };

  // Hàm xử lý khi nhấn đăng nhập
  const handleLogin = (e) => {
    e.preventDefault();
    if (username === fakeAdmin.username && password === fakeAdmin.password) {
      // Lưu trạng thái đăng nhập vào localStorage
      localStorage.setItem('isAdminLoggedIn', 'true'); // Lưu giá trị 'true' dưới dạng chuỗi
      // Chuyển hướng đến trang Dashboard
      navigate('/admin/Dashboard');
    } else {
      alert('Thông tin đăng nhập không đúng!');
    }
  };

  return (
    <div className="container d-flex justify-content-center align-items-center vh-100">
      <div className="card p-4" style={{ width: '400px' }}>
        <h3 className="text-center mb-4">Admin Login</h3>
        <form onSubmit={handleLogin}>
          <div className="mb-3">
            <label htmlFor="username" className="form-label">Username</label>
            <input
              type="text"
              className="form-control"
              id="username"
              placeholder="Enter username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="password" className="form-label">Password</label>
            <input
              type="password"
              className="form-control"
              id="password"
              placeholder="Enter password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button type="submit" className="btn btn-primary w-100">Login</button>
        </form>
      </div>
    </div>
  );
};

export default LoginAdmin;
