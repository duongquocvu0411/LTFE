import React, { useContext, useState } from "react";
import Footerusers from "../Footerusers";
import HeaderUsers from "../HeaderUsers";
import { CartContext } from "./CartContext";
import axios from "axios";
import { toast, ToastContainer } from 'react-toastify';

const Thanhtoan = () => {
  const [thanhpho, setThanhpho] = useState("");
  const { giohang, xoagiohangthanhtoanthanhcong } = useContext(CartContext);
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
    if (newSdt.length > 11) {
      newSdt = newSdt.slice(0, 11);
    }
    setSdt(newSdt);
  };

  // Hàm xử lý khi chọn thành phố
  const handleChonthanhpho = (e) => {
    setThanhpho(e.target.value);
  };

  const tongTienGioHang = giohang.reduce((tong, item) => {
    const giaHienTai = item.sanphamSales?.find((sale) => sale.trangthai === "Đang áp dụng")
      ? parseFloat(item.sanphamSales.find((sale) => sale.trangthai === "Đang áp dụng").giasale)
      : parseFloat(item.gia); // Sử dụng giá giảm nếu có, ngược lại lấy giá gốc
    return tong + giaHienTai * item.soLuong;
  }, 0);

  const handlePlaceOrder = async (e) => {
    e.preventDefault();

    if (giohang.length === 0) {
      toast.error("Giỏ hàng của bạn đang trống. Không thể thanh toán!", { position: "top-right", autoClose: 5000 });
      return;
    }

    if (!firstName || !lastName || !address || !thanhpho || !sdt || sdt.length < 10 || sdt.length > 11 || !email) {
      toast.error("Vui lòng kiểm tra và điền đầy đủ các thông tin bắt buộc!", { position: "top-right", autoClose: 5000 });
      return;
    }

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
      const khachhangResponse = await axios.post(`${process.env.REACT_APP_BASEURL}/api/khachhang`, khachhangData);
      const khachhangId = khachhangResponse.data.id;

      const billData = {
        KhachHangId: khachhangId,
        SanphamIds: giohang.map((sanpham) => sanpham.id),
        Quantities: giohang.map((sanpham) => sanpham.soLuong),
        Prices: giohang.map((sanpham) => {
          const sale = sanpham.sanphamSales?.find((sale) => sale.trangthai === "Đang áp dụng");
          return sale ? parseFloat(sale.giasale) : parseFloat(sanpham.gia); // Lấy giá giảm nếu có
        }),
      };

      const billResponse = await axios.post(`${process.env.REACT_APP_BASEURL}/api/HoaDon`, billData);

      const newOrderCode = billResponse.data.order_code;
      setOrderCode(newOrderCode);

      toast.success(`Đặt hàng thành công! Mã đơn hàng của bạn: ${newOrderCode}`, { position: "top-right", autoClose: 10000 });
      xoagiohangthanhtoanthanhcong();

      setFirstName("");
      setLastName("");
      setAddress("");
      setThanhpho("");
      setSdt("");
      setEmail("");
      setGhichu("");
    } catch (error) {
      console.error("Lỗi khi gửi đơn hàng:", error);
      toast.error("Đã xảy ra lỗi khi gửi đơn hàng. Vui lòng thử lại sau.", { position: "top-right", autoClose: 10000 });
    }
  };

  return (
    <>
      <div>
        <HeaderUsers />
        <div className="container-fluid page-header py-5">
          <h1 className="text-center text-white display-6">Checkout</h1>
        </div>
        <div className="container-fluid py-5">
          <div className="container py-5">
            <h1 className="mb-4">Chi tiết thanh toán</h1>

            <form onSubmit={handlePlaceOrder}>
              <div className="row g-5">
                <div className="col-md-12 col-lg-6 col-xl-7">
                  <div className="row">
                    <div className="col-md-12 col-lg-6">
                      <div className="form-item w-100">
                        <label className="form-label my-3">Tên<sup>*</sup></label>
                        <input type="text" className="form-control" value={firstName} onChange={(e) => setFirstName(e.target.value)} />
                      </div>
                    </div>
                    <div className="col-md-12 col-lg-6">
                      <div className="form-item w-100">
                        <label className="form-label my-3">Họ<sup>*</sup></label>
                        <input type="text" className="form-control" value={lastName} onChange={(e) => setLastName(e.target.value)} />
                      </div>
                    </div>
                  </div>
                  <div className="form-item">
                    <label className="form-label my-3">Địa chỉ <sup>*</sup></label>
                    <input type="text" className="form-control" value={address} onChange={(e) => setAddress(e.target.value)} />
                  </div>
                  <div className="form-item">
                    <label className="form-label my-3">Thành phố<sup>*</sup></label>
                    <select className="form-control" value={thanhpho} onChange={handleChonthanhpho}>
                      <option value="" disabled>Chọn thành phố</option>
                      <option value="Hà Nội">Hà Nội</option>
                      <option value="Hồ Chí Minh">Hồ Chí Minh</option>
                    </select>
                  </div>
                  <div className="form-item">
                    <label className="form-label my-3">Số điện thoại<sup>*</sup></label>
                    <input type="tel" className="form-control" value={sdt} onInput={handleInput} placeholder="Nhập số điện thoại của bạn" />
                  </div>
                  <div className="form-item">
                    <label className="form-label my-3">Email<sup>*</sup></label>
                    <input type="email" className="form-control" value={email} onChange={(e) => setEmail(e.target.value)} />
                  </div>
                  <div className="form-item">
                    <label className="form-label my-3">Ghi chú đặt hàng (tùy chọn)</label>
                    <textarea className="form-control" rows="4" value={ghichu} onChange={(e) => setGhichu(e.target.value)} placeholder="Nhập ghi chú của bạn" />
                  </div>
                </div>

                {/* Thông tin sản phẩm trong giỏ hàng */}
                <div className="col-md-12 col-lg-6 col-xl-5">
                  <div className="table-responsive">
                    <table className="table">
                      <thead>
                        <tr>
                          <th scope="col">Hình ảnh</th>
                          <th scope="col">Tên</th>
                          <th scope="col">Giá</th>
                          <th scope="col">Số lượng</th>
                          <th scope="col">Tổng tiền</th>
                        </tr>
                      </thead>
                      <tbody>
                        {giohang && giohang.length > 0 ? (
                          giohang.map((sanPham, index) => {
                            const sale = sanPham.sanphamSales?.find((sale) => sale.trangthai === "Đang áp dụng");
                            const giaHienTai = sale ? parseFloat(sale.giasale) : parseFloat(sanPham.gia);

                            return (
                              <tr key={index}>
                                <td>
                                  <img
                                    src={sanPham.hinhanh}
                                    style={{ width: 90, height: 90 }}
                                    alt={sanPham.tieude}
                                  />
                                </td>
                                <td>{sanPham.tieude}</td>
                                <td>
                                  {sale && (
                                    <p style={{ textDecoration: "line-through", marginBottom: "5px" }}>
                                      {parseFloat(sanPham.giatien).toLocaleString("vi-VN", { minimumFractionDigits: 0 })} VND
                                    </p>
                                  )}
                                  {giaHienTai.toLocaleString("vi-VN", { minimumFractionDigits: 0 })} VND
                                </td>
                                <td>{sanPham.soLuong}</td>
                                <td>
                                  {(giaHienTai * sanPham.soLuong).toLocaleString("vi-VN", { minimumFractionDigits: 0 })} VND
                                </td>
                              </tr>
                            );
                          })
                        ) : (
                          <tr>
                            <td colSpan="5" className="text-center">
                              Giỏ hàng của bạn trống
                            </td>
                          </tr>
                        )}
                        <tr>
                          <td colSpan="4" className="text-end fw-bold">
                            Tổng cộng:
                          </td>
                          <td>
                            {tongTienGioHang.toLocaleString("vi-VN", { minimumFractionDigits: 0 })} VND
                          </td>
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
