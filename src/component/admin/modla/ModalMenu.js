import React, { useState, useEffect } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import axios from 'axios';
import { toast } from 'react-toastify';

const ModalMenu = ({ show, handleClose, isEdit, menu, fetchMenuList }) => {
  const [name, setName] = useState('');
  const [thutuhien, setThutuhien] = useState('');
  const [url, setUrl] = useState('');

  useEffect(() => {
    if (isEdit && menu && menu.id) {
      setName(menu.name);
      setThutuhien(menu.thutuhien);
      setUrl(menu.url);
    } else {
      setName('');
      setThutuhien('');
      setUrl('');
    }
  }, [isEdit, menu]);
  

  const handleSubmit = async () => {
    const menuData = { name, thutuhien, url };
  
    try {
      if (isEdit && menu && menu.id) {
        // PUT request
        await axios.put(`${process.env.REACT_APP_BASEURL}/api/menu/${menu.id}`, menuData);
        toast.success('Cập nhật menu thành công', { position: 'top-right', autoClose: 3000 });
      } else {
        // POST request
        await axios.post(`${process.env.REACT_APP_BASEURL}/api/menu`, menuData);
        toast.success('Thêm mới menu thành công', { position: 'top-right', autoClose: 3000 });
      }
      fetchMenuList();
      handleClose();
    } catch (error) {
      console.error('Lỗi khi xử lý PUT:', error.response?.data || error.message);
      toast.error(`Có lỗi khi xử lý: ${error.response?.data?.message || error.message}`, { position: 'top-right', autoClose: 3000 });
    }
  };
  
  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>{isEdit ? 'Chỉnh sửa menu' : 'Thêm mới menu'}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group controlId="menuName">
            <Form.Label>Tên menu</Form.Label>
            <Form.Control
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Nhập tên menu"
            />
          </Form.Group>
          <Form.Group controlId="menuThutuhien">
            <Form.Label>Thứ tự hiển thị</Form.Label>
            <Form.Control
              type="number"
              value={thutuhien}
              onChange={(e) => setThutuhien(e.target.value)}
              placeholder="Nhập thứ tự hiển thị"
            />
          </Form.Group>
          <Form.Group controlId="menuUrl">
            <Form.Label>URL</Form.Label>
            <Form.Control
              type="text"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              placeholder="Nhập URL"
            />
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Đóng
        </Button>
        <Button variant="primary" onClick={handleSubmit}>
          {isEdit ? 'Cập nhật' : 'Thêm'}
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ModalMenu;
