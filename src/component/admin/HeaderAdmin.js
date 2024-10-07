import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const HeaderAdmin = () => {
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();

  // Hiển thị modal xác nhận đăng xuất
  const handleClickDangXuat = () => {
    setShowModal(true);
  };

  // Xác nhận đăng xuất
  const handleXacNhanDangXuatTaiKhoan = () => {
    localStorage.removeItem('isAdminLoggedIn');
    setShowModal(false);
    navigate('/admin/Login');
  };

  // Đóng modal xác nhận đăng xuất
  const handleDongModla = () => {
    setShowModal(false);
  };

  return (
    <>
      {/* Topbar */}
      <nav className="navbar navbar-expand navbar-light bg-white topbar mb-4 static-top shadow">
        {/* Sidebar Toggle (Topbar) */}
        <button
          id="sidebarToggleTop"
          className="btn btn-link rounded-circle mr-3 d-md-none"
          data-bs-toggle="collapse"
          data-bs-target="#sidebar"
          aria-controls="sidebar"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <i className="fa fa-bars"></i>
        </button>

        {/* Topbar Search */}
        <form className="d-none d-sm-inline-block form-inline mr-auto ml-md-3 my-2 my-md-0 mw-100 navbar-search">
          <div className="input-group">
            <input
              type="text"
              className="form-control bg-light border-0 small"
              placeholder="Search for..."
              aria-label="Search"
              aria-describedby="basic-addon2"
            />
            <div className="input-group-append">
              <button className="btn btn-primary" type="button">
                <i className="fas fa-search fa-sm"></i>
              </button>
            </div>
          </div>
        </form>

        {/* Topbar Navbar */}
        <ul className="navbar-nav ml-auto">
          {/* Nav Item - Search Dropdown (Visible Only XS) */}
          <li className="nav-item dropdown no-arrow d-sm-none">
            <a
              className="nav-link dropdown-toggle"
              href="#"
              id="searchDropdown"
              role="button"
              data-bs-toggle="dropdown"
              aria-haspopup="true"
              aria-expanded="false"
            >
              <i className="fas fa-search fa-fw"></i>
            </a>
            <div className="dropdown-menu dropdown-menu-right p-3 shadow animated--grow-in" aria-labelledby="searchDropdown">
              <form className="form-inline mr-auto w-100 navbar-search">
                <div className="input-group">
                  <input
                    type="text"
                    className="form-control bg-light border-0 small"
                    placeholder="Search for..."
                    aria-label="Search"
                    aria-describedby="basic-addon2"
                  />
                  <div className="input-group-append">
                    <button className="btn btn-primary" type="button">
                      <i className="fas fa-search fa-sm"></i>
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </li>

          {/* Nav Item - Alerts */}
          <li className="nav-item dropdown no-arrow mx-1">
            <a
              className="nav-link dropdown-toggle"
              href="#"
              id="alertsDropdown"
              role="button"
              data-bs-toggle="dropdown"
              aria-haspopup="true"
              aria-expanded="false"
            >
              <i className="fas fa-bell fa-fw"></i>
              <span className="badge badge-danger badge-counter">3+</span>
            </a>
            <div className="dropdown-list dropdown-menu dropdown-menu-right shadow animated--grow-in" aria-labelledby="alertsDropdown">
              <h6 className="dropdown-header">Alerts Center</h6>
              <a className="dropdown-item d-flex align-items-center" href="#">
                <div className="mr-3">
                  <div className="icon-circle bg-primary">
                    <i className="fas fa-file-alt text-white"></i>
                  </div>
                </div>
                <div>
                  <div className="small text-gray-500">December 12, 2019</div>
                  <span className="font-weight-bold">A new monthly report is ready to download!</span>
                </div>
              </a>
              <a className="dropdown-item text-center small text-gray-500" href="#">
                Show All Alerts
              </a>
            </div>
          </li>

          {/* Nav Item - Messages */}
          <li className="nav-item dropdown no-arrow mx-1">
            <a
              className="nav-link dropdown-toggle"
              href="#"
              id="messagesDropdown"
              role="button"
              data-bs-toggle="dropdown"
              aria-haspopup="true"
              aria-expanded="false"
            >
              <i className="fas fa-envelope fa-fw"></i>
              <span className="badge badge-danger badge-counter">7</span>
            </a>
            <div className="dropdown-list dropdown-menu dropdown-menu-right shadow animated--grow-in" aria-labelledby="messagesDropdown">
              <h6 className="dropdown-header">Message Center</h6>
              <a className="dropdown-item d-flex align-items-center" href="#">
                <div className="dropdown-list-image mr-3">
                  <img className="rounded-circle" src={`${process.env.PUBLIC_URL}/lte/img/undraw_profile_1.svg`} alt="..." />
                  <div className="status-indicator bg-success"></div>
                </div>
                <div className="font-weight-bold">
                  <div className="text-truncate">Hi there! I am wondering if you can help me with a problem I've been having.</div>
                  <div className="small text-gray-500">Emily Fowler · 58m</div>
                </div>
              </a>
              <a className="dropdown-item text-center small text-gray-500" href="#">
                Read More Messages
              </a>
            </div>
          </li>

          <div className="topbar-divider d-none d-sm-block"></div>

          {/* Nav Item - User Information */}
          <li className="nav-item dropdown no-arrow">
            <a
              className="nav-link dropdown-toggle"
              href="#"
              id="userDropdown"
              role="button"
              data-bs-toggle="dropdown"
              aria-haspopup="true"
              aria-expanded="false"
            >
              <span className="mr-2 d-none d-lg-inline text-gray-600 small">Douglas McGee</span>
              <img className="img-profile rounded-circle" src={`${process.env.PUBLIC_URL}/lte/img/undraw_profile.svg`} alt="User Profile" />
            </a>
            <div className="dropdown-menu dropdown-menu-right shadow animated--grow-in" aria-labelledby="userDropdown">
              <Link className="dropdown-item" to="/admin/ProfileAdmin">
                <i className="fas fa-user fa-sm fa-fw mr-2 text-gray-400"></i> Profile
              </Link>
              <Link className="dropdown-item" to="#">
                <i className="fas fa-cogs fa-sm fa-fw mr-2 text-gray-400"></i> Settings
              </Link>
              <Link className="dropdown-item" to="#">
                <i className="fas fa-list fa-sm fa-fw mr-2 text-gray-400"></i> Activity Log
              </Link>
              <div className="dropdown-divider"></div>
              <button className="dropdown-item" onClick={handleClickDangXuat}>
                <i className="fas fa-sign-out-alt fa-sm fa-fw mr-2 text-gray-400"></i> Logout
              </button>
            </div>
          </li>
        </ul>
      </nav>

      {/* Modal xác nhận đăng xuất */}
      {showModal && (
        <div className="modal fade show d-block" tabIndex="-1" role="dialog" aria-labelledby="logoutModalLabel" aria-hidden="true">
          <div className="modal-dialog" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id="logoutModalLabel">Xác nhận đăng xuất</h5>
                <button type="button" className="btn-close" onClick={handleDongModla} aria-label="Close"></button>
              </div>
              <div className="modal-body">Bạn có chắc muốn đăng xuất khỏi giao diện admin chứ?</div>
              <div className="modal-footer">
                <button type="button" className="btn btn-secondary" onClick={handleDongModla}>Thoát</button>
                <button type="button" className="btn btn-danger" onClick={handleXacNhanDangXuatTaiKhoan}>Xác nhận</button>
              </div>
            </div>
          </div>
        </div>
      )}
      {showModal && <div className="modal-backdrop fade show"></div>}
    </>
  );
};

export default HeaderAdmin;
