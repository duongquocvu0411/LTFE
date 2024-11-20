import React from 'react';
import { Button, Modal, Form } from 'react-bootstrap';

const ModalChiTietKhachHang = ({ show, handleClose, chiTietKhachHang, capNhatTrangThai, xoaKhachHang }) => {
  const inHoaDon = () => {
    const noiDungIn = document.getElementById('printContent').innerHTML;
    const noiDungGoc = document.body.innerHTML;
    
    document.body.innerHTML = noiDungIn;
    window.print();
    document.body.innerHTML = noiDungGoc;
    window.location.reload();
  };
  
  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Chi Tiết Khách Hàng</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {chiTietKhachHang && (
          <div id="printContent">
            <h3>Thông Tin Khách Hàng</h3>
            <p><strong>Họ Tên:</strong> {chiTietKhachHang.ho} {chiTietKhachHang.ten}</p>
            <p><strong>Email:</strong> {chiTietKhachHang.emailDiaChi}</p>
            <p><strong>Số Điện Thoại:</strong> {chiTietKhachHang.sdt}</p>
            <p><strong>Địa chỉ:</strong> {chiTietKhachHang.diaChiCuThe}, {chiTietKhachHang.thanhPho}</p>
            <p><strong>Ghi chú:</strong> {chiTietKhachHang.ghiChu}</p>

            <h4>Danh Sách Hóa Đơn</h4>
            {chiTietKhachHang.hoaDons && chiTietKhachHang.hoaDons.map((bill, index) => (
              <div key={index}>
                <p>Hóa đơn #{bill.id}: Tổng tiền - {parseFloat(bill.total_price).toLocaleString("vi-VN", { minimumFractionDigits: 3 })}{" "} VND</p>
                <p><strong>Trạng thái:</strong> {bill.status}</p>
                <p><strong>Mã đơn hàng:</strong> {bill.order_code}</p>
                <p>Chi tiết:</p>
                <ul>
                  {bill.hoaDonChiTiets && bill.hoaDonChiTiets.map((chitiet, idx) => (
                    <li key={idx}>
                      <strong>Sản phẩm:</strong> {chitiet.sanphamNames} x {chitiet.quantity} 
                      {' '}
                      {/* Kiểm tra nếu sanphamDonViTinh là một mảng và không rỗng */}
                      {Array.isArray(chitiet.sanphamDonViTinh) && chitiet.sanphamDonViTinh.length > 0 &&
                        chitiet.sanphamDonViTinh.map((item, index) => (
                          <span key={index}>
                            ({item.donViTinh}) {/* Hiển thị đơn vị tính */}
                          </span>
                        ))
                      }
                      , Giá: {parseFloat(chitiet.price).toLocaleString("vi-VN", { minimumFractionDigits: 3 })}{" "} (VND)
                    </li>
                  ))}
                </ul>

                {bill.status === 'Hủy đơn' && (
                  <Button variant="danger" onClick={() => xoaKhachHang(chiTietKhachHang.id)}>Xóa đơn hàng</Button>
                )}
                
                {bill.status !== 'Hủy đơn' && bill.status !== 'Đã giao thành công' && (
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
        <Button variant="primary" onClick={inHoaDon}>In Hóa Đơn</Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ModalChiTietKhachHang;
