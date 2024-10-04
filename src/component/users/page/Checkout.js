import React, { useContext, useState } from "react";
import Footerusers from "../Footerusers";
import HeaderUsers from "../HeaderUsers";
import { CartContext } from "./CartContext";
import { Link } from "react-router-dom";
import axios from "axios"; // Import axios

const Checkout = () => {
  const [thanhpho, setThanhpho] = useState("");
  const { giohang, clearCart } = useContext(CartContext);
  const [sdt, setSdt] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [address, setAddress] = useState("");
  const [email, setEmail] = useState("");
  const [ghichu, setGhichu] = useState("");
  const [orderCode, setOrderCode] = useState(""); 

  // Hàm xử lý khi nhập số điện thoại
  const handleInput = (e) => {
    const newSdt = e.target.value.replace(/[^0-9]/g, "");
    setSdt(newSdt);
  };

  // Hàm xử lý khi chọn thành phố
  const handleChonthanhpho = (e) => {
    setThanhpho(e.target.value);
  };

  // Tính tổng giá trị của giỏ hàng
  const tongTienGioHang = giohang.reduce(
    (tong, item) => tong + item.price * item.soLuong,
    0
  );

  // Hàm xử lý khi nhấn "Place Order"
  const handlePlaceOrder = async (e) => {
    e.preventDefault();
    // Kiểm tra giỏ hàng có trống không
    if (giohang.length === 0) {
      alert("Giỏ hàng của bạn đang trống. Không thể thanh toán!");
      return; // Dừng hàm nếu giỏ hàng trống
    }

    // Thu thập dữ liệu từ form
    const khachhangData = {
      ten: firstName,
      ho: lastName,
      diachicuthe: address,
      thanhpho: thanhpho,
      sdt: sdt,
      Emaildiachi: email,
      ghichu: ghichu,
    };

    try {
      // Bước 1: Gửi thông tin khách hàng đến API khachhangs
      const khachhangResponse = await axios.post(
        "http://127.0.0.1:8000/api/khachhangs",
        khachhangData
      );

      // Lấy ID của khách hàng mới được tạo
      const khachhangId = khachhangResponse.data.id;

      // Bước 2: Gửi thông tin bill đến API bills, bao gồm danh sách sanpham_ids
      const billData = {
        khachhang_id: khachhangId,
        total_price: tongTienGioHang,
        sanpham_ids: giohang.map((sanpham) => sanpham.id),
        quantity: giohang.map((sanpham) => sanpham.soLuong),
      };

      const billResponse = await axios.post(
        "http://127.0.0.1:8000/api/bills",
        billData
      );

      // Lưu mã đơn hàng vào state sau khi đặt hàng thành công
      const newOrderCode = billResponse.data.order_code;
      setOrderCode(newOrderCode);

      // Sau khi thành công
      alert("Đặt hàng thành công!");
      clearCart(); // Xóa giỏ hàng sau khi đặt hàng thành công
      // Làm sạch dữ liệu trong form
      setFirstName("");
      setLastName("");
      setAddress("");
      setThanhpho("");
      setSdt("");
      setEmail("");
      setGhichu("");
    } catch (error) {
      console.error("Lỗi khi gửi đơn hàng:", error);
      alert("Đã xảy ra lỗi khi gửi đơn hàng.");
    }
  };

  return (
    <>
      <div>
        <HeaderUsers />
        <div className="container-fluid page-header py-5">
          <h1 className="text-center text-white display-6">Checkout</h1>
          <ol className="breadcrumb justify-content-center mb-0">
            <li className="breadcrumb-item">
              <Link to="/">Home</Link>
            </li>
            <li className="breadcrumb-item">
              <Link to="/">Pages</Link>
            </li>
            <li className="breadcrumb-item active text-white">Checkout</li>
          </ol>
        </div>
        <div className="container-fluid py-5">
          <div className="container py-5">
            <h1 className="mb-4">Billing details</h1>
             {/* Thông báo mã đơn hàng */}
          {orderCode && (
            <div className="alert alert-success" role="alert">
              Đặt hàng thành công! Mã đơn hàng của bạn: <strong>{orderCode}</strong> vui lòng ghi nhớ mã đơn hàng giúp shop
            </div>
          )}
            {/* from post api */}
            <form onSubmit={handlePlaceOrder}>
              <div className="row g-5">
                <div className="col-md-12 col-lg-6 col-xl-7">
                  <div className="row">
                    <div className="col-md-12 col-lg-6">
                      <div className="form-item w-100">
                        <label className="form-label my-3">
                          First Name<sup>*</sup>
                        </label>
                        <input
                          type="text"
                          className="form-control"
                          required
                          value={firstName}
                          onChange={(e) => setFirstName(e.target.value)}
                        />
                      </div>
                    </div>
                    <div className="col-md-12 col-lg-6">
                      <div className="form-item w-100">
                        <label className="form-label my-3">
                          Last Name<sup>*</sup>
                        </label>
                        <input
                          type="text"
                          className="form-control"
                          required
                          value={lastName}
                          onChange={(e) => setLastName(e.target.value)}
                        />
                      </div>
                    </div>
                  </div>
                  <div className="form-item">
                    <label className="form-label my-3">
                      Address <sup>*</sup>
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="House Number Street Name"
                      required
                      value={address}
                      onChange={(e) => setAddress(e.target.value)}
                    />
                  </div>
                  <div className="form-item">
                    <label className="form-label my-3">
                      Town/City<sup>*</sup>
                    </label>
                    <select
                      className="form-control"
                      value={thanhpho}
                      onChange={handleChonthanhpho}
                      required
                    >
                      <option value="" disabled>
                        Select your town/city
                      </option>
                      <option value="Hà Nội">Hà Nội</option>
                      <option value="Hồ Chí Minh">Hồ Chí Minh</option>
                      {/* Thêm các thành phố khác */}
                    </select>
                  </div>
                  <div className="form-item">
                    <label className="form-label my-3">
                      Mobile<sup>*</sup>
                    </label>
                    <input
                      type="tel"
                      className="form-control"
                      value={sdt}
                      onInput={handleInput}
                      placeholder="nhập số điện thoại của bạn vào đây"
                      required
                    />
                  </div>
                  <div className="form-item">
                    <label className="form-label my-3">
                      Email Address<sup>*</sup>
                    </label>
                    <input
                      type="email"
                      className="form-control"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </div>
                  <div className="form-item">
                    <label className="form-label my-3">
                      Order Notes (Optional)
                    </label>
                    <textarea
                      className="form-control"
                      rows="4"
                      value={ghichu}
                      onChange={(e) => setGhichu(e.target.value)}
                      placeholder="Any additional notes..."
                    />
                  </div>
                </div>
                {/* product */}
                <div className="col-md-12 col-lg-6 col-xl-5">
                  <div className="table-responsive">
                    <table className="table">
                      <thead>
                        <tr>
                          <th scope="col">Products</th>
                          <th scope="col">Name</th>
                          <th scope="col">Price</th>
                          <th scope="col">Quantity</th>
                          <th scope="col">Total</th>
                        </tr>
                      </thead>
                      <tbody>
                        {giohang && giohang.length > 0 ? (
                          giohang.map((sanPham, index) => (
                            <tr key={index}>
                              <th scope="row">
                                <div className="d-flex align-items-center mt-2">
                                  <img
                                    src={`http://127.0.0.1:8000/storage/${sanPham.image}`}
                                    className="img-fluid rounded-circle"
                                    style={{ width: 90, height: 90 }}
                                    alt={sanPham.title}
                                  />
                                </div>
                              </th>
                              <td className="py-5">{sanPham.title}</td>
                              <td className="py-5">{sanPham.price}VND</td>
                              <td className="py-5">{sanPham.soLuong}</td>
                              <td className="py-5">
                                {sanPham.price * sanPham.soLuong}VND
                              </td>
                            </tr>
                          ))
                        ) : (
                          <tr>
                            <td colSpan="5" className="text-center">
                              Giỏ hàng của bạn trống
                            </td>
                          </tr>
                        )}
                        <tr>
                          <td colSpan="4" className="text-right fw-bold">
                            Tổng cộng:
                          </td>
                          <td className="py-5"> {tongTienGioHang}VND</td>
                        </tr>
                      </tbody>
                    </table>
                    <button
                      type="submit"
                      className="btn border-secondary py-3 px-4 text-uppercase w-100 text-primary"
                    >
                      Place Order
                    </button>
                  </div>
                </div>
              </div>

            </form>
          </div>
        </div>
        <Footerusers />
      </div>
    </>
  );
};

export default Checkout;
