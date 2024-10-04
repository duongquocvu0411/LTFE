import React, { useState } from "react";
import axios from "axios";
import HeaderUsers from './../HeaderUsers';
import Footerusers from './../Footerusers';

const Tracuu = () => {
  const [orderCode, setOrderCode] = useState("");
  const [orderDetails, setOrderDetails] = useState(null);
  const [error, setError] = useState("");

  // Hàm xử lý tra cứu đơn hàng
  const handleLookupOrder = async (e) => {
    e.preventDefault();

    if (!orderCode) {
      setError("Vui lòng nhập mã đơn hàng.");
      return;
    }

    try {
      // Gửi yêu cầu tra cứu đơn hàng tới API
      const response = await axios.get(`http://127.0.0.1:8000/api/orders/${orderCode}`);
      setOrderDetails(response.data);
      setError(""); // Xóa thông báo lỗi nếu có
    } catch (error) {
      console.error("Lỗi khi tra cứu đơn hàng:", error);
      setError("Không tìm thấy đơn hàng với mã này.");
      setOrderDetails(null); // Xóa dữ liệu đơn hàng nếu có lỗi
    }
  };

  // Hàm xử lý hủy đơn hàng
  const handleCancelOrder = async () => {
    try {
      // Gửi yêu cầu hủy đơn hàng tới API
      await axios.put(`http://127.0.0.1:8000/api/orders/${orderCode}/cancel`);
      setOrderDetails({ ...orderDetails, status: "Hủy đơn" }); // Cập nhật trạng thái đơn hàng trong state
      alert("Đơn hàng đã được hủy thành công.");
    } catch (error) {
      console.error("Lỗi khi hủy đơn hàng:", error);
      alert("Không thể hủy đơn hàng này.");
    }
  };

  return (
    <>
    <HeaderUsers/>
    <div className="container my-5 py-5">
        <br/>
        <br/> <br/> <br/> <br/> <br/>
      <h2 className="mb-4">Tra cứu đơn hàng</h2>
      <form onSubmit={handleLookupOrder} className="mb-4">
        <div className="input-group mb-3">
          <input
            type="text"
            className="form-control"
            placeholder="Nhập mã đơn hàng"
            value={orderCode}
            onChange={(e) => setOrderCode(e.target.value)}
          />
          <button className="btn btn-primary" type="submit">
            Tra cứu
          </button>
        </div>
      </form>

      {/* Thông báo lỗi */}
      {error && <div className="alert alert-danger">{error}</div>}

      {/* Hiển thị chi tiết đơn hàng nếu có */}
      {orderDetails && (
        <div className="card">
          <div className="card-header">Chi tiết đơn hàng: {orderDetails.order_code}</div>
          <div className="card-body">
            <h5 className="card-title">Tổng giá: {orderDetails.total_price} VND</h5>
            <p className="card-text">Ngày đặt hàng: {new Date(orderDetails.created_at).toLocaleDateString()}</p>
            <p className="card-text"><strong>Trạng thái đơn hàng:</strong> {orderDetails.status}</p>

            <h6 className="mt-4">Chi tiết sản phẩm:</h6>
            <ul className="list-group list-group-flush">
              {orderDetails.billchitiets.map((item, index) => (
                <li key={index} className="list-group-item">
                  <strong>Sản phẩm:</strong> {item.sanpham_names} x {item.quantity}<br />
                  <strong>Giá:</strong> {item.price} VND
                </li>
                
              ))}
              
            </ul>

            {/* Nút hủy đơn hàng */}
            {orderDetails.status === "Chờ xử lý" && (
              <button className="btn btn-danger mt-3" onClick={handleCancelOrder}>
                Hủy đơn hàng
              </button>
            )}
          </div>
        </div>
      )}
    </div>
    <Footerusers/>
    </>
  );
};

export default Tracuu;
