import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const SiderbarAdmin = () => {
  const vitriRoute = useLocation();

  return (
    // Sử dụng class `collapse` để sidebar có thể bật/tắt
    <aside className="main-sidebar sidebar-dark-primary elevation-4 collapse d-md-block" id="sidebar">
      <ul className="navbar-nav bg-gradient-primary sidebar sidebar-dark accordion">
        {/* Sidebar - Brand */}
        <Link to="/admin/Trangchu" className="sidebar-brand d-flex align-items-center justify-content-center">
          <div className="sidebar-brand-icon rotate-n-15">
            <i className="fas fa-laugh-wink"></i>
          </div>
          <div className="sidebar-brand-text mx-3">SB Admin <sup>2</sup></div>
        </Link>

        {/* Divider */}
        <hr className="sidebar-divider my-0" />

        {/* Dashboard */}
        <li className={`nav-item ${vitriRoute.pathname === '/admin/Trangchu' ? 'active' : ''}`}>
          <Link className="nav-link" to="/admin/Trangchu">
            <i className="fas fa-fw fa-tachometer-alt"></i>
            <span>Dashboard</span>
          </Link>
        </li>
        <li className={`nav-item ${vitriRoute.pathname === '/admin/menu' ? 'active' : ''}`}>
          <Link className="nav-link" to="/admin/menu">
            <i className="fas fa-fw fa-tachometer-alt"></i>
            <span>Menu</span>
          </Link>
        </li>
        <li className={`nav-item ${vitriRoute.pathname === '/admin/tencuahang' ? 'active' : ''}`}>
          <Link className="nav-link" to="/admin/tencuahang">
            <i className="fas fa-fw fa-tachometer-alt"></i>
            <span>Tên cửa hàng</span>
          </Link>
        </li>
        <li className={`nav-item ${vitriRoute.pathname === '/admin/dactrung' ? 'active' : ''}`}>
          <Link className="nav-link" to="/admin/dactrung">
            <i className="fas fa-fw fa-tachometer-alt"></i>
            <span>Đặc trưng </span>
          </Link>
        </li>
        <li className={`nav-item ${vitriRoute.pathname === '/admin/Banners' ? 'active' : ''}`}>
          <Link className="nav-link" to="/admin/Banners">
            <i className="fas fa-fw fa-tachometer-alt"></i>
            <span> Banners</span>
          </Link>
        </li>
       
        {/* Divider */}
        <hr className="sidebar-divider" />

        {/* Sản Phẩm */}
        <li className={`nav-item ${vitriRoute.pathname === '/admin/sanpham' ? 'active' : ''}`}>
          <Link className="nav-link" to="/admin/sanpham">
            <i className="fas fa-fw fa-box"></i>
            <span>Sản Phẩm</span>
          </Link>
        </li>

        {/* Danh Mục */}
        <li className={`nav-item ${vitriRoute.pathname === '/admin/danhmucsanpham' ? 'active' : ''}`}>
          <Link className="nav-link" to="/admin/danhmucsanpham">
            <i className="fas fa-fw fa-list"></i>
            <span>Danh mục</span>
          </Link>
        </li>

        {/* Địa Chỉ Admin */}
        <li className={`nav-item ${vitriRoute.pathname === '/admin/diachichitiet' ? 'active' : ''}`}>
          <Link className="nav-link" to="/admin/diachichitiet">
            <i className="fas fa-fw fa-map-marker-alt"></i>
            <span>Địa Chỉ Admin</span>
          </Link>
        </li>

        {/* Liên Hệ */}
        <li className={`nav-item ${vitriRoute.pathname === '/admin/lienhe' ? 'active' : ''}`}>
          <Link className="nav-link" to="/admin/lienhe">
            <i className="fas fa-fw fa-envelope"></i>
            <span>Liên Hệ</span>
          </Link>
        </li>

        {/* Khách hàng */}
        <li className={`nav-item ${vitriRoute.pathname === '/admin/khachhang' ? 'active' : ''}`}>
          <Link className="nav-link" to="/admin/khachhang">
          <i class="bi bi-person-vcard-fill"></i>
            <span>Đơn hàng</span>
          </Link>
        </li>

        {/* Divider */}
        <hr className="sidebar-divider" />
      </ul>
    </aside>
  );
};

export default SiderbarAdmin;
