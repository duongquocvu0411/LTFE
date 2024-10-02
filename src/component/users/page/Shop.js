import React, { useContext, useEffect, useState } from "react";
import Footerusers from "../Footerusers";
import axios from "axios";
import HeaderUsers from "../HeaderUsers";
import { CartContext } from "./CartContext";
import { Link } from "react-router-dom";

const Shop = () => {
  const [danhmuc, setDanhmuc] = useState([]);
  const [sanpham, setSanpham] = useState([]);
  const [selectedDanhmuc, setSelectedDanhmuc] = useState("");
  const { addToCart } = useContext(CartContext);

  // Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 6;

  // Fetch categories and products
  useEffect(() => {
    fetchDanhmuc();
    fetchSanpham();
  }, [selectedDanhmuc]); // Run again when category changes

  const fetchDanhmuc = async () => {
    try {
      const response = await axios.get('http://127.0.0.1:8000/api/danhsachsanpham');
      setDanhmuc(response.data);
    } catch (error) {
      console.error('Error fetching Danh mục:', error);
    }
  };

  const fetchSanpham = async () => {
    try {
      const url = selectedDanhmuc
        ? `http://127.0.0.1:8000/api/products?danhsachsanpham_id=${selectedDanhmuc}`
        : 'http://127.0.0.1:8000/api/products';
      const response = await axios.get(url);
      setSanpham(response.data);
    } catch (error) {
      console.error('Error fetching sản phẩm:', error);
    }
  };

  // Pagination logic
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = sanpham.slice(indexOfFirstProduct, indexOfLastProduct);
  const totalPages = Math.ceil(sanpham.length / productsPerPage);
  const paginate = (pageNumber) => setCurrentPage(pageNumber);



  return (
    <div>
      <HeaderUsers />

      <div>
        {/* Page Header */}
        <div className="container-fluid page-header py-5">
          <h1 className="text-center text-white display-6">Shop</h1>
          <ol className="breadcrumb justify-content-center mb-0">
            <li className="breadcrumb-item"><a href="#">Home</a></li>
            <li className="breadcrumb-item"><a href="#">Pages</a></li>
            <li className="breadcrumb-item active text-white">Shop</li>
          </ol>
        </div>

        {/* Fruits Shop Start */}
        <div className="container-fluid fruite py-5">
          <div className="container py-5">
            <h1 className="mb-4">Fresh fruits shop</h1>
            <div className="row g-4">
              <div className="col-lg-12">
                <div className="row g-4">
                  <div className="col-xl-3">
                    <div className="input-group w-100 mx-auto d-flex">
                      <input
                        type="search"
                        className="form-control p-3"
                        placeholder="Search products..."
                      />
                      <span id="search-icon-1" className="input-group-text p-3">
                        <i className="fa fa-search" />
                      </span>
                    </div>
                  </div>

                  <div className="col-6" />

                  <div className="col-xl-3">
                    <div className="bg-light ps-3 py-3 rounded d-flex justify-content-between mb-4">
                      <label htmlFor="fruits">Sort by category:</label>
                      <select
                        id="fruits"
                        name="fruitlist"
                        className="border-0 form-select-sm bg-light me-3"
                        value={selectedDanhmuc}
                        onChange={(e) => setSelectedDanhmuc(e.target.value)}
                      >
                        <option value="">All Categories</option>
                        {danhmuc.map((danhmucs) => (
                          <option key={danhmucs.id} value={danhmucs.id}>
                            {danhmucs.name}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                </div>

                <div className="row g-4">
                  {/* Categories */}
                  <div className="col-lg-3">
                    {/* Categories List (if needed) */}
                    {/* Your categories code */}
                  </div>

                  {/* Product List */}
                  <div className="col-lg-9">
                    <div className="row g-4 justify-content-center">
                      {currentProducts.map((product) => (
                        <div key={product.id} className="col-md-6 col-lg-6 col-xl-4 d-flex">
                          <div className="rounded position-relative fruite-item card h-100 w-100 ">
                            <div className="fruite-img card-img-top">
                              <Link to={`/shop/${product.id}`}>
                                <img
                                  src={`http://127.0.0.1:8000/storage/${product.image}`}
                                  className="img-fluid w-100 rounded-top"
                                  alt={product.title}
                                  style={{ height: 250, objectFit: 'cover' }}
                                />
                              </Link>
                            </div>
                            <div className="text-white bg-secondary px-3 py-1 rounded position-absolute" style={{ top: 10, left: 10 }}>
                              Fruits
                            </div>
                            <div className="card-body d-flex flex-column rounded-bottom">
                              <h4>{product.title}</h4>
                              
                              <Link to={`/shop/${product.id}`} className="btn btn-link">(xem chi tiết sản phẩm)</Link>
         
                              <div className="d-flex justify-content-between flex-lg-wrap">
                                <p className="text-dark fs-5 fw-bold mb-0">{product.price} vnđ / kg</p>
                                <button
                                  onClick={() => addToCart(product)}
                                  className="btn border border-secondary rounded-pill px-3 text-primary">
                                  <i className="fa fa-shopping-bag me-2 text-primary" /> Add to cart
                                </button>
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>

                    {/* Pagination */}
                    <div className="col-12">
                      <div className="pagination d-flex justify-content-center mt-5">
                        <a href="#" className="rounded" onClick={() => paginate(currentPage > 1 ? currentPage - 1 : 1)}>«</a>
                        {[...Array(totalPages)].map((_, i) => (
                          <a
                            href="#"
                            key={i + 1}
                            onClick={() => paginate(i + 1)}
                            className={`rounded ${currentPage === i + 1 ? 'active' : ''}`}
                          >
                            {i + 1}
                          </a>
                        ))}
                        <a href="#" className="rounded" onClick={() => paginate(currentPage < totalPages ? currentPage + 1 : totalPages)}>»</a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* Fruits Shop End */}
      </div>

      <Footerusers />
    </div>
  );
};

export default Shop;
