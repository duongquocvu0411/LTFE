import React, { useState } from 'react';
import { Form, Button, Container, Row, Col } from 'react-bootstrap';
import axios from 'axios';
import HeaderUsers from '../HeaderUsers';
import { toast, ToastContainer } from 'react-toastify';


const LienHe = () => {
  const [duLieuForm, setDuLieuForm] = useState({
    ten: '',
    email: '',
    sdt: '',
    ghichu: ''
  });

  const [error, setError] = useState(null);

  // Cập nhật dữ liệu khi người dùng nhập vào form
  const thayDoiDuLieu = (e) => {
    const { name, value } = e.target;

    if (name === 'sdt') {
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

    if (duLieuForm.sdt.length < 10) {
      setError({ message: 'Số điện thoại phải có ít nhất 10 số.' });
      toast.error('Số điện thoại phải có ít nhất 10 số.');
      return;
    }

    axios.post(`${process.env.REACT_APP_BASEURL}/api/lienhe`, duLieuForm, {
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then(response => {
        setError(null); // Xóa lỗi nếu gửi thành công
        toast.success('Đã gửi  liên hệ thành công!'); // Thông báo thành công

        // Reset form về trạng thái ban đầu
        setDuLieuForm({
          ten: '',
          email: '',
          sdt: '',
          ghichu: ''
        });
      })
      .catch(error => {
        if (error.response && error.response.data) {
          console.error('Chi tiết lỗi từ server:', error.response.data);
          setError(error.response.data);
          toast.error('Lỗi khi gửi form liên hệ!');
        } else {
          console.error('Lỗi khi gửi form liên hệ:', error);
          setError({ message: 'Lỗi khi gửi form liên hệ!' });
          toast.error('Lỗi khi gửi form liên hệ!');
        }
      });
  };

  return (
    <>
      <HeaderUsers />
      <Container className="mt-5 py-5">
        <br /> <br /> <br />
        <Row className="justify-content-center">
          <Col md={8}>
            <h2 className="mb-4 text-center">Liên Hệ Với Chúng Tôi</h2>
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
          </Col>
        </Row>
      </Container>
      <ToastContainer /> {/* Thêm ToastContainer vào đây */}
    </>
  );
};

export default LienHe;
