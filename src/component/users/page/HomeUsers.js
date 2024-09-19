import React, { useEffect, useState } from 'react';

import Tieude from '../HeaderUsers';
import Footerusers from '../Footerusers';
import axios from 'axios';

const HomeUsers = () => {

  const [danhmuc, setDanhmuc] = useState([]); // Khởi tạo state lưu trữ danh mục
  const [sanpham, setSanpham] = useState([]);
  const [selectedDanhmuc, setSelectedDanhmuc] = useState(""); // Danh mục được chọn

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

  // // Hàm lọc sản phẩm theo danh mục
  // const locSanPhamTheoDanhMuc = (idDanhMuc) => {
  //   setSelectedDanhmuc(idDanhMuc);
  // };

  // Hàm lấy tên danh mục dựa trên id
  const layTenDanhMuc = (idDanhMuc) => {
    const danhMucTimDuoc = danhmuc.find(dm => dm.id === idDanhMuc);
    return danhMucTimDuoc ? danhMucTimDuoc.name : 'Không rõ';
  };
  return (
      <>
      <Tieude/>
{/* Modal Search Start */}
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
{/* Modal Search End */}
{/* Hero Start */}
<div className="container-fluid py-5 mb-5 hero-header">
  <div className="container py-5">
    <div className="row g-5 align-items-center">
      <div className="col-md-12 col-lg-7">
        <h4 className="mb-3 text-secondary">100% Organic Foods</h4>
        <h1 className="mb-5 display-3 text-primary">Organic Veggies &amp; Fruits Foods</h1>
        <div className="position-relative mx-auto">
          <input className="form-control border-2 border-secondary w-75 py-3 px-4 rounded-pill" type="number" placeholder="Search" />
          <button type="submit" className="btn btn-primary border-2 border-secondary py-3 px-4 position-absolute rounded-pill text-white h-100" style={{top: 0, right: '25%'}}>Submit Now</button>
        </div>
      </div>
      <div className="col-md-12 col-lg-5">
        <div id="carouselId" className="carousel slide position-relative" data-bs-ride="carousel">
          <div className="carousel-inner" role="listbox">
            <div className="carousel-item active rounded">
              <img src="img/hero-img-1.png" className="img-fluid w-100 h-100 bg-secondary rounded"  />
              <a href="#" className="btn px-4 py-2 text-white rounded">Fruites</a>
            </div>
            <div className="carousel-item rounded">
              <img src="img/hero-img-2.jpg" className="img-fluid w-100 h-100 rounded"  />
              <a href="#" className="btn px-4 py-2 text-white rounded">Vesitables</a>
            </div>
            
          </div>
          <button className="carousel-control-prev" type="button" data-bs-target="#carouselId" data-bs-slide="prev">
            <span className="carousel-control-prev-icon" aria-hidden="true" />
            <span className="visually-hidden">Previous</span>
          </button>
          <button className="carousel-control-next" type="button" data-bs-target="#carouselId" data-bs-slide="next">
            <span className="carousel-control-next-icon" aria-hidden="true" />
            <span className="visually-hidden">Next</span>
          </button>
        </div>
      </div>
    </div>
  </div>
</div>
{/* Hero End */}
{/* Featurs Section Start */}
<div className="container-fluid featurs py-5">
  <div className="container py-5">
    <div className="row g-4">
      <div className="col-md-6 col-lg-3">
        <div className="featurs-item text-center rounded bg-light p-4">
          <div className="featurs-icon btn-square rounded-circle bg-secondary mb-5 mx-auto">
            <i className="fas fa-car-side fa-3x text-white" />
          </div>
          <div className="featurs-content text-center">
            <h5>Free Shipping</h5>
            <p className="mb-0">Free on order over $300</p>
          </div>
        </div>
      </div>
      <div className="col-md-6 col-lg-3">
        <div className="featurs-item text-center rounded bg-light p-4">
          <div className="featurs-icon btn-square rounded-circle bg-secondary mb-5 mx-auto">
            <i className="fas fa-user-shield fa-3x text-white" />
          </div>
          <div className="featurs-content text-center">
            <h5>Security Payment</h5>
            <p className="mb-0">100% security payment</p>
          </div>
        </div>
      </div>
      <div className="col-md-6 col-lg-3">
        <div className="featurs-item text-center rounded bg-light p-4">
          <div className="featurs-icon btn-square rounded-circle bg-secondary mb-5 mx-auto">
            <i className="fas fa-exchange-alt fa-3x text-white" />
          </div>
          <div className="featurs-content text-center">
            <h5>30 Day Return</h5>
            <p className="mb-0">30 day money guarantee</p>
          </div>
        </div>
      </div>
      <div className="col-md-6 col-lg-3">
        <div className="featurs-item text-center rounded bg-light p-4">
          <div className="featurs-icon btn-square rounded-circle bg-secondary mb-5 mx-auto">
            <i className="fa fa-phone-alt fa-3x text-white" />
          </div>
          <div className="featurs-content text-center">
            <h5>24/7 Support</h5>
            <p className="mb-0">Support every time fast</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>
{/* Featurs Section End */}
{/* Fruits Shop Starts*/}
<div className="container-fluid fruite py-5 OurProduct">
  <div className="container py-5">
    <div className="tab-class text-center">
      <div className="row g-4 align-items-center">
        <div className="col-lg-4 text-start">
          <h1>Sản phẩm của chúng tôi</h1>
        </div>
        <div className="col-lg-8 text-end">
          <div className="form-group">
            <select
              className="form-select form-select-sm mb-3 w-50 d-inline-block" // Giảm kích thước của dropdown
              value={selectedDanhmuc} // Giá trị danh mục được chọn
              onChange={(e) => setSelectedDanhmuc(e.target.value)} // Cập nhật danh mục được chọn khi thay đổi
            >
              <option value="">Tất cả sản phẩm</option>
              {danhmuc.map((dm) => (
                <option key={dm.id} value={dm.id}>
                  {dm.name} {/* Hiển thị tên của danh mục */}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>
      <div className="tab-content mt-4">
        <div className="tab-pane fade show p-0 active">
          <div className="row g-4">
            {sanpham.map((sanPham) => (
              <div className="col-md-6 col-lg-4 col-xl-3" key={sanPham.id}>
                <div className="rounded position-relative fruite-item shadow-sm"> {/* Thêm shadow để đẹp hơn */}
                  <div className="fruite-img">
                    <img
                      src={`http://127.0.0.1:8000/storage/${sanPham.image}`}
                      className="img-fluid w-100  rounded-top"
                      alt={sanPham.title}
                      style={{ height: 250, objectFit: 'cover' }}
                    />
                  </div>
                  <div
                    className="text-white bg-secondary px-2 py-1 rounded position-absolute" // Giảm padding để hiển thị nhỏ hơn
                    style={{ top: 10, left: 10 }}
                  >
                    {layTenDanhMuc(sanPham.danhsachsanpham_id)} 
                    {/* gọi hàm laytendanhmuc để hiển thị danhmucsanpham_id */}
                  </div>
                  <div className="p-3 border border-secondary border-top-0 rounded-bottom">
                    <h5>{sanPham.title}</h5> {/* Giảm font-size */}
                    <p className="text-muted">{sanPham.description}</p>
                    <div className=" d-flex justify-content-between flex-lg-wrap">
                                <p className="text-dark fs-5 fw-bold mb-0">${sanPham.price} / kg</p>
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
        </div>
      </div>
    </div>
  </div>
</div>

{/* Fruits Shop End*/}
{/* Featurs Start */}
<div className="container-fluid service py-5">
  <div className="container py-5">
    <div className="row g-4 justify-content-center">
      <div className="col-md-6 col-lg-4">
        <a href="#">
          <div className="service-item bg-secondary rounded border border-secondary">
            <img src="img/featur-1.jpg" className="img-fluid rounded-top w-100"  />
            <div className="px-4 rounded-bottom">
              <div className="service-content bg-primary text-center p-4 rounded">
                <h5 className="text-white">Fresh Apples</h5>
                <h3 className="mb-0">20% OFF</h3>
              </div>
            </div>
          </div>
        </a>
      </div>
      <div className="col-md-6 col-lg-4">
        <a href="#">
          <div className="service-item bg-dark rounded border border-dark">
            <img src="img/featur-2.jpg" className="img-fluid rounded-top w-100"  />
            <div className="px-4 rounded-bottom">
              <div className="service-content bg-light text-center p-4 rounded">
                <h5 className="text-primary">Tasty Fruits</h5>
                <h3 className="mb-0">Free delivery</h3>
              </div>
            </div>
          </div>
        </a>
      </div>
      <div className="col-md-6 col-lg-4">
        <a href="#">
          <div className="service-item bg-primary rounded border border-primary">
            <img src="img/featur-3.jpg" className="img-fluid rounded-top w-100"  />
            <div className="px-4 rounded-bottom">
              <div className="service-content bg-secondary text-center p-4 rounded">
                <h5 className="text-white">Exotic Vegitable</h5>
                <h3 className="mb-0">Discount 30$</h3>
              </div>
            </div>
          </div>
        </a>
      </div>
    </div>
  </div>
</div>

{/* Featurs End */}
{/* Vesitable Shop Start*/}
<div className="container-fluid vesitable py-5 ">
  <div className="container py-5">
    <h1 className="mb-0">Fresh Organic Vegetables</h1>
    <div className="row justify-content-center">
      <div className="col-lg-4 col-md-6 mb-4">
        <div className="border border-primary rounded position-relative vesitable-item">
          <div className="vesitable-img">
            <img src="img/vegetable-item-6.jpg" className="img-fluid w-100 rounded-top"  />
          </div>
          <div className="text-white bg-primary px-3 py-1 rounded position-absolute" style={{top: 10, right: 10}}>Vegetable</div>
          <div className="p-4 rounded-bottom">
            <h4>Parsely</h4>
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit sed do eiusmod te incididunt</p>
            <div className="d-flex justify-content-between flex-lg-wrap">
              <p className="text-dark fs-5 fw-bold mb-0">$4.99 / kg</p>
              <a href="#" className="btn border border-secondary rounded-pill px-3 text-primary"><i className="fa fa-shopping-bag me-2 text-primary" /> Add to cart</a>
            </div>
          </div>
        </div>
      </div>

      <div className="col-lg-4 col-md-6 mb-4">
        <div className="border border-primary rounded position-relative vesitable-item">
          <div className="vesitable-img">
            <img src="img/vegetable-item-1.jpg" className="img-fluid w-100 rounded-top"  />
          </div>
          <div className="text-white bg-primary px-3 py-1 rounded position-absolute" style={{top: 10, right: 10}}>Vegetable</div>
          <div className="p-4 rounded-bottom">
            <h4>Parsely</h4>
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit sed do eiusmod te incididunt</p>
            <div className="d-flex justify-content-between flex-lg-wrap">
              <p className="text-dark fs-5 fw-bold mb-0">$4.99 / kg</p>
              <a href="#" className="btn border border-secondary rounded-pill px-3 text-primary"><i className="fa fa-shopping-bag me-2 text-primary" /> Add to cart</a>
            </div>
          </div>
        </div>
      </div>

      <div className="col-lg-4 col-md-6 mb-4">
        <div className="border border-primary rounded position-relative vesitable-item">
          <div className="vesitable-img">
            <img src="img/vegetable-item-3.png" className="img-fluid w-100 rounded-top bg-light"  />
          </div>
          <div className="text-white bg-primary px-3 py-1 rounded position-absolute" style={{top: 10, right: 10}}>Vegetable</div>
          <div className="p-4 rounded-bottom">
            <h4>Banana</h4>
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit sed do eiusmod te incididunt</p>
            <div className="d-flex justify-content-between flex-lg-wrap">
              <p className="text-dark fs-5 fw-bold mb-0">$7.99 / kg</p>
              <a href="#" className="btn border border-secondary rounded-pill px-3 text-primary"><i className="fa fa-shopping-bag me-2 text-primary" /> Add to cart</a>
            </div>
          </div>
        </div>
      </div>

      <div className="col-lg-4 col-md-6 mb-4">
        <div className="border border-primary rounded position-relative vesitable-item">
          <div className="vesitable-img">
            <img src="img/vegetable-item-4.jpg" className="img-fluid w-100 rounded-top"  />
          </div>
          <div className="text-white bg-primary px-3 py-1 rounded position-absolute" style={{top: 10, right: 10}}>Vegetable</div>
          <div className="p-4 rounded-bottom">
            <h4>Bell Pepper</h4>
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit sed do eiusmod te incididunt</p>
            <div className="d-flex justify-content-between flex-lg-wrap">
              <p className="text-dark fs-5 fw-bold mb-0">$7.99 / kg</p>
              <a href="#" className="btn border border-secondary rounded-pill px-3 text-primary"><i className="fa fa-shopping-bag me-2 text-primary" /> Add to cart</a>
            </div>
          </div>
        </div>
      </div>

      <div className="col-lg-4 col-md-6 mb-4">
        <div className="border border-primary rounded position-relative vesitable-item">
          <div className="vesitable-img">
            <img src="img/vegetable-item-5.jpg" className="img-fluid w-100 rounded-top"  />
          </div>
          <div className="text-white bg-primary px-3 py-1 rounded position-absolute" style={{top: 10, right: 10}}>Vegetable</div>
          <div className="p-4 rounded-bottom">
            <h4>Potatoes</h4>
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit sed do eiusmod te incididunt</p>
            <div className="d-flex justify-content-between flex-lg-wrap">
              <p className="text-dark fs-5 fw-bold mb-0">$7.99 / kg</p>
              <a href="#" className="btn border border-secondary rounded-pill px-3 text-primary"><i className="fa fa-shopping-bag me-2 text-primary" /> Add to cart</a>
            </div>
          </div>
        </div>
      </div>

      <div className="col-lg-4 col-md-6 mb-4">
        <div className="border border-primary rounded position-relative vesitable-item">
          <div className="vesitable-img">
            <img src="img/vegetable-item-6.jpg" className="img-fluid w-100 rounded-top"  />
          </div>
          <div className="text-white bg-primary px-3 py-1 rounded position-absolute" style={{top: 10, right: 10}}>Vegetable</div>
          <div className="p-4 rounded-bottom">
            <h4>Parsely</h4>
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit sed do eiusmod te incididunt</p>
            <div className="d-flex justify-content-between flex-lg-wrap">
              <p className="text-dark fs-5 fw-bold mb-0">$7.99 / kg</p>
              <a href="#" className="btn border border-secondary rounded-pill px-3 text-primary"><i className="fa fa-shopping-bag me-2 text-primary" /> Add to cart</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>
{/* Vesitable Shop End */}
{/* Banner Section Start*/}
<div className="container-fluid banner bg-secondary my-5">
  <div className="container py-5">
    <div className="row g-4 align-items-center">
      <div className="col-lg-6">
        <div className="py-4">
          <h1 className="display-3 text-white">Fresh Exotic Fruits</h1>
          <p className="fw-normal display-3 text-dark mb-4">in Our Store</p>
          <p className="mb-4 text-dark">The generated Lorem Ipsum is therefore always free from repetition injected humour, or non-characteristic words etc.</p>
          <a href="#" className="banner-btn btn border-2 border-white rounded-pill text-dark py-3 px-5">BUY</a>
        </div>
      </div>
      <div className="col-lg-6">
        <div className="position-relative">
          <img src="img/baner-1.png" className="img-fluid w-100 rounded"  />
          <div className="d-flex align-items-center justify-content-center bg-white rounded-circle position-absolute" style={{width: 140, height: 140, top: 0, left: 0}}>
            <h1 style={{fontSize: 100}}>1</h1>
            <div className="d-flex flex-column">
              <span className="h2 mb-0">50$</span>
              <span className="h4 text-muted mb-0">kg</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>
{/* Banner Section End */}

{/* Bestsaler Product Start */}
<div className="container-fluid py-5">
  <div className="container py-5">
    <div className="text-center mx-auto mb-5" style={{maxWidth: 700}}>
      <h1 className="display-4">Bestseller Products</h1>
      <p>Latin words, combined with a handful of model sentence structures, to generate Lorem Ipsum which looks reasonable.</p>
    </div>
    <div className="row g-4">
      <div className="col-lg-6 col-xl-4">
        <div className="p-4 rounded bg-light">
          <div className="row align-items-center">
            <div className="col-6">
              <img src="img/best-product-1.jpg" className="img-fluid rounded-circle w-100"  />
            </div>
            <div className="col-6">
              <a href="#" className="h5">Organic Tomato</a>
              <div className="d-flex my-3">
                <i className="fas fa-star text-primary" />
                <i className="fas fa-star text-primary" />
                <i className="fas fa-star text-primary" />
                <i className="fas fa-star text-primary" />
                <i className="fas fa-star" />
              </div>
              <h4 className="mb-3">3.12 $</h4>
              <a href="#" className="btn border border-secondary rounded-pill px-3 text-primary"><i className="fa fa-shopping-bag me-2 text-primary" /> Add to cart</a>
            </div>
          </div>
        </div>
      </div>
      <div className="col-lg-6 col-xl-4">
        <div className="p-4 rounded bg-light">
          <div className="row align-items-center">
            <div className="col-6">
              <img src="img/best-product-2.jpg" className="img-fluid rounded-circle w-100"  />
            </div>
            <div className="col-6">
              <a href="#" className="h5">Organic Tomato</a>
              <div className="d-flex my-3">
                <i className="fas fa-star text-primary" />
                <i className="fas fa-star text-primary" />
                <i className="fas fa-star text-primary" />
                <i className="fas fa-star text-primary" />
                <i className="fas fa-star" />
              </div>
              <h4 className="mb-3">3.12 $</h4>
              <a href="#" className="btn border border-secondary rounded-pill px-3 text-primary"><i className="fa fa-shopping-bag me-2 text-primary" /> Add to cart</a>
            </div>
          </div>
        </div>
      </div>
      <div className="col-lg-6 col-xl-4">
        <div className="p-4 rounded bg-light">
          <div className="row align-items-center">
            <div className="col-6">
              <img src="img/best-product-3.jpg" className="img-fluid rounded-circle w-100"  />
            </div>
            <div className="col-6">
              <a href="#" className="h5">Organic Tomato</a>
              <div className="d-flex my-3">
                <i className="fas fa-star text-primary" />
                <i className="fas fa-star text-primary" />
                <i className="fas fa-star text-primary" />
                <i className="fas fa-star text-primary" />
                <i className="fas fa-star" />
              </div>
              <h4 className="mb-3">3.12 $</h4>
              <a href="#" className="btn border border-secondary rounded-pill px-3 text-primary"><i className="fa fa-shopping-bag me-2 text-primary" /> Add to cart</a>
            </div>
          </div>
        </div>
      </div>
      <div className="col-lg-6 col-xl-4">
        <div className="p-4 rounded bg-light">
          <div className="row align-items-center">
            <div className="col-6">
              <img src="img/best-product-4.jpg" className="img-fluid rounded-circle w-100"  />
            </div>
            <div className="col-6">
              <a href="#" className="h5">Organic Tomato</a>
              <div className="d-flex my-3">
                <i className="fas fa-star text-primary" />
                <i className="fas fa-star text-primary" />
                <i className="fas fa-star text-primary" />
                <i className="fas fa-star text-primary" />
                <i className="fas fa-star" />
              </div>
              <h4 className="mb-3">3.12 $</h4>
              <a href="#" className="btn border border-secondary rounded-pill px-3 text-primary"><i className="fa fa-shopping-bag me-2 text-primary" /> Add to cart</a>
            </div>
          </div>
        </div>
      </div>
      <div className="col-lg-6 col-xl-4">
        <div className="p-4 rounded bg-light">
          <div className="row align-items-center">
            <div className="col-6">
              <img src="img/best-product-5.jpg" className="img-fluid rounded-circle w-100"  />
            </div>
            <div className="col-6">
              <a href="#" className="h5">Organic Tomato</a>
              <div className="d-flex my-3">
                <i className="fas fa-star text-primary" />
                <i className="fas fa-star text-primary" />
                <i className="fas fa-star text-primary" />
                <i className="fas fa-star text-primary" />
                <i className="fas fa-star" />
              </div>
              <h4 className="mb-3">3.12 $</h4>
              <a href="#" className="btn border border-secondary rounded-pill px-3 text-primary"><i className="fa fa-shopping-bag me-2 text-primary" /> Add to cart</a>
            </div>
          </div>
        </div>
      </div>
      <div className="col-lg-6 col-xl-4">
        <div className="p-4 rounded bg-light">
          <div className="row align-items-center">
            <div className="col-6">
              <img src="img/best-product-6.jpg" className="img-fluid rounded-circle w-100"  />
            </div>
            <div className="col-6">
              <a href="#" className="h5">Organic Tomato</a>
              <div className="d-flex my-3">
                <i className="fas fa-star text-primary" />
                <i className="fas fa-star text-primary" />
                <i className="fas fa-star text-primary" />
                <i className="fas fa-star text-primary" />
                <i className="fas fa-star" />
              </div>
              <h4 className="mb-3">3.12 $</h4>
              <a href="#" className="btn border border-secondary rounded-pill px-3 text-primary"><i className="fa fa-shopping-bag me-2 text-primary" /> Add to cart</a>
            </div>
          </div>
        </div>
      </div>
      <div className="col-md-6 col-lg-6 col-xl-3">
        <div className="text-center">
          <img src="img/fruite-item-1.jpg" className="img-fluid rounded"  />
          <div className="py-4">
            <a href="#" className="h5">Organic Tomato</a>
            <div className="d-flex my-3 justify-content-center">
              <i className="fas fa-star text-primary" />
              <i className="fas fa-star text-primary" />
              <i className="fas fa-star text-primary" />
              <i className="fas fa-star text-primary" />
              <i className="fas fa-star" />
            </div>
            <h4 className="mb-3">3.12 $</h4>
            <a href="#" className="btn border border-secondary rounded-pill px-3 text-primary"><i className="fa fa-shopping-bag me-2 text-primary" /> Add to cart</a>
          </div>
        </div>
      </div>
      <div className="col-md-6 col-lg-6 col-xl-3">
        <div className="text-center">
          <img src="img/fruite-item-2.jpg" className="img-fluid rounded"  />
          <div className="py-4">
            <a href="#" className="h5">Organic Tomato</a>
            <div className="d-flex my-3 justify-content-center">
              <i className="fas fa-star text-primary" />
              <i className="fas fa-star text-primary" />
              <i className="fas fa-star text-primary" />
              <i className="fas fa-star text-primary" />
              <i className="fas fa-star" />
            </div>
            <h4 className="mb-3">3.12 $</h4>
            <a href="#" className="btn border border-secondary rounded-pill px-3 text-primary"><i className="fa fa-shopping-bag me-2 text-primary" /> Add to cart</a>
          </div>
        </div>
      </div>
      <div className="col-md-6 col-lg-6 col-xl-3">
        <div className="text-center">
          <img src="img/fruite-item-3.jpg" className="img-fluid rounded"  />
          <div className="py-4">
            <a href="#" className="h5">Organic Tomato</a>
            <div className="d-flex my-3 justify-content-center">
              <i className="fas fa-star text-primary" />
              <i className="fas fa-star text-primary" />
              <i className="fas fa-star text-primary" />
              <i className="fas fa-star text-primary" />
              <i className="fas fa-star" />
            </div>
            <h4 className="mb-3">3.12 $</h4>
            <a href="#" className="btn border border-secondary rounded-pill px-3 text-primary"><i className="fa fa-shopping-bag me-2 text-primary" /> Add to cart</a>
          </div>
        </div>
      </div>
      <div className="col-md-6 col-lg-6 col-xl-3">
        <div className="text-center">
          <img src="img/fruite-item-4.jpg" className="img-fluid rounded"  />
          <div className="py-2">
            <a href="#" className="h5">Organic Tomato</a>
            <div className="d-flex my-3 justify-content-center">
              <i className="fas fa-star text-primary" />
              <i className="fas fa-star text-primary" />
              <i className="fas fa-star text-primary" />
              <i className="fas fa-star text-primary" />
              <i className="fas fa-star" />
            </div>
            <h4 className="mb-3">3.12 $</h4>
            <a href="#" className="btn border border-secondary rounded-pill px-3 text-primary"><i className="fa fa-shopping-bag me-2 text-primary" /> Add to cart</a>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>
{/* Bestsaler Product End */}

<div>
  {/* Fact Start */}
  <div className="container-fluid py-5">
    <div className="container">
      <div className="bg-light p-5 rounded">
        <div className="row g-4 justify-content-center">
          <div className="col-md-6 col-lg-6 col-xl-3">
            <div className="counter bg-white rounded p-5">
              <i className="fa fa-users text-secondary" />
              <h4>satisfied customers</h4>
              <h1>1963</h1>
            </div>
          </div>
          <div className="col-md-6 col-lg-6 col-xl-3">
            <div className="counter bg-white rounded p-5">
              <i className="fa fa-users text-secondary" />
              <h4>quality of service</h4>
              <h1>99%</h1>
            </div>
          </div>
          <div className="col-md-6 col-lg-6 col-xl-3">
            <div className="counter bg-white rounded p-5">
              <i className="fa fa-users text-secondary" />
              <h4>quality certificates</h4>
              <h1>33</h1>
            </div>
          </div>
          <div className="col-md-6 col-lg-6 col-xl-3">
            <div className="counter bg-white rounded p-5">
              <i className="fa fa-users text-secondary" />
              <h4>Available Products</h4>
              <h1>789</h1>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  {/* Fact Start */}
  
  <div>
  <Footerusers/>
</div>

</div>


      </>
  );
};

export default HomeUsers;