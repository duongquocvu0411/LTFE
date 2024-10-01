

import React from 'react';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children, congkhai = false }) => {
  // Kiểm tra trạng thái đăng nhập
  const daDangNhap = localStorage.getItem('isAdminLoggedIn') === 'true';

  // Nếu là trang công khai (isPublic) hoặc đã đăng nhập thì cho phép truy cập
  if (congkhai || daDangNhap) {
    return children;
  }

  // Nếu không phải trang công khai và chưa đăng nhập, chuyển hướng đến trang 404
  return <Navigate to="*" />;
};

export default ProtectedRoute;
