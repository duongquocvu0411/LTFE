import React, { useContext, useEffect, useState } from "react";
import Footerusers from "../Footerusers";
import axios from "axios";
import HeaderUsers from "../HeaderUsers";
import { CartContext } from "./CartContext";


const Shop = () => {
  const [danhmuc, setDanhmuc] = useState([]); // Khởi tạo state lưu trữ danh mục
  const [sanpham, setSanpham] = useState([]);
  const [selectedDanhmuc, setSelectedDanhmuc] = useState(""); // Danh mục được chọn
  const {addToCart} = useContext(CartContext);

  //phân trang
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 6;


  // Gọi API lấy danh mục và sản phẩm
  useEffect(() => {
    fetchSanpham();
    fetchDanhmuc();
  }, [selectedDanhmuc]); // Chạy lại khi thay đổi danh mục


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
      ? `http://127.0.0.1:8000/api/products?danhsachsanpham_id=${selectedDanhmuc}` // Nếu có danh mục thì lọc
      : 'http://127.0.0.1:8000/api/products'; // Nếu không, lấy tất cả sản phẩm
    const response = await axios.get(url);
    setSanpham(response.data);
   
  } catch (error) {
    console.error('Error fetching sản phẩm:', error);
  }
};


// phân trang

// Calculate indices for pagination
const indexOfLastProduct = currentPage * productsPerPage;
const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
const currentProducts = sanpham.slice(indexOfFirstProduct, indexOfLastProduct);

// Pagination handler
const paginate = (pageNumber) => setCurrentPage(pageNumber);
const totalPages = Math.ceil(sanpham.length / productsPerPage);

  return (
    <div>
      <HeaderUsers />

      <div>

        {/* Single Page Header start */}
        <div className="container-fluid page-header py-5">
          <h1 className="text-center text-white display-6">Shop</h1>
          <ol className="breadcrumb justify-content-center mb-0">
            <li className="breadcrumb-item"><a href="#">Home</a></li>
            <li className="breadcrumb-item"><a href="#">Pages</a></li>
            <li className="breadcrumb-item active text-white">Shop</li>
          </ol>
        </div>
        {/* Single Page Header End */}

        {/* Fruits Shop Start*/}
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
                        value={selectedDanhmuc} // Giá trị danh mục được chọn
                        onChange={(e) => setSelectedDanhmuc(e.target.value)} // Cập nhật danh mục được chọn
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
                    <div className="row g-4">
                      <div className="col-lg-12">
                        <div className="mb-3">
                          <h4>Categories</h4>
                          <ul className="list-unstyled fruite-categorie">
                            <li>
                              <div className="d-flex justify-content-between fruite-name">
                                <a href="#">
                                  <i className="fas fa-apple-alt me-2" />
                                  Apples
                                </a>
                                <span>(3)</span>
                              </div>
                            </li>
                            <li>
                              <div className="d-flex justify-content-between fruite-name">
                                <a href="#">
                                  <i className="fas fa-apple-alt me-2" />
                                  Oranges
                                </a>
                                <span>(5)</span>
                              </div>
                            </li>
                            <li>
                              <div className="d-flex justify-content-between fruite-name">
                                <a href="#">
                                  <i className="fas fa-apple-alt me-2" />
                                  Strawbery
                                </a>
                                <span>(2)</span>
                              </div>
                            </li>
                            <li>
                              <div className="d-flex justify-content-between fruite-name">
                                <a href="#">
                                  <i className="fas fa-apple-alt me-2" />
                                  Banana
                                </a>
                                <span>(8)</span>
                              </div>
                            </li>
                            <li>
                              <div className="d-flex justify-content-between fruite-name">
                                <a href="#">
                                  <i className="fas fa-apple-alt me-2" />
                                  Pumpkin
                                </a>
                                <span>(5)</span>
                              </div>
                            </li>
                          </ul>
                        </div>
                      </div>
                      

                      {/* Additional */}
                      <div className="col-lg-12">
                        <div className="mb-3">
                          <h4>Additional</h4>
                          <div className="mb-2">
                            <input
                              type="radio"
                              className="me-2"
                              id="Categories-1"
                              name="Categories-1"
                              defaultValue="Beverages"
                            />
                            <label htmlFor="Categories-1"> Organic</label>
                          </div>
                          <div className="mb-2">
                            <input
                              type="radio"
                              className="me-2"
                              id="Categories-2"
                              name="Categories-1"
                              defaultValue="Beverages"
                            />
                            <label htmlFor="Categories-2"> Fresh</label>
                          </div>
                          <div className="mb-2">
                            <input
                              type="radio"
                              className="me-2"
                              id="Categories-3"
                              name="Categories-1"
                              defaultValue="Beverages"
                            />
                            <label htmlFor="Categories-3"> Sales</label>
                          </div>
                          <div className="mb-2">
                            <input
                              type="radio"
                              className="me-2"
                              id="Categories-4"
                              name="Categories-1"
                              defaultValue="Beverages"
                            />
                            <label htmlFor="Categories-4"> Discount</label>
                          </div>
                          <div className="mb-2">
                            <input
                              type="radio"
                              className="me-2"
                              id="Categories-5"
                              name="Categories-1"
                              defaultValue="Beverages"
                            />
                            <label htmlFor="Categories-5"> Expired</label>
                          </div>
                        </div>
                      </div>

                    
                      
                    </div>
                  </div>
               
                 <div className="col-lg-9">
                    <div className="row g-4 justify-content-center">
                      {currentProducts.map((product) => (
                        <div key={product.id} className="col-md-6 col-lg-6 col-xl-4 d-flex">
                          <div className="rounded position-relative fruite-item card h-100 w-100 ">
                            <div className="fruite-img card-img-top">
                              <img
                                  src={`http://127.0.0.1:8000/storage/${product.image}`} 
                                className="img-fluid w-100 rounded-top"
                                alt={product.title}
                                style={{ height: 250, objectFit: 'cover' }}
                              />
                            </div>
                            <div
                              className="text-white bg-secondary px-3 py-1 rounded position-absolute"
                              style={{ top: 10, left: 10 }}
                            >
                              Fruits
                            </div>
                            <div className="card-body d-flex flex-column rounded-bottom">
                              <h4>{product.title}</h4>
                              <p>{product.description}</p>
                              <div className=" d-flex justify-content-between flex-lg-wrap">
                                <p className="text-dark fs-5 fw-bold mb-0">${product.price} / kg</p>
                                <button 
                                  onClick={() => addToCart(product)} // Thêm sản phẩm
                                  className="btn border border-secondary rounded-pill px-3 text-primary">
                                  <i className="fa fa-shopping-bag me-2 text-primary" /> Add to cart
                                </button>
                                {/* <a
                                  href="#"
                                  className="btn border border-secondary rounded-pill px-3 text-primary"
                                >
                                  <i className="fa fa-shopping-bag me-2 text-primary" /> Add to cart
                                </a> */}
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
        {/* Fruits Shop End*/}
      </div>

      <Footerusers />
    </div>
  );
};

export default Shop;
