import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Login = () => {
  const [tenDangNhap, setTenDangNhap] = useState(''); // Tên đăng nhập (username)
  const [matKhau, setMatKhau] = useState(''); // Mật khẩu (password)
  const [dangXuLy, setDangXuLy] = useState(false); // Trạng thái xử lý (loading spinner)
  const dieuHuong = useNavigate(); // Hàm điều hướng người dùng (navigate)

  const xuLyDangNhap = async (e) => {
    e.preventDefault();
    setDangXuLy(true); // Bắt đầu hiển thị spinner khi bắt đầu xử lý đăng nhập

    try {
      // Gửi yêu cầu POST đến API để đăng nhập
      const phanHoi = await axios.post(`${process.env.REACT_APP_BASEURL}/api/admin/login`, {
        username: tenDangNhap,
        password: matKhau,
      });

      // Kiểm tra trạng thái đăng nhập từ phản hồi
      if (phanHoi.data.status === 'Đăng nhập thành công') {
        // Lưu token vào localStorage để sử dụng cho các yêu cầu tiếp theo
        localStorage.setItem('adminToken', phanHoi.data.token);
        localStorage.setItem('isAdminLoggedIn', 'true'); // Lưu trạng thái đăng nhập thành công

        console.log('Đăng nhập thành công:', phanHoi.data.token);

        // Điều hướng người dùng đến trang chủ admin
        dieuHuong('/admin/trangchu');
      } else {
        // Nếu thông tin đăng nhập sai, hiển thị cảnh báo
        toast.warning('Thông tin đăng nhập không đúng. Vui lòng kiểm tra lại.', {
          position: 'top-center',
          autoClose: 3000,
        });
      }
    } catch (error) {
      // Xử lý lỗi khi đăng nhập thất bại (ví dụ: lỗi mạng, lỗi máy chủ)
      console.error('Lỗi đăng nhập:', error);
      toast.error('Đăng nhập thất bại. Vui lòng thử lại.', {
        position: 'top-center',
        autoClose: 3000,
      });
    } finally {
      setDangXuLy(false); // Dừng spinner khi quá trình xử lý hoàn tất
    }
  };

  return (
    <div className="container d-flex vh-100">
      <div className="row justify-content-center align-self-center w-100">
        <div className="col-md-4">
          <div className="card shadow-lg">
            <div className="card-header text-bg-primary text-center">
              <h4 className="mb-0">
                <i className="bi bi-grid-3x3-gap-fill me-2"></i> Đăng Nhập
              </h4>
            </div>
            <div className="card-body">
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
                    autoComplete="username"
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
                    autoComplete="current-password"
                  />
                </div>

                <div className="d-grid">
                  <button type="submit" className="btn btn-primary btn-block" disabled={dangXuLy}>
                    {dangXuLy ? (
                      <>
                        <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                        Đang xử lý...
                      </>
                    ) : (
                      'Đăng nhập'
                    )}
                  </button>
                </div>
              </form>
            </div>

            <div className="card-footer text-center py-3">
              <small className="text-muted">
                © 2024 Shop Bán Trái Cây Tươi
              </small>
            </div>
          </div>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default Login;
