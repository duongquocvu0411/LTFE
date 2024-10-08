import React, { useContext, useState } from "react";
import Footerusers from "../Footerusers";
import HeaderUsers from "../HeaderUsers";
import { CartContext } from "./CartContext";
import axios from "axios"; // Import axios
import { toast, ToastContainer } from 'react-toastify';

const Thanhtoan = () => {
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
  let newSdt = e.target.value.replace(/[^0-9]/g, "");

  // Giới hạn số điện thoại tối đa 11 chữ số
  if (newSdt.length > 11) {
      newSdt = newSdt.slice(0, 11);
  }

  setSdt(newSdt);
};


  // Hàm xử lý khi chọn thành phố
  const handleChonthanhpho = (e) => {
    setThanhpho(e.target.value);
  };

  // Tính tổng giá trị của giỏ hàng
  // const tongTienGioHang = giohang.reduce(
  //   (tong, item) => tong + item.price * item.soLuong,
  //   0
  // );
  const tongTienGioHang = giohang.reduce((tong, item) => tong + parseFloat(item.price) * item.soLuong, 0);

  // Hàm xử lý khi nhấn "Place Order"
  const handlePlaceOrder = async (e) => {
    e.preventDefault();

    // Kiểm tra giỏ hàng có trống không
    if (giohang.length === 0) {
      toast.error("Giỏ hàng của bạn đang trống. Không thể thanh toán!", {
        position: "top-right",
        autoClose: 5000,
      });
      return; // Dừng hàm nếu giỏ hàng trống
    }
    // Kiểm tra các trường dữ liệu
    if (!firstName) {
      toast.error("Vui lòng không bỏ trống Tên!", {
          position: "top-right",
          autoClose: 5000,
      });
      return; // Dừng hàm nếu trường firstName bị bỏ trống
  }
  
  if (!lastName) {
      toast.error("Vui lòng không bỏ trống Họ!", {
          position: "top-right",
          autoClose: 5000,
      });
      return; // Dừng hàm nếu trường lastName bị bỏ trống
  }
  
  if (!address) {
      toast.error("Vui lòng không bỏ trống Địa chỉ!", {
          position: "top-right",
          autoClose: 5000,
      });
      return; // Dừng hàm nếu trường address bị bỏ trống
  }

      // Kiểm tra số điện thoại
      if (sdt.length < 10 || sdt.length > 11) {
        toast.error("Số điện thoại phải từ 10 đến 11 chữ số!", {
            position: "top-right",
            autoClose: 5000,
        });
        return; // Dừng hàm nếu số điện thoại không hợp lệ
      }

  if (!thanhpho) {
      toast.error("Vui lòng chọn Thành phố!", {
          position: "top-right",
          autoClose: 5000,
      });
      return; // Dừng hàm nếu trường thành phố bị bỏ trống
  }

  if (!email) {
      toast.error("Vui lòng không bỏ trống Email!", {
          position: "top-right",
          autoClose: 5000,
      });
      return; // Dừng hàm nếu trường email bị bỏ trống
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
        `${process.env.REACT_APP_BASEURL}/api/khachhangs`,
        khachhangData
      );

      // Lấy ID của khách hàng mới được tạo
      const khachhangId = khachhangResponse.data.id;

      // Bước 2: Gửi thông tin bill đến API bills, bao gồm danh sách sanpham_ids và số lượng
      const billData = {
        khachhang_id: khachhangId,
        total_price: tongTienGioHang,
        sanpham_ids: giohang.map((sanpham) => sanpham.id),
        quantity: giohang.map((sanpham) => sanpham.soLuong),
      };

      const billResponse = await axios.post(
        `${process.env.REACT_APP_BASEURL}/api/bills`,
        billData
      );

      // Lưu mã đơn hàng vào state sau khi đặt hàng thành công
      const newOrderCode = billResponse.data.order_code;
      setOrderCode(newOrderCode);

      // Sau khi thành công
      toast.success(`đặt hàng thành công! Mã đơn hàng của bạn: ${newOrderCode}`,{
        position:"top-right",
        autoClose:10000,
      })
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
      toast.error("Đã xảy ra lỗi khi gữi đơn hàng vui lòng thử lại sau.",{
        position: "top-right",
        autoClose:10000,
      })
    }
  };

  return (
    <>
      <div>
        <HeaderUsers />
        <div className="container-fluid page-header py-5">
          <h1 className="text-center text-white display-6">Checkout</h1>
          {/* <ol className="breadcrumb justify-content-center mb-0">
            <li className="breadcrumb-item">
              <Link to="/">Home</Link>
            </li>
            <li className="breadcrumb-item">
              <Link to="/">Pages</Link>
            </li>
            <li className="breadcrumb-item active text-white">Checkout</li>
          </ol> */}
        </div>
        <div className="container-fluid py-5">
          <div className="container py-5">
            <h1 className="mb-4">Chi tiết thanh toán</h1>
             {/* Thông báo mã đơn hàng */}
         
            {/* from post api */}
            <form onSubmit={handlePlaceOrder}>
              <div className="row g-5">
                <div className="col-md-12 col-lg-6 col-xl-7">
                  <div className="row">
                    <div className="col-md-12 col-lg-6">
                      <div className="form-item w-100">
                        <label className="form-label my-3">
                          Tên<sup>*</sup>
                        </label>
                        <input
                          type="text"
                          className="form-control"
                          
                          value={firstName}
                          onChange={(e) => setFirstName(e.target.value)}
                        />
                      </div>
                    </div>
                    <div className="col-md-12 col-lg-6">
                      <div className="form-item w-100">
                        <label className="form-label my-3">
                          Họ<sup>*</sup>
                        </label>
                        <input
                          type="text"
                          className="form-control"
                          
                          value={lastName}
                          onChange={(e) => setLastName(e.target.value)}
                        />
                      </div>
                    </div>
                  </div>
                  <div className="form-item">
                    <label className="form-label my-3">
                      Địa chỉ <sup>*</sup>
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="House Number Street Name"
                      
                      value={address}
                      onChange={(e) => setAddress(e.target.value)}
                    />
                  </div>
                  <div className="form-item">
                    <label className="form-label my-3">
                      Thị xã/Thành phố<sup>*</sup>
                    </label>
                    <select
                      className="form-control"
                      value={thanhpho}
                      onChange={handleChonthanhpho}
                      
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
                      Số điện thoại<sup>*</sup>
                    </label>
                    <input
                      type="tel"
                      className="form-control"
                      value={sdt}
                      onInput={handleInput}
                      placeholder="nhập số điện thoại của bạn vào đây"
                      
                    />
                  </div>
                  <div className="form-item">
                    <label className="form-label my-3">
                      Địa chỉ Email<sup>*</sup>
                    </label>
                    <input
                      type="email"
                      className="form-control"
                      
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </div>
                  <div className="form-item">
                    <label className="form-label my-3">
                      Ghi chú đặt hàng (tùy chọn)
                    </label>
                    <textarea
                      className="form-control"
                      rows="4"
                      value={ghichu}
                      onChange={(e) => setGhichu(e.target.value)}
                      placeholder="nhập ghi chú của bạn vào đây..."
                    />
                  </div>
                </div>
                {/* product */}
                <div className="col-md-12 col-lg-6 col-xl-5">
                  <div className="table-responsive">
                    <table className="table">
                      <thead>
                        <tr>
                          <th scope="col">Hình ảnh</th>
                          <th scope="col">Tên</th>
                          <th scope="col">Gía</th>
                          <th scope="col">Số lượng</th>
                          <th scope="col">Tổng tiền</th>
                        </tr>
                      </thead>
                      <tbody>
                        {giohang && giohang.length > 0 ? (
                          giohang.map((sanPham, index) => (
                            <tr key={index}>
                              <th scope="row">
                                <div className="d-flex align-items-center mt-2">
                                  <img
                                    src={`${process.env.REACT_APP_BASEURL}/storage/${sanPham.image}`}
                                    className="img-fluid rounded-circle"
                                    style={{ width: 90, height: 90 }}
                                    alt={sanPham.title}
                                  />
                                </div>
                              </th>
                              <td className="py-5">{sanPham.title}</td>
                              <td className="py-5">{sanPham.price} VND</td>
                              <td className="py-5">{sanPham.soLuong}</td>
                              <td className="py-5">{(parseFloat(sanPham.price) * sanPham.soLuong).toLocaleString('vi-VN', { minimumFractionDigits: 3 })} vnđ</td>
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
                          <td className="py-5"> {tongTienGioHang.toLocaleString('vi-VN', { minimumFractionDigits: 3 })} vnđ</td>
                        </tr>
                      </tbody>
                    </table>
                    <button
                      type="submit"
                      className="btn border-secondary py-3 px-4 text-uppercase w-100 text-primary"
                    >
                       Đặt hàng
                    </button>
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>
        <Footerusers />
        <ToastContainer />
      </div>
    </>
  );
};

export default Thanhtoan;
