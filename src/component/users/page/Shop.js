import React, { useEffect, useState } from "react";
import Tieude from "../HeaderUsers";
import Footerusers from "../Footerusers";
import axios from "axios";

// const products = [
//   { id: 1, name: 'Grapes', price: 4.99, image: 'img/fruite-item-5.jpg' },
//   { id: 2, name: 'Raspberries', price: 4.99, image: 'img/fruite-item-2.jpg' },
//   { id: 3, name: 'Oranges', price: 4.99, image: 'img/fruite-item-1.jpg' },
//   { id: 4, name: 'Banana', price: 4.99, image: 'img/fruite-item-3.jpg' },
//   { id: 5, name: 'Apricots', price: 4.99, image: 'img/fruite-item-4.jpg' },
//   { id: 6, name: 'Big Banana', price: 2.99, image: 'img/fruite-item-5.jpg' },
//   { id: 7, name: 'Pineapple', price: 3.99, image: 'img/fruite-item-2.jpg' },
//   { id: 8, name: 'Apples', price: 2.49, image: 'img/fruite-item-6.jpg' },
//   { id: 9, name: 'Pumpkin', price: 5.99, image: 'img/fruite-item-2.jpg' },
//   { id: 10, name: 'Mango', price: 3.49, image: 'img/best-product-4.jpg' },
//   { id: 11, name: 'Pumpkin', price: 5.99, image: 'img/best-product-5.jpg' },
//   { id: 12  , name: 'Mango', price: 3.49, image: 'img/best-product-4.jpg' },
  
  
// ];

const Shop = () => {
  //phân trang
  const [currentPage, setCurrentPage] = useState(1);
  const [sanpham, setSanpham] = useState([]);
  const productsPerPage = 6;


// api get sản phẩm 

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
      <Tieude />

      <div>
        {/* start seach */}
      <div className="modal fade" id="searchModal" tabIndex={-1} aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div className="modal-dialog modal-fullscreen">
    <div className="modal-content rounded-0">
      <div className="modal-header">
        <h5 className="modal-title" id="exampleModalLabel">Search by keyword</h5>
        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" />
      </div>
      <div className="modal-body d-flex align-items-center">
        <div className="input-group w-75 mx-auto d-flex">
          <input type="search" className="form-control p-3" placeholder="keywords" aria-describedby="search-icon-1" />
          <span id="search-icon-1" className="input-group-text p-3"><i className="fa fa-search" /></span>
        </div>
      </div>
    </div>
  </div>
</div>

{/* end seach */}
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
                        placeholder="keywords"
                        aria-describedby="search-icon-1"
                      />
                      <span id="search-icon-1" className="input-group-text p-3">
                        <i className="fa fa-search" />
                      </span>
                    </div>
                  </div>
                  <div className="col-6" />
                  <div className="col-xl-3">
                    <div className="bg-light ps-3 py-3 rounded d-flex justify-content-between mb-4">
                      <label htmlFor="fruits">Default Sorting:</label>
                      <select
                        id="fruits"
                        name="fruitlist"
                        className="border-0 form-select-sm bg-light me-3"
                        form="fruitform"
                      >
                        <option value="volvo">Nothing</option>
                        <option value="saab">Popularity</option>
                        <option value="opel">Organic</option>
                        <option value="audi">Fantastic</option>
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
                      <div className="col-lg-12">
                        <div className="mb-3">
                          <h4 className="mb-2">Price</h4>
                          <input
                            type="range"
                            className="form-range w-100"
                            id="rangeInput"
                            name="rangeInput"
                            min={0}
                            max={500}
                            defaultValue={0}
                            onInput="amount.value=rangeInput.value"
                          />
                          <output id="amount" name="amount" htmlFor="rangeInput">
                            0
                          </output>
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

                      {/* Featured products */}
                      <div className="col-lg-12">
                        <h4 className="mb-3">Featured products</h4>
                        <div className="d-flex align-items-center justify-content-start">
                          <div className="rounded me-4" style={{ width: 100, height: 100 }}>
                            <img src="img/featur-1.jpg" className="img-fluid rounded" alt="Featured product" />
                          </div>
                          <div>
                            <h6 className="mb-2">Big Banana</h6>
                            <div className="d-flex mb-2">
                              <i className="fa fa-star text-secondary" />
                              <i className="fa fa-star text-secondary" />
                              <i className="fa fa-star text-secondary" />
                              <i className="fa fa-star text-secondary" />
                              <i className="fa fa-star" />
                            </div>
                            <div className="d-flex mb-2">
                              <h5 className="fw-bold me-2">2.99 $</h5>
                              <h5 className="text-danger text-decoration-line-through">4.11 $</h5>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Product List */}
                 {/* Product List */}
                 <div className="col-lg-9">
                    <div className="row g-4 justify-content-center">
                      {currentProducts.map((product) => (
                        <div key={product.id} className="col-md-6 col-lg-6 col-xl-4">
                          <div className="rounded position-relative fruite-item">
                            <div className="fruite-img">
                              <img
                                  src={`http://127.0.0.1:8000/${product.hinhanh}`}
                                className="img-fluid w-100 rounded-top"
                                alt={product.tensp}
                              />
                            </div>
                            <div
                              className="text-white bg-secondary px-3 py-1 rounded position-absolute"
                              style={{ top: 10, left: 10 }}
                            >
                              Fruits
                            </div>
                            <div className="p-4 border border-secondary border-top-0 rounded-bottom">
                              <h4>{product.tensp}</h4>
                              <p>Lorem ipsum dolor sit amet consectetur adipisicing elit sed do eiusmod te incididunt</p>
                              <div className="d-flex justify-content-between flex-lg-wrap">
                                <p className="text-dark fs-5 fw-bold mb-0">${product.gia} / kg</p>
                                <a
                                  href="#"
                                  className="btn border border-secondary rounded-pill px-3 text-primary"
                                >
                                  <i className="fa fa-shopping-bag me-2 text-primary" /> Add to cart
                                </a>
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
