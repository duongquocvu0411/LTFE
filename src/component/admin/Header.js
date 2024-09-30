import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Header = () => {
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate(); // Sử dụng useNavigate để điều hướng

  // Hiển thị modal xác nhận đăng xuất
  const handleLogoutClick = () => {
    setShowModal(true);
  };

  // Xác nhận đăng xuất
  const handleConfirmLogout = () => {
    // Xóa trạng thái đăng nhập khỏi localStorage
    localStorage.removeItem('isAdminLoggedIn');

    // Ẩn modal xác nhận đăng xuất
    setShowModal(false);

    // Điều hướng đến trang đăng nhập
    navigate('/admin/Login');
  };

  // Đóng modal xác nhận đăng xuất
  const handleCloseModal = () => {
    setShowModal(false);
  };

  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-light bg-light h-25">
        <Link className="navbar-brand" to="/admin/Dashboard">AdminLTE</Link>

        {/* Button for mobile menu */}
        <button 
          className="navbar-toggler" 
          type="button" 
          data-bs-toggle="collapse" 
          data-bs-target="#navbarNav" 
          aria-controls="navbarNav" 
          aria-expanded="false" 
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ml-auto">
            <li className="nav-item">
              <Link className="nav-link" to="/admin/ProfileAdmin">Profile</Link>
            </li>
          </ul>

          {/* Logout Button */}
          <div className="ml-auto d-flex align-items-end flex-column w-100">
            <ul className="navbar-nav mt-auto">
              <li className="nav-item">
                <button className='nav-link btn btn-link' onClick={handleLogoutClick}>Logout</button>
              </li>
            </ul>
          </div>
        </div>
      </nav>

      {/* Modal xác nhận đăng xuất */}
      {showModal && (
        <div className="modal fade show d-block" tabIndex="-1" role="dialog" aria-labelledby="logoutModalLabel" aria-hidden="true">
          <div className="modal-dialog" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id="logoutModalLabel">Xác nhận đăng xuất</h5>
                <button type="button" className="btn-close" onClick={handleCloseModal} aria-label="Close"></button>
              </div>
              <div className="modal-body">
                Bạn có chắc muốn đăng xuất khỏi giao diện admin chứ?
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-secondary" onClick={handleCloseModal}>Thoát</button>
                <button type="button" className="btn btn-danger" onClick={handleConfirmLogout}>Xác nhận</button>
              </div>
            </div>
          </div>
        </div>
      )}
      {showModal && <div className="modal-backdrop fade show"></div>}
    </>
  );
};

export default Header;
