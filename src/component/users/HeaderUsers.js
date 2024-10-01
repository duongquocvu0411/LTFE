import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { CartContext } from './page/CartContext';
import  axios  from 'axios';
const HeaderUsers = () => {
  
  const [diachichitiet,setDiachichitiet] = useState({diachi: ' ' ,email: ''});

  const { giohang } = useContext(CartContext);  // sử dụng CartContext để lấy dữ liệu giỏ hàng

  // tính tổng số lượng sản phẩm hiện có trong giỏ hàng
  const tongSoLuong = giohang.reduce((tong, sanPham) => tong + sanPham.soLuong, 0);

  // gọi api
  useEffect(() => {
    fetchDiaChiChiTiet();
  },[])
  // khai báo api diachichitiets
   const fetchDiaChiChiTiet = async () => {
    try{
      const response = await axios.get('http://127.0.0.1:8000/api/diachichitiet');
      
      if(response.data && response.data.length > 0){
        setDiachichitiet({
          diachi: response.data[0].diachi,
          email: response.data[0].email,
        });
      }
    }
    catch(err) {
      console.log('lỗi khi lấy thông tin từ API:', err);
    }
   };
    return (
        <>
         {/* Navbar starts */}
<div className="container-fluid fixed-top">
  <div className="container topbar bg-primary d-none d-lg-block">
    <div className="d-flex justify-content-between">
      <div className="top-info ps-2">
        <small className="me-3">
          <i className="fas fa-map-marker-alt me-2 text-secondary" /> 
            {diachichitiet.diachi}
        </small>
        <small className="me-3">
          <i className="fas fa-envelope me-2 text-secondary" />
            {diachichitiet.email}
        </small>
      </div>
      <div className="top-link pe-2">
        <Link to="#" className="text-white text-decoration-none"><small className="text-white mx-2 ">Privacy Policy</small>/</Link>
        <Link to="#" className="text-white text-decoration-none"><small className="text-white mx-2">Terms of Use</small>/</Link>
        <Link to="#" className="text-white text-decoration-none"><small className="text-white ms-2">Sales and Refunds</small></Link>
      </div>
    </div>  
  </div>
  <div className="container px-0">
    <nav className="navbar navbar-light bg-white navbar-expand-xl">
      <Link to="/" className="navbar-brand"><h1 className="text-primary display-6">Fruitables</h1></Link>
      <button className="navbar-toggler py-2 px-3" type="button" data-bs-toggle="collapse" data-bs-target="#navbarCollapse">
        <span className="fa fa-bars text-primary" />
      </button>
      <div className="collapse navbar-collapse bg-white" id="navbarCollapse">
        <div className="navbar-nav mx-auto">
          <Link to="/" className="nav-item nav-link active">Home</Link>
          <Link to="/shop" className="nav-item nav-link">Shop</Link>

          <Link to="/Shop-detail" className="nav-item nav-link">Shop Detail</Link>
          <div className="nav-item dropdown">
            <Link to="#" className="nav-link dropdown-toggle" data-bs-toggle="dropdown">Pages</Link>
            <div className="dropdown-menu m-0 bg-secondary rounded-0">
              <Link to="/cart" className="dropdown-item">Cart</Link>
              <Link to="/checkout" className="dropdown-item">Checkout</Link>
              <Link to="/Testimonial" className="dropdown-item">Testimonial</Link>
              {/* <Link to="/page404" className="dropdown-item">404 Page</Link> */}
            </div>
          </div>
          <Link to="/lienhe" className="nav-item nav-link">Contact</Link>
          {/* <Link to="/admin/dashboard" className='nav-item nav-link'> <sup>Admin</sup></Link> */}
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
    )
}
    export default HeaderUsers;