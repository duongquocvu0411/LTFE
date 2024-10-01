import React, { useState, useEffect } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import axios from 'axios';

const ModalDiaChiChiTiet = ({ show, handleClose, isEdit, detail, fetchDetails }) => {
  const [diachi, setDiachi] = useState('');
  const [email, setEmail] = useState('');
  const [sdt,setSdt] = useState('');

  // Cập nhật state khi mở modal để chỉnh sửa
  useEffect(() => {
    if (isEdit && detail) {
      setDiachi(detail.diachi);
      setEmail(detail.email);
      setSdt(detail.sdt);
    } else {
      setDiachi('');
      setEmail('');
      setSdt('');
    }
  }, [isEdit, detail]);

  // Xử lý khi nhấn nút "Save"
  const handleSave = () => {
    if (isEdit) {
        // Chỉnh sửa chi tiết địa chỉ
        axios.put(`http://127.0.0.1:8000/api/diachichitiet/${detail.id}`, { diachi, email,sdt })
            .then(() => {
                fetchDetails(); // Cập nhật danh sách sau khi chỉnh sửa
                handleClose();
            })
            .catch(error => console.error('Error updating detail:', error));
    } else {
        // Thêm mới chi tiết địa chỉ
        axios.post('http://127.0.0.1:8000/api/diachichitiet', {
            diachi: diachi,
            email: email,
            sdt: sdt
        })
        .then(() => {
            fetchDetails(); // Cập nhật danh sách sau khi thêm mới
            handleClose();
        })
        .catch(error => {
            if (error.response && error.response.status === 422) {
                console.error('Validation error:', error.response.data.errors);
            } else {
                console.error('Error adding detail:', error);
            }
        });
    }
};
// Xử lý nhập số điện thoại, chỉ cho phép số và giới hạn 11 ký tự
const handleSdtChange = (e) => {
  const value = e.target.value;
  if (/^\d*$/.test(value) && value.length <= 11) {
    setSdt(value);
  }
};
//pattern="\d{0,11}": Thuộc tính pattern của trường nhập liệu (input) đảm bảo rằng chỉ các ký tự số có độ dài từ 0 đến 11 
//mới được chấp nhận. Điều này cung cấp xác thực ở phía trình duyệt.

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>{isEdit ? 'Edit Detail' : 'Add Detail'}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group controlId="formDiaChi">
            <Form.Label>Địa Chỉ</Form.Label>
            <Form.Control
              type="text"
              placeholder="Nhập địa chỉ"
              value={diachi}
              onChange={(e) => setDiachi(e.target.value)}
            />
          </Form.Group>
          <Form.Group controlId="formEmail" className="mt-3">
            <Form.Label>Email</Form.Label>
            <Form.Control
              type="email"
              placeholder="Nhập email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </Form.Group>
          <Form.Group controlId="formSdt" className="mt-3">
            <Form.Label>Email</Form.Label>
            <Form.Control
              type="tel"
              placeholder="Nhập số điện thoại"
              value={sdt}
              onChange={handleSdtChange}
              pattern="\d{0,11}"
            />
            {/* \d đại diện cho một chữ số (0-9).
            {0,11} giới hạn độ dài của chuỗi nhập vào từ 0 đến 11 ký tự. */}
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Close
        </Button>
        <Button variant="primary" onClick={handleSave}>
          Save
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ModalDiaChiChiTiet;
