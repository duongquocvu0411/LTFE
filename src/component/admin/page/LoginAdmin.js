import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const LoginAdmin = () => {
  const [tenDangNhap, setTenDangNhap] = useState('');
  const [matKhau, setMatKhau] = useState('');
  const dieuHuong = useNavigate();

  // Thông tin đăng nhập mẫu
  const taiKhoanAo = {
    tenDangNhap: 'admin',
    matKhau: '123456',
  };

  // Hàm xử lý khi nhấn đăng nhập
  const xuLyDangNhap = (e) => {
    e.preventDefault();
    if (tenDangNhap === taiKhoanAo.tenDangNhap && matKhau === taiKhoanAo.matKhau) {
      // Lưu trạng thái đăng nhập vào localStorage
      localStorage.setItem('isAdminLoggedIn', 'true'); // Lưu giá trị 'true' dưới dạng chuỗi
      // Chuyển hướng đến trang Dashboard
      dieuHuong('/admin/Dashboard');
    } else {
      alert('Thông tin đăng nhập không đúng!');
    }
  };

  return (
    <div className="container d-flex justify-content-center align-items-center vh-100">
      <div className="card p-4" style={{ width: '400px' }}>
        <h3 className="text-center mb-4">Đăng Nhập Quản Trị</h3>
        <form onSubmit={xuLyDangNhap}>
          <div className="mb-3">
            <label htmlFor="tenDangNhap" className="form-label">Tên đăng nhập</label>
            <input
              type="text"
              className="form-control"
              id="tenDangNhap"
              placeholder="Nhập tên đăng nhập"
              value={tenDangNhap}
              onChange={(e) => setTenDangNhap(e.target.value)}
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="matKhau" className="form-label">Mật khẩu</label>
            <input
              type="password"
              className="form-control"
              id="matKhau"
              placeholder="Nhập mật khẩu"
              value={matKhau}
              onChange={(e) => setMatKhau(e.target.value)}
              required
            />
          </div>
          <button type="submit" className="btn btn-primary w-100">Đăng nhập</button>
        </form>
      </div>
    </div>
  );
};

export default LoginAdmin;
