import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';

const ProtectedRoute = ({ children, congkhai = false }) => {
  // Kiểm tra trạng thái đăng nhập bằng cách kiểm tra sự tồn tại của token
  const daDangNhap = localStorage.getItem('adminToken') !== null;
  const location = useLocation(); // Lấy tuyến đường hiện tại

  // Chuyển hướng người dùng đã đăng nhập khỏi trang đăng nhập
  if (daDangNhap && location.pathname === '/admin/login') {
    return <Navigate to="/admin/trangchu" />;
  }

  // Cho phép truy cập nếu đó là trang công khai hoặc người dùng đã đăng nhập
  if (congkhai || daDangNhap) {
    return children;
  }

  // Chuyển hướng người dùng chưa đăng nhập đến trang đăng nhập
  return <Navigate to="/admin/login" />;
};

export default ProtectedRoute;
