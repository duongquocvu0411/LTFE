// import React from 'react';
// import { Navigate } from 'react-router-dom';

// const ProtectedRoute = ({ children }) => {
//   // Kiểm tra trạng thái đăng nhập
//   const isLoggedIn = localStorage.getItem('isAdminLoggedIn') === 'true'; // Đảm bảo giá trị kiểm tra là chuỗi 'true'

//   return isLoggedIn ? children : <Navigate to="/admin/Login" />;
// };

// export default ProtectedRoute;

import React from 'react';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children, isPublic = false }) => {
  // Kiểm tra trạng thái đăng nhập
  const isLoggedIn = localStorage.getItem('isAdminLoggedIn') === 'true';

  // Nếu là trang công khai (isPublic) hoặc đã đăng nhập thì cho phép truy cập
  if (isPublic || isLoggedIn) {
    return children;
  }

  // Nếu không phải trang công khai và chưa đăng nhập, chuyển hướng đến trang 404
  return <Navigate to="*" />;
};

export default ProtectedRoute;
