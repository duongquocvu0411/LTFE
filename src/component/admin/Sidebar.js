import React from "react";
import { Link } from "react-router-dom";

const Sidebar = () => {
  return (
    <>
      <div className="d-flex siderbar flex-column bg-dark">
        <div className="row flex-nowrap">
          <div className="col-auto col-md-3 col-xl-2 px-sm-2 px-0 bg-dark">
            <div className="d-flex flex-column align-items-center align-items-sm-start px-3 pt-2 text-white min-vh-100">
              <a href="/" className="d-flex align-items-center pb-3 mb-md-0 me-md-auto text-white text-decoration-none">
                <span className="fs-5 d-none d-sm-inline">Menu</span>
              </a>
              <ul className="nav nav-pills flex-column mb-sm-auto mb-0 align-items-center align-items-sm-start" id="menu">
                <li className="nav-item">
                  <Link to="/admin/Dashboard" className="nav-link align-middle px-0 d-flex align-items-center">
                    <i className="fs-4 bi bi-house" />
                    <span className="ms-2 d-none d-sm-inline">Home</span>
                  </Link>
                </li>
                <li className="nav-item">
                  <Link to="/admin/diachichitiet" className="nav-link align-middle px-0 d-flex align-items-center">
                    <i className="bi bi-geo-alt-fill" />
                    <span className="ms-2 d-none d-sm-inline">Địa Chỉ Admin</span>
                  </Link>
                </li>
                <li className="nav-item">
                  <Link to="/admin/sanpham" className="nav-link align-middle px-0 d-flex align-items-center">
                    <i className="bi bi-bag fs-4" />
                    <span className="ms-2 d-none d-sm-inline">Sản Phẩm</span>
                  </Link>
                </li>
                <li className="nav-item">
                  <Link to="/admin/danhmucsanpham" className="nav-link align-middle px-0 d-flex align-items-center">
                    <i className="bi bi-list fs-4" />
                    <span className="ms-2 d-none d-sm-inline">Danh mục</span>
                  </Link>
                </li>
                <li className="nav-item">
                  <Link to="/admin/lienhe" className="nav-link align-middle px-0 d-flex align-items-center">
                    <i className="bi bi-telephone-fill" />
                    <span className="ms-2 d-none d-sm-inline">Liên Hệ</span>
                  </Link>
                </li>
                <li className="nav-item">
                  <Link to="/admin/khachhang" className="nav-link align-middle px-0 d-flex align-items-center">
                    <i className="bi bi-telephone-fill" />
                    <span className="ms-2 d-none d-sm-inline">Khách hàng</span>
                  </Link>
                </li>
              </ul>
              <hr />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
