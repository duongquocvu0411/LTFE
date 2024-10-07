import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const LoginAdmin = () => {
  const [tenDangNhap, setTenDangNhap] = useState('');
  const [matKhau, setMatKhau] = useState('');
  const dieuHuong = useNavigate();

  // Thông tin đăng nhập mẫu
  const taiKhoanAo = {
    tenDangNhap: 'admin',
    matKhau: '123',
  };

  // Hàm xử lý khi nhấn đăng nhập
  const xuLyDangNhap = (e) => {
    e.preventDefault();
    if (tenDangNhap === taiKhoanAo.tenDangNhap && matKhau === taiKhoanAo.matKhau) {
      // Lưu trạng thái đăng nhập vào localStorage
      localStorage.setItem('isAdminLoggedIn', 'true'); // Lưu giá trị 'true' dưới dạng chuỗi
      // Chuyển hướng đến trang Dashboard
      dieuHuong('/admin/Trangchu');
    } else {
      alert('Thông tin đăng nhập không đúng!');
    }
  };

  return (
    <>
  <div className="container d-flex vh-100">
      <div className="row justify-content-center align-self-center w-100">
        <div className="col-md-4">
          <div className="card">
            <div className="card-header text-bg-primary">
              <h4>
                <i className="bi bi-grid-3x3-gap-fill"></i> Login
              </h4>
            </div>
            <div className="card-body">
              <form onSubmit={xuLyDangNhap}>
                <div className="mb-3 row">
                  <label htmlFor="username" className="col-sm-4 col-form-label">
                    User name
                  </label>
                  <div className="col-sm-8">
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
                </div>

                <div className="mb-3 row">
                  <label htmlFor="password" className="col-sm-4 col-form-label">
                    Password
                  </label>
                  <div className="col-sm-8">
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
                </div>

                <div className="row">
                  <div className="col-sm-4"></div>
                  <div className="col-sm-8">
                    <button type="submit" className="btn btn-primary">
                    Đăng nhập
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
    </>
  );
};

export default LoginAdmin;
