import React, { useContext } from "react";
import Footerusers from "../Footerusers";
import HeaderUsers from "../HeaderUsers";
import { CartContext } from "./CartContext";
import { Link } from "react-router-dom";

const Cart = () => {
  const { giohang, XoaGioHang, TangSoLuong, GiamSoLuong, CapnhatSoLuong } = useContext(CartContext);

  // Tính tổng giá trị của giỏ hàng
  const tongTienGioHang = giohang.reduce((tong, item) => tong + item.price * item.soLuong, 0);

  return (
    <>
      <div>
        <HeaderUsers />
        {/* Single Page Header start */}
        <div className="container-fluid page-header py-5">
          <h1 className="text-center text-white display-6">Cart</h1>
          <ol className="breadcrumb justify-content-center mb-0">
            <li className="breadcrumb-item"><a href="#">Home</a></li>
            <li className="breadcrumb-item"><a href="#">Pages</a></li>
            <li className="breadcrumb-item active text-white">Cart</li>
          </ol>
        </div>
        {/* Single Page Header End */}
        {/* Cart Page Start */}
        <div className="container-fluid py-5">
          <div className="container py-5">
            <div className="table-responsive">
              <table className="table align-middle">
                <thead>
                  <tr>
                    <th scope="col">Products</th>
                    <th scope="col">Name</th>
                    <th scope="col">Price</th>
                    <th scope="col">Quantity</th>
                    <th scope="col">Total</th>
                    <th scope="col">Handle</th>
                  </tr>
                </thead>
                <tbody>
                  {giohang && giohang.length > 0 ? (
                    giohang.map((sanPham, index) => (
                      <tr key={index}>
                        <td>
                          <img
                            src={`http://127.0.0.1:8000/storage/${sanPham.image}`}
                            className="img-fluid rounded"
                            style={{ width: "60px", height: "60px" }}
                            alt={sanPham.title}
                          />
                        </td>
                        <td>{sanPham.title}</td>
                        <td>${sanPham.price}</td>
                        <td> 
                          <div className="d-flex">
                            <button 
                              className="btn btn-warning btn-sm" 
                              onClick={() => GiamSoLuong(sanPham.id)}
                            >
                              <i className="fa fa-minus"></i>
                            </button>
                            <input 
                              type="number" 
                              className="form-control text-center mx-2" 
                              value={sanPham.soLuong || 1}  // Đảm bảo hiển thị giá trị hợp lệ
                              min="1"
                              onChange={(e) => CapnhatSoLuong(sanPham.id, e.target.value)}
                              style={{ width: '60px', minWidth: '50px' }}  // Đặt chiều rộng tối thiểu
                            />
                            <button 
                              className="btn btn-warning btn-sm" 
                              onClick={() => TangSoLuong(sanPham.id)}
                            >
                              <i className="fa fa-plus"></i>
                            </button>
                          </div>
                        </td>
                        <td>${sanPham.price * sanPham.soLuong}</td>
                        <td>
                          <button className="btn btn-danger btn-sm" onClick={() => XoaGioHang(sanPham.id)}>
                            <i className="bi bi-trash3-fill"></i>
                          </button>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="6" className="text-center">Giỏ hàng của bạn trống</td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
            <div className="row g-4 justify-content-end">
              <div className="col-sm-8 col-md-7 col-lg-6 col-xl-4">
                <div className="bg-light rounded">
                  <div className="p-4">
                    <h1 className="display-6 mb-4">
                      Tổng <span className="fw-normal">Giỏ hàng</span>
                    </h1>
                    <div className="d-flex justify-content-between mb-4">
                      <h5 className="mb-0 me-4">Tổng cộng:</h5>
                      <p className="mb-0">${tongTienGioHang}</p>
                    </div>
                  </div>
                  <div className="py-4 mb-4 border-top border-bottom d-flex justify-content-between">
                    <h5 className="mb-0 ps-4 me-4">Tổng</h5>
                    <p className="mb-0 pe-4">${tongTienGioHang}</p>
                  </div>
                  <Link to="/checkout" className="btn btn-primary btn-sm w-100 text-uppercase mb-4" >
                    Thanh toán
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footerusers />
    </>
  );
};

export default Cart;
