import React, { useState } from 'react';
import { Form, Button, Container, Row, Col } from 'react-bootstrap';
import axios from 'axios';
import HeaderUsers from '../HeaderUsers';
import { Link } from 'react-router-dom';

const LienHe = () => {
  const [duLieuForm, setDuLieuForm] = useState({
    ten: '',
    email: '',
    sdt: '',
    ghichu: ''
  });
  const [daGui, setDaGui] = useState(false);
  const [error, setError] = useState(null); // Thêm state để lưu lỗi từ server

  // Cập nhật dữ liệu khi người dùng nhập vào form
  const thayDoiDuLieu = (e) => {
    const { name, value } = e.target;

    // Kiểm tra nếu trường dữ liệu đang thay đổi là số điện thoại
    if (name === 'sdt') {
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

    // Log dữ liệu chuẩn bị gửi
    console.log('Dữ liệu chuẩn bị gửi:', duLieuForm);
    
    // Gửi dữ liệu đến server
    axios.post('http://127.0.0.1:8000/api/lienhe', duLieuForm, {
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then(response => {
        setDaGui(true);
        setError(null); // Xóa lỗi nếu gửi thành công
        console.log('Đã gửi form liên hệ thành công:', response.data);
      })
      .catch(error => {
        if (error.response && error.response.data) {
          console.error('Chi tiết lỗi từ server:', error.response.data);
          setError(error.response.data); // Lưu lỗi từ server để hiển thị
        } else {
          console.error('Lỗi khi gửi form liên hệ:', error);
          setError({ message: 'Lỗi khi gửi form liên hệ!' });
        }
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
              <>
                {error && (
                  <div className="alert alert-danger" role="alert">
                    {error.message || 'Đã xảy ra lỗi. Vui lòng kiểm tra lại thông tin.'}
                  </div>
                )}
                <Form onSubmit={xuLyGuiForm}>
                  <Form.Group controlId="formHoTen" className="mb-3">
                    <Form.Label>Họ Tên</Form.Label>
                    <Form.Control
                      type="text"
                      name="ten"
                      placeholder="Nhập họ tên của bạn"
                      value={duLieuForm.ten}
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
                      name="sdt"
                      placeholder="Nhập số điện thoại của bạn"
                      value={duLieuForm.sdt}
                      onChange={thayDoiDuLieu}
                      required
                    />
                  </Form.Group>

                  <Form.Group controlId="formGhiChu" className="mb-3">
                    <Form.Label>Nội Dung</Form.Label>
                    <Form.Control
                      as="textarea"
                      name="ghichu"
                      rows={5}
                      placeholder="Nhập nội dung liên hệ"
                      value={duLieuForm.ghichu}
                      onChange={thayDoiDuLieu}
                      required
                    />
                  </Form.Group>

                  <Button variant="primary" type="submit">
                    Gửi Liên Hệ
                  </Button>
                </Form>
              </>
            )}
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default LienHe;
