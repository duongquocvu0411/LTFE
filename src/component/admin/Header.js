import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Header = () => {
  // Một useStatehook được sử dụng để quản lý khả năng hiển thị của phương thức ( showModal).
  const [showModal, setShowModal]= useState(false);

  // chức năng gọi from xác nhận
  const handleLogoutClick = () => {
    setShowModal(true);
  }

  const handleConfirmLogout = () => {
    // xác nhận đăng xuất
    setShowModal(false);
    window.location.href = '/';
  }

  const handleCloseModal = () => {
    setShowModal(false);
  }

  //Một modal Bootstrap được hiển thị có điều kiện khi showModallà true. Modal yêu cầu xác nhận để đăng xuất.
  //Nếu người dùng nhấp vào "Đăng xuất", handleConfirmLogoutlệnh sẽ được thực hiện và người dùng sẽ được chuyển hướng đến /logouttuyến đường.
  //Nếu người dùng nhấp vào "Hủy", hộp thoại sẽ đóng lại bằng cách đặt showModalthành false.
  return (
    <>
    <nav className="navbar navbar-expand-lg navbar-light bg-light h-25">
      <a className="navbar-brand" href="admin/Dashboard">AdminLTE</a>

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
            <Link className="nav-link" to="/profile">Profile</Link>
          </li>
          
        </ul>

        {/* Logout Button positioned at the bottom right corner */}
        <div className="ml-auto d-flex align-items-end flex-column w-100">
          <ul className="navbar-nav mt-auto">
            <li className="nav-item">
             <button className='nav-link btn btn-link' onClick={handleLogoutClick}>Logout</button>
            </li>
          </ul>
        </div>
      </div>
    </nav>

    {/* from modale */}
    {showModal && (
        <div className="modal fade show d-block " tabIndex="-1" role="dialog" aria-labelledby="logoutModalLabel" aria-hidden="true">
          <div className="modal-dialog" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id="logoutModalLabel">Xác nhận đăng xuất</h5>
                <button type="button" className="btn-close" onClick={handleCloseModal} aria-label="Close"></button>
              </div>
              <div className="modal-body">
               Bạn có chắc muốn đăng xuất khỏi giao diện admin chứ ?
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
