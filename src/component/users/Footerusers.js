import axios from "axios";
import React, { useEffect, useState } from "react";
const Footerusers = () => {
  const[diachichitiet,setDiaChiChiTiet] =useState({diachi:'', email:'',sdt: '' })

  //goi api 
  useEffect(() => {
    fetchDiachichitiet()
  },[]);
  // khai báo api diachichitiet

  const fetchDiachichitiet = async () =>{
    try{
      const response = await axios.get('http://127.0.0.1:8000/api/diachichitiet');

      if(response.data && response.data.length >0){
        setDiaChiChiTiet({
          diachi: response.data[0].diachi,
          email: response.data[0].email,
          sdt: response.data[0].sdt,
        });
      }
    }
    catch(err){
      console.log('lỗi khi lấy thông tin từ api:',err);
    }
  };
    return (

        <>
        {/* Footer Starts */}
  <div className="container-fluid bg-dark text-white-50 footer pt-5 mt-5">
    <div className="container py-5">
      <div className="pb-4 mb-4" style={{borderBottom: '1px solid rgba(226, 175, 24, 0.5)'}}>
        <div className="row g-4">
          <div className="col-lg-3">
            <span  className="title">
              <p className="text-primary mb-0 h1 ">Fruitables</p>
              <p className="text-secondary mb-0 h4">Fresh products</p>
            </span>
          </div>
          <div className="col-lg-3">
            <div className="d-flex justify-content-end pt-3">
              <a className="btn  btn-outline-secondary me-2 btn-md-square rounded-circle" href><i className="fab fa-twitter" /></a>
              <a className="btn btn-outline-secondary me-2 btn-md-square rounded-circle" href><i className="fab fa-facebook-f" /></a>
              <a className="btn btn-outline-secondary me-2 btn-md-square rounded-circle" href><i className="fab fa-youtube" /></a>
              <a className="btn btn-outline-secondary btn-md-square rounded-circle" href><i className="fab fa-linkedin-in" /></a>
            </div>
          </div>
        </div>
      </div>
      <div className="row g-5">
        <div className="col-lg-3 col-md-6">
          <div className="footer-item">
            <h4 className="text-light mb-3">Why People Like us!</h4>
            <p className="mb-4">typesetting, remaining essentially unchanged. It was 
              popularised in the 1960s with the like Aldus PageMaker including of Lorem Ipsum.</p>
            <span className="btn border-secondary py-2 px-4 rounded-pill text-primary">Read More</span>
          </div>
        </div>
        <div className="col-lg-3 col-md-6">
          <div className="d-flex flex-column text-start footer-item">
            <h4 className="text-light mb-3">Shop Info</h4>
            <a className="btn-link" href>About Us</a>
            <a className="btn-link" href>Contact Us</a>
            <a className="btn-link" href>Privacy Policy</a>
            <a className="btn-link" href>Terms &amp; Condition</a>
            <a className="btn-link" href>Return Policy</a>
            <a className="btn-link" href>FAQs &amp; Help</a>
          </div>
        </div>
        <div className="col-lg-3 col-md-6">
          <div className="d-flex flex-column text-start footer-item">
            <h4 className="text-light mb-3">Account</h4>
            <a className="btn-link" href>My Account</a>
            <a className="btn-link" href>Shop details</a>
            <a className="btn-link" href>Shopping Cart</a>
            <a className="btn-link" href>Wishlist</a>
            <a className="btn-link" href>Order History</a>
            <a className="btn-link" href>International Orders</a>
          </div>
        </div>
        <div className="col-lg-3 col-md-6">
          <div className="footer-item">
            <h4 className="text-light mb-3">Contact</h4>
            <p>Address: 1429 Netus Rd, NY 48247</p>
            <p>
                Email: {diachichitiet.email} 
                <a 
                  className="btn border-secondary rounded-pill text-primary" 
                  href={`mailto:${diachichitiet.email}`}
                >
                  gửi ngay
                </a>
            </p>
            <p>
              Phone: {diachichitiet.sdt}
              <a
                className="btn border-secondary rounded-pill text-primary"
                href={`tel:${diachichitiet.sdt}`}
                >
                  Gọi Ngay
                </a>
            </p>
            <p>Payment Accepted</p>
            <img src="img/payment.png" className="img-fluid" alt />
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
          <span className="text-light"><a href="#"className="text-decoration-none" ><i className="fas fa-copyright text-light me-2" />Khóa k22</a>, All right reserved.</span>
        </div>
        <div className="col-md-6 my-auto text-center text-md-end text-white">
         
          Designed By <a className="border-bottom text-decoration-none" href="https://htmlcodex.com">HTML Codex</a> Distributed By <a className="border-bottom text-decoration-none" href="https://themewagon.com">ThemeWagon</a>
        </div>
      </div>
    </div>
  </div>
  {/* Copyright End */}
        </>
    )
}
export default Footerusers;
