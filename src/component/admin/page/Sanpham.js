import React, { useEffect, useState } from 'react';
import Sidebar from '../Sidebar';
import Footer from '../Footer';
import Header from '../Header';
import axios from 'axios';
import AddOrEditProductModal from '../modla/AddProduct';
import { Button } from 'react-bootstrap';

const Sanpham = () => {
  const [products, setProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 4;

  // Phân trang
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const PageProducts = products.slice(indexOfFirstProduct, indexOfLastProduct);
  const totalPages = Math.ceil(products.length / productsPerPage);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const [showModal, setShowModal] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [currentProduct, setCurrentProduct] = useState(null);

  // Lấy danh sách sản phẩm từ API Laravel
  const fetchProducts = () => {
    axios.get('http://127.0.0.1:8000/api/products')
      .then(response => {
        setProducts(response.data);
      })
      .catch(error => {
        console.log('Có lỗi khi lấy dữ liệu từ API ', error);
      });
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  // Mở modal thêm sản phẩm mới
  const handleAddProduct = () => {
    setIsEdit(false);
    setCurrentProduct(null);
    setShowModal(true);
  };

  // Mở modal sửa sản phẩm
  const handleEditProduct = (product) => {
    setIsEdit(true);
    setCurrentProduct(product);
    setShowModal(true);
  };

  // Xóa sản phẩm
  const handleDeleteProduct = (id) => {
    axios.delete(`http://127.0.0.1:8000/api/products/${id}`)
      .then(() => {
        window.alert('đã xóa sản phẩm thành công');
        fetchProducts(); // Cập nhật danh sách sản phẩm
       
      })
      .catch(error => console.log('Error deleting product:', error));
  };

  return (
    <div>
      <Header />
      <div className="d-flex ">
        <Sidebar />
        <div className="flex-grow-1">
          <div className="container">
            <h1 className="mb-4">Danh sách sản phẩm</h1>

            <div className="text-end mb-3">
              <button className="btn btn-primary" onClick={handleAddProduct}>
                <i className="bi bi-file-plus-fill"></i> Thêm sản phẩm
              </button>
            </div>

            {/* Bảng sản phẩm */}
            <div className="table-responsive" style={{ maxHeight: '400px', overflowY: 'auto' }}>
            <table className="table table-bordered border-dark table-hover">
              <thead>
                <tr>
                  <th scope="col">Hình ảnh</th>
                  <th scope="col">Tên</th>
                  <th scope="col">Nội dung</th>
                  <th scope="col">Giá</th>
                  <th scope="col">Chức năng</th>
                </tr>
              </thead>
              <tbody>
                {PageProducts.map(product => (
                  <tr key={product.id}>
                    <th scope="row">
                      <div className="d-flex align-items-center">
                        <img 
                          src={`http://127.0.0.1:8000/storage/${product.image}`} 
                          alt={product.title} 
                          style={{ height: '50px', objectFit: 'cover' }} 
                        />
                      </div>
                    </th>
                    <td>
                      <p className="mb-0 mt-4">{product.title}</p>
                    </td>
                    <td>
                      <p className="mb-0 mt-4">{product.description}</p>
                    </td>
                    <td>
                      <p className="mb-0 mt-4">{product.price} vnđ</p>
                    </td>
                    <td>
                      <Button variant="primary" onClick={() => handleEditProduct(product)}>Sửa</Button>
                      <Button variant="danger" onClick={() => handleDeleteProduct(product.id)}>Xóa</Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
            {/* Pagination */}
            <div className="d-flex justify-content-center mt-5">
              <ul className="pagination">
                <li className={`page-item ${currentPage === 1 && 'disabled'}`}>
                  <button className="page-link" onClick={() => paginate(currentPage > 1 ? currentPage - 1 : 1)}>«</button>
                </li>
                {[...Array(totalPages)].map((_, i) => (
                  <li key={i + 1} className={`page-item ${currentPage === i + 1 && 'active'}`}>
                    <button className="page-link" onClick={() => paginate(i + 1)}>{i + 1}</button>
                  </li>
                ))}
                <li className={`page-item ${currentPage === totalPages && 'disabled'}`}>
                  <button className="page-link" onClick={() => paginate(currentPage < totalPages ? currentPage + 1 : totalPages)}>»</button>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Modal Thêm/Sửa Sản Phẩm */}
      <AddOrEditProductModal
        show={showModal}
        handleClose={() => setShowModal(false)}
        isEdit={isEdit}
        product={currentProduct}
        fetchProducts={fetchProducts}
      />

      <Footer />
    </div>
  );
};

export default Sanpham;
