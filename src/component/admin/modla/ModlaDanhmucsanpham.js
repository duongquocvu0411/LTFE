import React, { useEffect, useState } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import axios from 'axios';
import { toast } from 'react-toastify';

const ModlaAdddanhsachsanpham = ({ show, handleClose, isEdit, danhmuc, fetchdanhmucs }) => {
  const [name, setName] = useState('');


  useEffect(() => {
    if (isEdit && danhmuc) {
      setName(danhmuc.name);

    } else {
      setName('');

    }
  }, [isEdit, danhmuc]);
  const handleSubmit = async () => {
    try {
      const token = localStorage.getItem('adminToken'); // Lấy token từ localStorage

      if (isEdit) {
        // Cập nhật danh mục hiện tại
        await axios.put(
          `${process.env.REACT_APP_BASEURL}/api/danhmucsanpham/${danhmuc.id}`,
          { name }
          // ,
          // {
          //   headers: {
          //     Authorization: `Bearer ${token}`, // Thêm token vào header
          //   },
          // }
        );

        toast.success(`Danh mục ${name} đã được cập nhật thành công!`, {
          position: 'top-right',
          autoClose: 3000,
        });

        fetchdanhmucs(); // Làm mới danh sách
        resetForm();
        handleClose(); // Đóng modal

      } else {
        // Thêm mới danh mục
        await axios.post(
          `${process.env.REACT_APP_BASEURL}/api/danhmucsanpham`,
          { name },
          {
            headers: {
              Authorization: `Bearer ${token}`, // Thêm token vào header
            },
          }
        );

        toast.success(`Danh mục ${name} đã được thêm thành công!`, {
          position: 'top-right',
          autoClose: 3000,
        });

        fetchdanhmucs(); // Làm mới danh sách
        handleClose(); // Đóng modal
      }
    } catch (error) {
      console.error(isEdit ? "Có lỗi khi sửa danh mục!" : "Có lỗi xảy ra khi thêm mới danh mục.", error);

      // Hiển thị thông báo lỗi
      toast.error(
        isEdit ? "Có lỗi xảy ra khi cập nhật danh mục. Vui lòng thử lại." : `Có lỗi xảy ra khi thêm mới danh mục ${name}`,
        {
          position: 'top-right',
          autoClose: 3000,
        }
      );
    }
  };

  const resetForm = () => {
    setName("");
  }


  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>{isEdit ? 'Chỉnh sửa danh mục ' : 'Thêm mới Danh mục'}</Modal.Title>
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
