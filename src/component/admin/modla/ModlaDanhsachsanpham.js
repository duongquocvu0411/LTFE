import React, { useEffect, useState } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import axios from 'axios';

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
      axios.put(`http://127.0.0.1:8000/api/danhsachsanpham/${product.id}`, { name })
        .then(() => {
          fetchProducts(); // Refresh profile list
          handleClose(); // Close modal
        })
        .catch(error => console.log('Error updating profile:', error));
    } else {
      // Add new profile
      axios.post('http://127.0.0.1:8000/api/danhsachsanpham', { name })
        .then(() => {
          fetchProducts(); // Refresh profile list
          handleClose(); // Close modal
        })
        .catch(error => console.log('Error adding profile:', error));
    }
  };

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>{isEdit ? 'Edit Profile' : 'Add Profile'}</Modal.Title>
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
          {isEdit ? 'Update' : 'Add'}
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ModlaAdddanhsachsanpham;
