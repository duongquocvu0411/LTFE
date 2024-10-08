import React, { useState } from 'react';
import axios from 'axios'; // Import axios để gửi yêu cầu HTTP
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const LoginAdmin = () => {
  const [tenDangNhap, setTenDangNhap] = useState('');
  const [matKhau, setMatKhau] = useState('');
  const dieuHuong = useNavigate();

  // Hàm xử lý khi nhấn đăng nhập
  const xuLyDangNhap = async (e) => {
    e.preventDefault();

    try {
      // Gửi yêu cầu POST tới API Laravel để đăng nhập
      const response = await axios.post('http://127.0.0.1:8000/api/admin/login', {
        username: tenDangNhap,
        password: matKhau,
      });

      console.log('API Response:', response.data); // Kiểm tra phản hồi từ API

      // Kiểm tra phản hồi từ API
      if (response.data.status === 'đăng nhập thành công') {
        // Lưu token vào localStorage
        localStorage.setItem('adminToken', response.data.token);
        localStorage.setItem('isAdminLoggedIn', 'true'); // Cập nhật trạng thái đăng nhập
        // Chuyển hướng đến trang Dashboard
        dieuHuong('/admin/trangchu');
        
      } else {
        toast.warning('thông tin đăng nhập không đúng vui lòng kiểm tra lại',{
          position: 'top-center',
          autoClose:3000
        })
      }
    } catch (error) {
      // Xử lý lỗi khi đăng nhập thất bại
      console.error('Đăng nhập thất bại:', error);
      alert('Thông tin đăng nhập không đúng!');
    }
  };

  return (
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
                      autoComplete="username" 
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
                      autoComplete="current-password" 
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
  );
};

export default LoginAdmin;
