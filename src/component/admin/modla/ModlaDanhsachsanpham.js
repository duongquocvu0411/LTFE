import React, { useEffect, useState } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import axios from 'axios';
import { toast } from 'react-toastify';

const ModlaAdddanhsachsanpham = ({ show, handleClose, isEdit, product, fetchProducts }) => {
  const [name, setName] = useState('');
  

  useEffect(() => {
    if (isEdit && product) {
      setName(product.name);
     
    } else {    
      setName('');
     
    }
  }, [isEdit, product]);

  const handleSubmit = async () => {
    if (isEdit) {
      // Update existing profiles
      axios.put(`${process.env.REACT_APP_BASEURL}/api/danhsachsanpham/${product.id}`, { name })
        .then(() => {
          toast.success(`Danh mục ${name} đã được cập nhật thành công!`,{
            position: 'top-right',
            autoClose:3000,
          })
          fetchProducts(); // Refresh profile list
          handleClose(); // Close modal
        })
        .catch(error => {
          console.log("có lỗi khi sửa danh muc!", error);
          //hiển thị thông báo
          toast.error("có lỗi xảy ra khi cập nhật danh muc. Vui lòng thử lại.",{
            position: 'top-right',
            autoClose:3000,
          })
        })
    } else {
      // Add new profile
      axios.post(`${process.env.REACT_APP_BASEURL}/api/danhsachsanpham`, { name })
        .then(() => {
          // hiển thị thông báo
          toast.success(`Danh muc ${name} đã được thêm thành công!`,{
            position: 'top-right',
            autoClose:3000,
          })
          fetchProducts(); // Refresh profile list
          handleClose(); // Close modal
        })
        .catch(error => {
          console.log('có lỗi xảy ra khi thêm mới danh muc.', error);
          // hiển thị thông báo
          toast.error(`Có lỗi xãy ra khi thêm mới danh mục ${name}`,{
            position: 'top-right',
            autoClose:3000,
          })
        })
    }
  };

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>{isEdit ? 'Chỉnh sửa danh muc5 Profile' : 'Thêm mới Danh mục'}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group className="mb-3">
            <Form.Label>Name</Form.Label>
            <Form.Control
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </Form.Group>
          
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Cancel
        </Button>
        <Button variant="primary" onClick={handleSubmit}>
          {isEdit ? 'Cập nhật' : 'Thêm mới'}
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ModlaAdddanhsachsanpham;
