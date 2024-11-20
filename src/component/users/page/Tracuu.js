import React, { useState } from "react";
import axios from "axios";
import HeaderUsers from './../HeaderUsers';
import Footerusers from './../Footerusers';
import { toast, ToastContainer } from "react-toastify";

const Tracuu = () => {
  const [madonhang, setmadonhang] = useState("");
  const [dathangchitiet, setDathangchitiet] = useState(null);
  const [error, setError] = useState("");

  // Hàm xử lý tra cứu đơn hàng
  const handleLookupOrder = async (e) => {
    e.preventDefault();

    if (!madonhang) {
      setError("Vui lòng nhập mã đơn hàng.");
      return;
    }

    try {
      const response = await axios.get(`${process.env.REACT_APP_BASEURL}/api/hoadon/tracuu/${madonhang}`);
      setDathangchitiet(response.data);
      setError("");
    } catch (error) {
      console.error("Lỗi khi tra cứu đơn hàng:", error);
      setError("Không tìm thấy đơn hàng với mã này.");
      setDathangchitiet(null);
    }
  };

  const handleCancelOrder = async () => {
    try {
      await axios.put(`${process.env.REACT_APP_BASEURL}/api/hoadon/tracuu/${madonhang}/huydon`);
      setDathangchitiet({ ...dathangchitiet, status: "Hủy đơn" });
      toast.success("Đơn hàng của bạn đã hủy thành công", {
        position: 'top-right',
        autoClose: 3000
      });
    } catch (error) {
      console.error("Lỗi khi hủy đơn hàng:", error);
      toast.error('Có lỗi khi hủy đơn hàng của bạn. Vui lòng thử lại.', {
        position: 'top-right',
        autoClose: 3000
      });
    }
  };

  return (
    <>
      <HeaderUsers />
      <br/>
      <br/>
      <br/>
      <br/>
      <br/>
      
      <div className="container my-5 py-5">
        <h2 className="mb-4">Tra cứu đơn hàng</h2>
        <form onSubmit={handleLookupOrder} className="mb-4">
          <div className="input-group mb-3">
            <input
              type="text"
              className="form-control"
              placeholder="Nhập mã đơn hàng"
              value={madonhang}
              onChange={(e) => setmadonhang(e.target.value)}
            />
            <button className="btn btn-primary" type="submit">
              Tra cứu
            </button>
          </div>
        </form>

        {error && <div className="alert alert-danger">{error}</div>}

        {dathangchitiet && (
          <div className="card">
            <div className="card-header">Chi tiết đơn hàng: {dathangchitiet.orderCode}</div>
            <div className="card-body">
              <p className="card-text">Ngày đặt hàng: {new Date(dathangchitiet.created_at).toLocaleDateString()}</p>
              <p className="card-text"><strong>Trạng thái đơn hàng:</strong> {dathangchitiet.status}</p>

              <h6 className="mt-4">Chi tiết sản phẩm:</h6>
              <div className="table-responsive">
                <table className="table table-bordered border-dark table-hover">
                  <thead>
                    <tr>
                      <th scope="col">Sản phẩm</th>
                      <th scope="col">Số lượng</th>
                      <th scope="col">Giá</th>
                    </tr>
                  </thead>
                  <tbody>
                    {dathangchitiet.hoaDonChiTiets && Array.isArray(dathangchitiet.hoaDonChiTiets) ? (
                      dathangchitiet.hoaDonChiTiets.map((item, index) => (
                        <tr key={index}>
                          <td>{item.sanPhamNames}</td>
                          <td>
                            {item.quantity} {item.sanPhamDonViTinh} {/* Hiển thị đơn vị tính ngay sau số lượng */}
                          </td>
                          <td> {parseFloat(item.price).toLocaleString("vi-VN", { minimumFractionDigits: 3 })}{" "}  VND</td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan="3" className="text-center">
                          Không có chi tiết sản phẩm
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>

              <p className="card-text"><strong>Tổng giá trị đơn hàng:</strong>  {parseFloat(dathangchitiet.total_price).toLocaleString("vi-VN", { minimumFractionDigits: 3 })}{" "} VND</p>

              {dathangchitiet.status === "Chờ xử lý" && (
                <button className="btn btn-danger mt-3" onClick={handleCancelOrder}>
                  Hủy đơn hàng
                </button>
              )}
            </div>
          </div>
        )}
      </div>
      <ToastContainer />
      <Footerusers />
    </>
  );
};

export default Tracuu;
