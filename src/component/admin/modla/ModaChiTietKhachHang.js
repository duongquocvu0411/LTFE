import React from 'react';
import { Button, Modal, Form } from 'react-bootstrap';

const ModalChiTietKhachHang = ({ show, handleClose, chiTietKhachHang, capNhatTrangThai, xoaKhachHang }) => {
  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Chi Tiết Khách Hàng</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {chiTietKhachHang && (
          <div>
            <p><strong>Họ Tên:</strong> {chiTietKhachHang.ho} {chiTietKhachHang.ten}</p>
            <p><strong>Email:</strong> {chiTietKhachHang.Emaildiachi}</p>
            <p><strong>Số Điện Thoại:</strong> {chiTietKhachHang.sdt}</p>
            <p><strong>Hóa Đơn:</strong></p>
            {chiTietKhachHang.hoadons.map((bill, index) => (
              <div key={index}>
                <p>Hóa đơn #{index + 1}: Tổng tiền - {bill.total_price} (VND)</p>
                <p><strong>Trạng thái:</strong> {bill.status}</p>
                <p><strong>Mã đơn hàng:</strong> {bill.order_code}</p>
                <p>Chi tiết:</p>
                <ul>
                  {bill.hoadonchitiets.map((chitiet, idx) => (
                    <li key={idx}>
                     <li key={idx}>
                          Sản phẩm: {chitiet.sanpham_names} x {chitiet.quantity}, Giá: {chitiet.price} (VND)
                      </li>
                    </li>
                  ))}
                </ul>
                {/* Hiển thị nút xóa nếu trạng thái là "Hủy đơn" */}
                {bill.status === 'Hủy đơn' && (
                  <Button variant="danger" onClick={() => xoaKhachHang(chiTietKhachHang.id)}>Xóa đơn hàng</Button>
                )}
                {/* Chỉ hiển thị Form.Group nếu trạng thái không phải là "Hủy đơn" hoặc "Đã giao thành công" */}
                {bill.status !== 'Hủy đơn' && bill.status !== 'Đã giao thành công' &&   bill.status !== 'Giao không thành công' &&(
                  <Form.Group controlId="formTrangThai">
                    <Form.Label>Trạng thái đơn hàng:</Form.Label>
                    <Form.Control
                      as="select"
                      value={bill.status}
                      onChange={(e) => capNhatTrangThai(bill.id, e.target.value)}
                    >
                      <option value="Chờ xử lý">Chờ xử lý</option>
                      <option value="Đang giao">Đang giao</option>
                      <option value="Đã giao thành công">Đã giao thành công</option>
                      <option value="Hủy đơn">Hủy đơn</option>
                      <option value="Giao không thành công">Giao không thành công</option>
                    </Form.Control>
                  </Form.Group>
                )}
              </div>
            ))}
          </div>
        )}
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>Đóng</Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ModalChiTietKhachHang;
