import React, { useContext } from "react";
import Footerusers from "../Footerusers";
import HeaderUsers from "../HeaderUsers";
import { Link, useNavigate } from "react-router-dom";
import { CartContext } from "./CartContext";
import { toast, ToastContainer } from "react-toastify";

const Giohang = () => {
  const { giohang, XoaGioHang, TangSoLuong, GiamSoLuong, CapnhatSoLuong, Xoatoanbogiohang } = useContext(CartContext);
  const navigate = useNavigate();

  // Tính tổng giá trị của giỏ hàng và định dạng theo kiểu tiền tệ Việt Nam
  const tongTienGioHang = giohang.reduce(
    (tong, item) => tong + parseFloat(item.gia) * item.soLuong, // Sử dụng `gia` thay vì `giatien`
    0
  );

  const handleThanhtoan = () => {
    if (giohang.length === 0) {
      toast.warning("Giỏ hàng trống, không thể thanh toán", {
        position: "top-right",
        autoClose: 3000,
      });
    } else {
      navigate("/thanhtoan");
    }
  };

  return (
    <>
      <div>
        <HeaderUsers />
        {/* Single Page Header start */}
        <div className="container-fluid page-header py-5">
          <h1 className="text-center text-white display-6">Giỏ hàng</h1>
        </div>
        {/* Single Page Header End */}
        {/* Cart Page Start */}
        <div className="container-fluid py-5">
          <div className="container py-5">
            <div className="table-responsive">
              <table className="table align-middle">
                <thead>
                  <tr>
                    <th scope="col">Hình ảnh</th>
                    <th scope="col">Tên</th>
                    <th scope="col">Gía</th>
                    <th scope="col">Số lượng</th>
                    <th scope="col">Tổng tiền</th>
                    <th scope="col">Chức năng</th>
                  </tr>
                </thead>
                <tbody>
                  {giohang && giohang.length > 0 ? (
                    giohang.map((sanPham, index) => (
                      <tr key={index}>
                        <td>
                          <img
                            src={sanPham.hinhanh}
                            className="img-fluid rounded"
                            style={{ width: "60px", height: "60px" }}
                            alt={sanPham.tieude}
                          />
                        </td>
                        <td>{sanPham.tieude}</td>
                        <td>
                          {parseFloat(sanPham.gia).toLocaleString("vi-VN", { minimumFractionDigits: 3 })}{" "}
                          vnđ / {sanPham.donViTinh}
                        </td>
                        <td>
                          <div className="d-flex">
                            <button className="btn btn-warning btn-sm" onClick={() => GiamSoLuong(sanPham.id)}>
                              <i className="fa fa-minus"></i>
                            </button>
                            <input
                              type="number"
                              className="form-control text-center mx-2"
                              value={sanPham.soLuong || 1} // Đảm bảo hiển thị giá trị hợp lệ
                              min="1"
                              onChange={(e) => CapnhatSoLuong(sanPham.id, e.target.value)}
                              style={{ width: "60px", minWidth: "50px" }} // Đặt chiều rộng tối thiểu
                            />
                            <button className="btn btn-warning btn-sm" onClick={() => TangSoLuong(sanPham.id)}>
                              <i className="fa fa-plus"></i>
                            </button>
                          </div>
                        </td>
                        <td>
                          {(parseFloat(sanPham.gia) * sanPham.soLuong).toLocaleString("vi-VN", { minimumFractionDigits: 3 })}{" "}
                          vnđ
                        </td>
                        <td>
                          <button className="btn btn-danger btn-sm" onClick={() => XoaGioHang(sanPham.id)}>
                            <i className="bi bi-trash3-fill"></i>
                          </button>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="6" className="text-center">
                        Giỏ hàng của bạn trống vui lòng nhấn vào{" "}
                        <Link to="/cuahang"> cửa hàng</Link> để mua hàng
                      </td>
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
                  </div>
                  <div className="py-4 mb-4 border-top border-bottom d-flex justify-content-between">
                    <h5 className="mb-0 ps-4 me-4">Tổng</h5>
                    <p className="mb-0 pe-4">
                      {tongTienGioHang.toLocaleString("vi-VN", { minimumFractionDigits: 3 })} vnđ
                    </p>
                  </div>
                  <button className="btn btn-primary btn-sm w-100 text-uppercase mb-4" onClick={handleThanhtoan}>
                    Thanh toán
                  </button>
                  <div className="text-center mb-4">
                    <button className="btn btn-danger btn-sm w-100 text-uppercase" onClick={Xoatoanbogiohang}>
                      Xóa hết tất cả sản phẩm
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footerusers />
      <ToastContainer />
    </>
  );
};

export default Giohang;
