import React, { useEffect, useState } from 'react';
import Sidebar from './../Sidebar';
import Footer from './../Footer';
import Header from './../Header';
import axios from 'axios';
import { Modal, Button,Form, ModalHeader, ModalTitle, ModalBody } from 'react-bootstrap';



const Profile = () => {
  const [sanpham, setSanpham] = useState([]);
  const [showModal, setShowModal] = useState(false); //MODLA CHO FROM EDIT SẢN PHẨM
  const [showAddModal, setShowAddModal] = useState(false); // Modal cho thêm sản phẩm
  const [tensp, setTensp] = useState('');
  const [gia, setGia] = useState('');
  const [hinhanh, setHinhanh] = useState(null);
  const [currentProduct, setCurrentProduct] = useState({ id: '', tensp: '', gia: '', hinhanh: '' });

  useEffect(() => {
    fetchSanpham();
  }, []);

  const fetchSanpham = async () => {
    try {
      const response = await axios.get('http://127.0.0.1:8000/api/sanpham');
      setSanpham(response.data);
    } catch (error) {
      console.error('Error fetching sanpham:', error);
    }
  };

  const DeleteSanpham = async (id) => {
    try {
      await axios.delete(`http://127.0.0.1:8000/api/sanpham/${id}`);
      fetchSanpham(); // làm mới danh sách sản phẩm sau khi xóa 1 sản phẩm
      alert('Đã xóa sản phẩm thành công');
    } catch (error) {
      console.error('Error deleting product:', error);
    }
  };

  const handleEditClick = (product) => {
    setCurrentProduct(product);
    setShowModal(true); // Hiển thị modal khi nhấn nút Edit
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const handleSaveChanges = async () => {
    try {
      // Tạo đối tượng chứa dữ liệu sản phẩm (không bao gồm hình ảnh)
      const productData = {
        tensp: currentProduct.tensp,
        gia: currentProduct.gia,
      };
  
      // Gọi API PUT với JSON data
      await axios.put(`http://127.0.0.1:8000/api/sanpham/${currentProduct.id}`, productData, {
        headers: {
          'Content-Type': 'application/json', // Đảm bảo rằng bạn đang gửi dữ liệu JSON
        },
      });
  
      alert('Đã cập nhật sản phẩm thành công');
      setShowModal(false); // Đóng modal sau khi cập nhật thành công
      fetchSanpham(); // Refresh danh sách sản phẩm sau khi cập nhật
    } catch (error) {
      console.error('Error updating product:', error);
    }
  };

  // ADD PRODUCT
  const handleAddProduct = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('tensp', tensp);
    formData.append('gia', gia);
    formData.append('hinhanh', hinhanh);

    try {
      const response = await axios.post('http://127.0.0.1:8000/api/sanpham', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      console.log('Product created:', response.data);

      // Clear the form fields
      setTensp('');
      setGia('');
      setHinhanh(null);

      // Fetch updated list of products
      fetchSanpham();
      setShowAddModal(false); // Đóng modal thêm sản phẩm sau khi thành công
      alert("Product added successfully!");
    } catch (error) {
      console.error('Error posting sanpham:', error);
    }
  };
  

  return (
    <>
      <div>
        <Header />
        <div className="d-flex">
          <Sidebar/>
          <div className="flex-grow-1 p-4">
            <div className="container">
              <h1>Cart</h1>   
              <div className='text-end'>
              <Button variant="primary" onClick={() => setShowAddModal(true)} >
              <i class="bi bi-file-plus-fill"></i>
              </Button>
              </div>
                <table className="table table table-hover">
                  <thead>
                    <tr>
                      <th scope="col">Products</th>
                      <th scope="col">Name</th>
                      <th scope="col">Price</th>
                      <th scope="col">Handle</th>
                    </tr>
                  </thead>
                  <tbody>
                    {sanpham.map((item) => (
                      <tr key={item.id}>
                        <th scope="row">
                          <div className="d-flex align-items-center">
                            <img
                              src={`http://127.0.0.1:8000/${item.hinhanh}`}
                              className="img-fluid me-5 rounded-circle"
                              style={{ width: 80, height: 80 }}
                              alt={item.tensp}
                            />
                          </div>
                        </th>
                        <td>
                          <p className="mb-0 mt-4">{item.tensp}</p>
                        </td>
                        <td>
                          <p className="mb-0 mt-4">{item.gia} $</p>
                        </td>
                        <td>
                          <button
                            className="btn btn-md rounded-circle bg-light border mt-4 me-2"
                            onClick={() => handleEditClick(item)}
                          >
                            <i className="fa fa-edit text-warning" />
                          </button>
                          <button
                            className="btn btn-md rounded-circle bg-light border mt-4"
                            onClick={() => DeleteSanpham(item.id)}
                          >
                            <i className="fa fa-times text-danger" />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
            
            </div>
          </div>
        </div>
        <Footer />
      </div>
 {/* Modal for adding product */}
 <Modal show={showAddModal} onHide={() => setShowAddModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Add Product</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleAddProduct}>
            <Form.Group controlId="formTenspAdd">
              <Form.Label>Product Name</Form.Label>
              <Form.Control
                type="text"
                value={tensp}
                onChange={(e) => setTensp(e.target.value)}
              />
            </Form.Group>
            <Form.Group controlId="formGiaAdd" className="mt-3">
              <Form.Label>Price</Form.Label>
              <Form.Control
                type="number"
                value={gia}
                onChange={(e) => setGia(e.target.value)}
              />
            </Form.Group>
            <Form.Group controlId="formHinhanhAdd" className="mt-3">
              <Form.Label>Product Image</Form.Label>
              <Form.Control
                type="file"
                onChange={(e) => setHinhanh(e.target.files[0])}
              />
            </Form.Group>
            <Button variant="primary" type="submit" className="mt-3">
              Save Product
            </Button>
          </Form>
        </Modal.Body>
      </Modal>

      {/* Modal from EDIT */}
      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Product</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="formTensp">
              <Form.Label>Product Name</Form.Label>
              <Form.Control
                type="text"
                value={currentProduct.tensp}
                onChange={(e) => setCurrentProduct({ ...currentProduct, tensp: e.target.value })}
              />
            </Form.Group>
            <Form.Group controlId="formGia" className="mt-3">
              <Form.Label>Price</Form.Label>
              <Form.Control
                type="number"
                value={currentProduct.gia}
                onChange={(e) => setCurrentProduct({ ...currentProduct, gia: e.target.value })}
              />
            </Form.Group>
            {/* <Form.Group controlId="formHinhanh" className="mt-3">
              <Form.Label>Product Image</Form.Label>
              <Form.Control
                type="file"
                onChange={(e) => setCurrentProduct({ ...currentProduct, hinhanh: e.target.files[0] })}
              />
            </Form.Group> */}
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
            Close
          </Button>
          <Button variant="primary" onClick={handleSaveChanges}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default Profile;
