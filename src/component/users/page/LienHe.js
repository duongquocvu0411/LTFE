import React, { useState } from 'react';
import { Form, Button, Container, Row, Col } from 'react-bootstrap';
import axios from 'axios';
import HeaderUsers from '../HeaderUsers';
import { Link } from 'react-router-dom';

const LienHe = () => {
  const [formData, setFormData] = useState({
    ten: '',
    email: '',
    sdt: '',
    ghichu: ''
  });
  const [submitted, setSubmitted] = useState(false);

  // Cập nhật dữ liệu khi người dùng nhập vào form
  const handleChange = (e) => {
   const {name, value} = e.target;

   // kiểm tra nếu trường dữ liệu đang thay đổi là sdt
   if(name === 'sdt'){
    // chỉ cho phép nhập số và giới hạn 11 số
    if(/^\d*$/.test(value) && value.length <=11){
      setFormData({
        ...formData,
        [name]:value,
      });
    }
   }else{
    setFormData({
      ...formData,
      [name]:value,
    });
   }
  };

  // Xử lý khi người dùng nhấn nút gửi
  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Gửi dữ liệu đến server
    axios.post('http://127.0.0.1:8000/api/lienhe', formData)
      .then(response => {
        setSubmitted(true);
        console.alter('Contact form submitted successfully:', response.data);
        
      })
      .catch(error => {
        console.error('Error submitting contact form:', error);
      });
  };

  return (
    <>
      <HeaderUsers/>
      <Container className="mt-5 py-5">
        <Row className="justify-content-center">
          <Col md={8}>
            <h2 className="mb-4 text-center">Liên Hệ Với Chúng Tôi</h2>
            {submitted ? (
              <div className="alert alert-success" role="alert">
                Cảm ơn bạn đã liên hệ! Chúng tôi sẽ phản hồi sớm nhất có thể.
                <div className='text-center'>
                  <Link to={"/"} className='btn btn-primary'>trở về</Link>
                </div>
              </div>
            ) : (
              <Form onSubmit={handleSubmit}>
                <Form.Group controlId="formTen" className="mb-3">
                  <Form.Label>Họ Tên</Form.Label>
                  <Form.Control
                    type="text"
                    name="ten"
                    placeholder="Nhập họ tên của bạn"
                    value={formData.ten}
                    onChange={handleChange}
                    required
                  />
                </Form.Group>

                <Form.Group controlId="formEmail" className="mb-3">
                  <Form.Label>Email</Form.Label>
                  <Form.Control
                    type="email"
                    name="email"
                    placeholder="Nhập email của bạn"
                    value={formData.email}
                    onChange={handleChange}
                    required
                  />
                </Form.Group>

                <Form.Group controlId="formSdt" className="mb-3">
                  <Form.Label>Số Điện Thoại</Form.Label>
                  <Form.Control
                    type="text"
                    name="sdt"
                    placeholder="Nhập số điện thoại của bạn"
                    value={formData.sdt}
                    onChange={handleChange}
                    required
                  />
                </Form.Group>

                <Form.Group controlId="formGhichu" className="mb-3">
                  <Form.Label>Nội Dung</Form.Label>
                  <Form.Control
                    as="textarea"
                    name="ghichu"
                    rows={5}
                    placeholder="Nhập nội dung liên hệ"
                    value={formData.ghichu}
                    onChange={handleChange}
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
