import React, { useContext, useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { CartContext } from './page/CartContext';
import axios from 'axios';
    
const HeaderUsers = () => {
  const vitriRoute = useLocation();
  const [diachichitiet, setDiachichitiet] = useState({ diachi: ' ', email: '' });
  const { giohang } = useContext(CartContext); // sử dụng CartContext để lấy dữ liệu giỏ hàng

  // tính tổng số lượng sản phẩm hiện có trong giỏ hàng
  const tongSoLuong = giohang.reduce((tong, sanPham) => tong + sanPham.soLuong, 0);

  // gọi api
  useEffect(() => {
    fetchCurrentDiaChi();
  }, []);

  // khai báo api diachichitiets
  const fetchCurrentDiaChi = async () => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_BASEURL}/api/diachichitiet/hiendiachi`);
      if (response.data) {
        setDiachichitiet({
          diachi: response.data.diachi,
          email: response.data.email,
        });
      } else {
        console.log('Không có địa chỉ đang sử dụng');
      }
    } catch (err) {
      console.log('lỗi khi lấy thông tin từ API:', err);
    }
  };

  return (
    <>
      {/* Navbar starts */}
      <div className="container-fluid fixed-top">
        <div className="container topbar bg-primary d-none d-lg-block">
          <div className="d-flex justify-content-between">
            <div className="top-info ps-2 p-2 rounded">
              <small className="me-3 text-white">
                <i className="fas fa-map-marker-alt me-2 text-white" />
                {diachichitiet.diachi}
              </small>
            </div>
            <div className="top-link ps-2 p-2 rounded">
              <small className="me-3 text-white">
                <i className="fas fa-envelope me-2 text-white" />
                {diachichitiet.email}
              </small>
            </div>
          </div>
        </div>
        <div className="container px-0">
          <nav className="navbar navbar-light bg-white navbar-expand-xl">
            <Link to="/" className="navbar-brand">
              <h1 className="text-primary display-6">Trái cây</h1>
            </Link>
            <button className="navbar-toggler py-2 px-3" type="button" data-bs-toggle="collapse" data-bs-target="#navbarCollapse">
              <span className="fa fa-bars text-primary" />
            </button>
            <div className="collapse navbar-collapse bg-white" id="navbarCollapse">
              <div className="navbar-nav mx-auto">
                <Link to="/" className={`nav-item nav-link ${vitriRoute.pathname === '/' ? 'active' : ''}`}>
                  Trang chủ
                </Link>
                <Link to="/shop" className={`nav-item nav-link ${vitriRoute.pathname === '/shop' ? 'active' : ''}`}>
                  Cửa hàng
                </Link>
                <div className="nav-item dropdown">
                  <Link to="#" className="nav-link dropdown-toggle" data-bs-toggle="dropdown">
                    Trang khác
                  </Link>
                  <div className="dropdown-menu m-0 bg-secondary rounded-0">
                    <Link to="/cart" className="dropdown-item">Giỏ hàng</Link>
                    <Link to="/checkout" className="dropdown-item">Thanh toán</Link>
                    <Link to="/Testimonial" className="dropdown-item">Giới thiệu  </Link>
                  </div>
                </div>
                <Link to="/lienhe" className={`nav-item nav-link ${vitriRoute.pathname === '/lienhe' ? 'active' : ''}`}>
                  Liên hệ
                </Link>
                <Link to="/tracuu" className={`nav-item nav-link ${vitriRoute.pathname === '/tracuu' ? 'active' : ''}`}>
                  Tra cứu đơn hàng
                </Link>
              </div>
              <div className="d-flex m-3 me-0">
                <Link to="/cart" className="position-relative me-4 my-auto">
                  <i className="fa fa-shopping-bag fa-2x" />
                  {/* Hiển thị số lượng sản phẩm trong giỏ hàng */}
                  {tongSoLuong > 0 && (
                    <span className="position-absolute bg-secondary rounded-circle d-flex align-items-center justify-content-center text-dark" style={{ top: '-10px', right: '-10px', width: '20px', height: '20px', fontSize: '12px' }}>
                      {tongSoLuong}
                    </span>
                  )}
                </Link>
                <Link to="#" className="my-auto">
                  <i className="fas fa-user fa-2x" />
                </Link>
              </div>
            </div>
          </nav>
        </div>
      </div>
      {/* Navbar End */}
    </>
  );
};

export default HeaderUsers;
