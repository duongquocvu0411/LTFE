import React, { useState } from 'react';
import { Form, Button, Container, Row, Col } from 'react-bootstrap';
import axios from 'axios';
import HeaderUsers from '../HeaderUsers';
import { Link } from 'react-router-dom';

const LienHe = () => {
  const [duLieuForm, setDuLieuForm] = useState({
    hoTen: '',
    email: '',
    soDienThoai: '',
    ghiChu: ''
  });
  const [daGui, setDaGui] = useState(false);

  // Cập nhật dữ liệu khi người dùng nhập vào form
  const thayDoiDuLieu = (e) => {
    const { name, value } = e.target;

    // Kiểm tra nếu trường dữ liệu đang thay đổi là số điện thoại
    if (name === 'soDienThoai') {
      // Chỉ cho phép nhập số và giới hạn 11 số
      if (/^\d*$/.test(value) && value.length <= 11) {
        setDuLieuForm({
          ...duLieuForm,
          [name]: value,
        });
      }
    } else {
      setDuLieuForm({
        ...duLieuForm,
        [name]: value,
      });
    }
  };

  // Xử lý khi người dùng nhấn nút gửi
  const xuLyGuiForm = (e) => {
    e.preventDefault();
    
    // Gửi dữ liệu đến server
    axios.post('http://127.0.0.1:8000/api/lienhe', duLieuForm)
      .then(response => {
        setDaGui(true);
        console.log('Đã gửi form liên hệ thành công:', response.data);
      })
      .catch(error => {
        console.error('Lỗi khi gửi form liên hệ:', error);
      });
  };

  return (
    <>
      <HeaderUsers />
      <Container className="mt-5 py-5">
        <Row className="justify-content-center">
          <Col md={8}>
            <h2 className="mb-4 text-center">Liên Hệ Với Chúng Tôi</h2>
            {daGui ? (
              <div className="alert alert-success" role="alert">
                Cảm ơn bạn đã liên hệ! Chúng tôi sẽ phản hồi sớm nhất có thể.
                <div className='text-center'>
                  <Link to={"/"} className='btn btn-primary'>Trở về</Link>
                </div>
              </div>
            ) : (
              <Form onSubmit={xuLyGuiForm}>
                <Form.Group controlId="formHoTen" className="mb-3">
                  <Form.Label>Họ Tên</Form.Label>
                  <Form.Control
                    type="text"
                    name="hoTen"
                    placeholder="Nhập họ tên của bạn"
                    value={duLieuForm.hoTen}
                    onChange={thayDoiDuLieu}
                    required
                  />
                </Form.Group>

                <Form.Group controlId="formEmail" className="mb-3">
                  <Form.Label>Email</Form.Label>
                  <Form.Control
                    type="email"
                    name="email"
                    placeholder="Nhập email của bạn"
                    value={duLieuForm.email}
                    onChange={thayDoiDuLieu}
                    required
                  />
                </Form.Group>

                <Form.Group controlId="formSoDienThoai" className="mb-3">
                  <Form.Label>Số Điện Thoại</Form.Label>
                  <Form.Control
                    type="text"
                    name="soDienThoai"
                    placeholder="Nhập số điện thoại của bạn"
                    value={duLieuForm.soDienThoai}
                    onChange={thayDoiDuLieu}
                    required
                  />
                </Form.Group>

                <Form.Group controlId="formGhiChu" className="mb-3">
                  <Form.Label>Nội Dung</Form.Label>
                  <Form.Control
                    as="textarea"
                    name="ghiChu"
                    rows={5}
                    placeholder="Nhập nội dung liên hệ"
                    value={duLieuForm.ghiChu}
                    onChange={thayDoiDuLieu}
                    required
                  />
                </Form.Group>

                <Button variant="primary" type="submit">
                  Gửi Liên Hệ
                </Button>
              </Form>
            )}
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default LienHe;
