import React, { useState, useEffect } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import axios from 'axios';
import { toast } from 'react-toastify';

const ModalTencuahang = ({ show, handleClose, isEdit, detail, fetchDetails }) => {
  const [ten, setTen] = useState('');

  useEffect(() => {
    if (isEdit && detail) {
      setTen(detail.name);
    } else {
      setTen('');
    }
  }, [isEdit, detail]);

  const handleSave = () => {
    const updatedData = { 
      name: ten, 
      trangthai: isEdit && detail ? detail.trangthai : 'không sử dụng' 
    };
  
    if (isEdit) {
      axios.put(`${process.env.REACT_APP_BASEURL}/api/Tencuahang/${detail.id}`, updatedData)
        .then(() => {
          toast.success("Tên cửa hàng đã được sửa thành công", {
            position: "top-right",
            autoClose: 3000,
          });
          fetchDetails();
          handleClose();
        })
        .catch((error) => {
          console.error("Có lỗi xảy ra khi sửa tên cửa hàng:", error);
          toast.error("Có lỗi khi sửa tên cửa hàng", {
            position: "top-right",
            autoClose: 3000,
          });
        });
    } else {
      axios.post(`${process.env.REACT_APP_BASEURL}/api/Tencuahang`, updatedData)
        .then(() => {
          toast.success("Tên cửa hàng đã được thêm thành công", {
            position: "top-right",
            autoClose: 3000,
          });
          fetchDetails();
          handleClose();
        })
        .catch((error) => {
          console.error("Có lỗi xảy ra khi thêm tên cửa hàng:", error);
          toast.error("Có lỗi khi thêm tên cửa hàng", {
            position: "top-right",
            autoClose: 3000,
          });
        });
    }
  };

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>{isEdit ? "Sửa Tên Cửa Hàng" : "Thêm Tên Cửa Hàng"}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group controlId="formTenCuahang">
            <Form.Label>Tên Cửa Hàng</Form.Label>
            <Form.Control
              type="text"
              placeholder="Nhập tên cửa hàng"
              value={ten}
              onChange={(e) => setTen(e.target.value)}
            />
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Đóng
        </Button>
        <Button variant="primary" onClick={handleSave}>
          Lưu
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ModalTencuahang;
