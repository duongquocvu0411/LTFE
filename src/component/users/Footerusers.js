import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const Footerusers = () => {
  const [chiTietDiaChi, setChiTietDiaChi] = useState({ diaChi: '', email: '', sdt: '' });

  // Gọi API
  useEffect(() => {
    layThongTinDiaChi();
  }, []);

  // Hàm gọi API lấy thông tin địa chỉ chi tiết
  const layThongTinDiaChi = async () => {
    try {
      const response = await axios.get('http://127.0.0.1:8000/api/diachichitiet');

      if (response.data && response.data.length > 0) {
        setChiTietDiaChi({
          diaChi: response.data[0].diachi,
          email: response.data[0].email,
          sdt: response.data[0].sdt,
        });
      }
    } catch (err) {
      console.log('Lỗi khi lấy thông tin từ API:', err);
    }
  };

  return (
    <>
      {/* Footer Starts */}
      <div className="container-fluid bg-dark text-white-50 footer pt-5 mt-5">
        <div className="container py-5">
          <div className="pb-4 mb-4" style={{ borderBottom: '1px solid rgba(226, 175, 24, 0.5)' }}>
            <div className="row g-4">
              <div className="col-lg-3">
                <span className="title">
                  <p className="text-primary mb-0 h1 ">Fruitables</p>
                  <p className="text-secondary mb-0 h4">Fresh products</p>
                </span>
              </div>
              <div className="col-lg-3">
                <div className="d-flex justify-content-end pt-3">
                  <Link className="btn btn-outline-secondary me-2 btn-md-square rounded-circle" to="/"><i className="fab fa-twitter" /></Link>
                  <Link className="btn btn-outline-secondary me-2 btn-md-square rounded-circle" to="/"><i className="fab fa-facebook-f" /></Link>
                  <Link className="btn btn-outline-secondary me-2 btn-md-square rounded-circle" to="/"><i className="fab fa-youtube" /></Link>
                  <Link className="btn btn-outline-secondary btn-md-square rounded-circle" to="/"><i className="fab fa-linkedin-in" /></Link>
                </div>
              </div>
            </div>
          </div>
          <div className="row g-5">
            <div className="col-lg-3 col-md-6">
              <div className="footer-item">
                <h4 className="text-light mb-3">Why People Like us!</h4>
                <p className="mb-4">typesetting, remaining essentially unchanged. It was popularised in the 1960s with the like Aldus PageMaker including of Lorem Ipsum.</p>
                <span className="btn border-secondary py-2 px-4 rounded-pill text-primary">Read More</span>
              </div>
            </div>
            <div className="col-lg-3 col-md-6">
              <div className="d-flex flex-column text-start footer-item">
                <h4 className="text-light mb-3">Shop Info</h4>
                <Link className="btn-link" to="/">About Us</Link>
                <Link className="btn-link" to="/">Contact Us</Link>
                <Link className="btn-link" to="/">Privacy Policy</Link>
                <Link className="btn-link" to="/">Terms &amp; Condition</Link>
                <Link className="btn-link" to="/">Return Policy</Link>
                <Link className="btn-link" to="/">FAQs &amp; Help</Link>
              </div>
            </div>
            <div className="col-lg-3 col-md-6">
              <div className="d-flex flex-column text-start footer-item">
                <h4 className="text-light mb-3">Account</h4>
                <Link className="btn-link" to="/">My Account</Link>
                <Link className="btn-link" to="/">Shop details</Link>
                <Link className="btn-link" to="/">Shopping Cart</Link>
                <Link className="btn-link" to="/">Wishlist</Link>
                <Link className="btn-link" to="/">Order History</Link>
                <Link className="btn-link" to="/">International Orders</Link>
              </div>
            </div>
            <div className="col-lg-3 col-md-6">
              <div className="footer-item">
                <h4 className="text-light mb-3">Contact</h4>
                <p>
                  Address:
                  <Link
                    to="#"
                    onClick={() => window.open(`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(chiTietDiaChi.diachi)}`, '_blank')}
                    className="text-decoration-none "
                  >
                    {chiTietDiaChi.diachi}
                  </Link>
                </p>
                <p>
                  Email: {chiTietDiaChi.email}
                  <Link
                    className="btn border-secondary rounded-pill text-primary"
                    to={`mailto:${chiTietDiaChi.email}`}
                  >
                    gửi ngay
                  </Link>
                </p>
                <p>
                  Phone: {chiTietDiaChi.sdt}
                  <Link
                    className="btn border-secondary rounded-pill text-primary"
                    to={`tel:${chiTietDiaChi.sdt}`}
                  >
                    Gọi Ngay
                  </Link>
                </p>
                <p>Payment Accepted</p>
                <img
                  src={`${process.env.PUBLIC_URL}/img/payment.png`}
                  className="img-fluid"
                  alt="Payment methods"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Footer End */}
      {/* Copyright Start */}
      <div className="container-fluid copyright bg-dark py-4">
        <div className="container">
          <div className="row">
            <div className="col-md-6 text-center text-md-start mb-3 mb-md-0">
              <span className="text-light"><Link to="/" className="text-decoration-none"><i className="fas fa-copyright text-light me-2" />Khóa k22</Link>, All right reserved.</span>
            </div>
            <div className="col-md-6 my-auto text-center text-md-end text-white">
              Designed By <Link className="border-bottom text-decoration-none" to="https://htmlcodex.com">HTML Codex</Link> Distributed By <Link className="border-bottom text-decoration-none" to="https://themewagon.com">ThemeWagon</Link>
            </div>
          </div>
        </div>
      </div>
      {/* Copyright End */}
    </>
  );
}

export default Footerusers;
