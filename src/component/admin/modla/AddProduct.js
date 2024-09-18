import React, { useState, useEffect } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import axios from 'axios';

const AddOrEditProductModal = ({ show, handleClose, isEdit, product, fetchProducts }) => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [price, setPrice] = useState('');
    const [image, setImage] = useState(null); // Lưu trữ file hình ảnh
    const [categoryId, setCategoryId] = useState(''); // Lưu trữ danh mục được chọn
    const [categories, setCategories] = useState([]); // Lưu trữ danh sách danh mục

    // Lấy danh sách các danh mục sản phẩm từ API
    useEffect(() => {
        axios.get('http://127.0.0.1:8000/api/danhsachsanpham')
            .then(response => {
                setCategories(response.data); // Lưu danh sách danh mục
            })
            .catch(error => {
                console.log('Có lỗi khi lấy dữ liệu từ API ', error);
            });

        if (isEdit && product) {
            setTitle(product.title);
            setDescription(product.description);
            setPrice(product.price);
            setImage(product.image);
            setCategoryId(product.danhsachsanpham_id); // Set danh mục sản phẩm nếu đang chỉnh sửa
        } else {
            setTitle('');
            setDescription('');
            setPrice('');
            setImage(null);
            setCategoryId(''); // Xóa danh mục nếu không phải chỉnh sửa
        }
    }, [isEdit, product]);

    const handleSubmit = async () => {
        const formData = new FormData();
        formData.append('title', title);
        formData.append('description', description);
        formData.append('price', price);
        formData.append('danhsachsanpham_id', categoryId); // Thêm danh mục sản phẩm
        if (image instanceof File) {
            formData.append('image', image);
        }

        if (isEdit) {
            // Sửa sản phẩm
            axios.post(`http://127.0.0.1:8000/api/products/${product.id}?_method=PUT`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            })
            .then(() => {
                fetchProducts(); // Cập nhật danh sách sản phẩm
                handleClose(); // Đóng modal
            })
            .catch(error => console.log('Error updating product:', error));
        } else {
            // Thêm sản phẩm mới
            axios.post('http://127.0.0.1:8000/api/products', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            })
            .then(() => {
                fetchProducts(); // Cập nhật danh sách sản phẩm
                handleClose(); // Đóng modal
            })
            .catch(error => console.log('Error adding product:', error));
        }
    };

    return (
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>{isEdit ? 'Sửa sản phẩm' : 'Thêm sản phẩm'}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Form.Group className="mb-3">
                        <Form.Label>Tiêu đề</Form.Label>
                        <Form.Control
                            type="text"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                        />
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>Mô tả</Form.Label>
                        <Form.Control
                            as="textarea"
                            rows={3}
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                        />
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>Giá</Form.Label>
                        <Form.Control
                            type="number"
                            value={price}
                            onChange={(e) => setPrice(e.target.value)}
                        />
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>Danh mục sản phẩm</Form.Label>
                        <Form.Control
                            as="select"
                            value={categoryId}
                            onChange={(e) => setCategoryId(e.target.value)}
                        >
                            <option value="">Chọn danh mục sản phẩm</option>
                            {categories.map((category) => (
                                <option key={category.id} value={category.id}>
                                    {category.name}
                                </option>
                            ))}
                        </Form.Control>
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>Hình ảnh</Form.Label>
                        <Form.Control
                            type="file"
                            onChange={(e) => setImage(e.target.files[0])}
                        />
                    </Form.Group>
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                    Hủy
                </Button>
                <Button variant="primary" onClick={handleSubmit}>
                    {isEdit ? 'Cập nhật' : 'Thêm'}
                </Button>
            </Modal.Footer>
        </Modal>
    );
};

export default AddOrEditProductModal;
