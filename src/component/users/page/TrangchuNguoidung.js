import React, { useContext, useEffect, useState } from 'react';
import Footerusers from '../Footerusers';
import axios from 'axios';
import HeaderUsers from '../HeaderUsers';
import { CartContext } from './CartContext';
import { Link } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import { Spinner } from 'react-bootstrap';

const TrangchuNguoidung = () => {
  const [danhMuc, setDanhMuc] = useState([]); // Khởi tạo state lưu trữ danh mục
  const [sanPham, setSanPham] = useState([]); // Khởi tạo state lưu trữ sản phẩm
  const [danhMucDuocChon, setDanhMucDuocChon] = useState(""); // Danh mục được chọn
  const { addToCart } = useContext(CartContext); // Lấy hàm thêm vào giỏ hàng từ context
  const [dangtai, setDangtai] = useState(false);
  const [trangHienTai, datTrangHienTai] = useState(1); // Trang hiện tại
  const sanPhamMoiTrang = 8; // Số sản phẩm hiển thị mỗi trang
  // Phân trang
  const chiSoSanPhamCuoi = trangHienTai * sanPhamMoiTrang;
  const chiSoSanPhamDau = chiSoSanPhamCuoi - sanPhamMoiTrang;
  const sanPhamHienTai = sanPham.slice(chiSoSanPhamDau, chiSoSanPhamCuoi);

  const tongSoTrang = Math.ceil(sanPham.length / sanPhamMoiTrang);

  const xuLyThayDoiTrang = (soTrang) => {
    datTrangHienTai(soTrang);
  };

  // Gọi API lấy danh mục và sản phẩm
  useEffect(() => {
    laySanPham();
    layDanhMuc();
  }, [danhMucDuocChon]); // Chạy lại khi thay đổi danh mục

  const layDanhMuc = async () => {
    try {
      const phanHoi = await axios.get(`${process.env.REACT_APP_BASEURL}/api/danhmucsanphams`);
      setDanhMuc(phanHoi.data);
    } catch (loi) {
      console.error('Lỗi khi lấy danh mục:', loi);
    }
  };

  const laySanPham = async () => {
    setDangtai(true);
    try {
      const url = danhMucDuocChon
        ? `${process.env.REACT_APP_BASEURL}/api/sanphams?danhmucsanpham_id=${danhMucDuocChon}` // Nếu có danh mục thì lọc
        : `${process.env.REACT_APP_BASEURL}/api/sanphams`; // Nếu không, lấy tất cả sản phẩm

      const phanHoi = await axios.get(url);
      setSanPham(phanHoi.data);
      setDangtai(false);

    } catch (loi) {
      console.error('Lỗi khi lấy sản phẩm:', loi);
    }
  };

  // Hàm lấy tên danh mục dựa trên id
  // const layTenDanhMuc = (idDanhMuc) => {
  //   const danhMucTimDuoc = danhMuc.find(dm => dm.id === idDanhMuc);
  //   return danhMucTimDuoc ? danhMucTimDuoc.name : 'Không rõ';
  // };

  return (
    <>
      <HeaderUsers />

      {/* Hero Start */}
      <div className="container-fluid py-5 mb-5 hero-header">
        <div className="container py-5">
          <div className="row g-5 align-items-center">
            <div className="col-md-12 col-lg-7">
              <h4 className="mb-3 text-secondary">100% thực phẩm hữu cơ</h4>
              <h1 className="mb-5 display-3 text-primary">Rau hữu cơ &amp; Trái cây Thực phẩm</h1>
            </div>
            <div className="col-md-12 col-lg-5">
              <div id="carouselId" className="carousel slide position-relative" data-bs-ride="carousel">
                <div className="carousel-inner" role="listbox">
                  <div className="carousel-item active rounded">
                    <img src="img/hero-img-1.png" className="img-fluid w-100 h-100 bg-secondary rounded" alt="" />
                  </div>
                  <div className="carousel-item rounded">
                    <img src="img/hero-img-2.jpg" className="img-fluid w-100 h-100 rounded" alt="" />
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
      <div className="container-fluid featurs py-5">
        <div className="container py-5">
          <div className="row g-4">
            <div className="col-md-6 col-lg-3">
              <div className="featurs-item text-center rounded bg-light p-4">
                <div className="featurs-icon btn-square rounded-circle bg-secondary mb-5 mx-auto">
                  <i className="fas fa-car-side fa-3x text-white" />
                </div>
                <div className="featurs-content text-center">
                  <h5>Miễn phí vận chuyển</h5>
                  <p className="mb-0">Miễn phí cho đơn hàng trên $300</p>
                </div>
              </div>
            </div>
            <div className="col-md-6 col-lg-3">
              <div className="featurs-item text-center rounded bg-light p-4">
                <div className="featurs-icon btn-square rounded-circle bg-secondary mb-5 mx-auto">
                  <i className="fas fa-user-shield fa-3x text-white" />
                </div>
                <div className="featurs-content text-center">
                  <h5>Thanh toán bảo mật</h5>
                  <p className="mb-0">Thanh toán bảo đảm 100%</p>
                </div>
              </div>
            </div>
            <div className="col-md-6 col-lg-3">
              <div className="featurs-item text-center rounded bg-light p-4">
                <div className="featurs-icon btn-square rounded-circle bg-secondary mb-5 mx-auto">
                  <i className="fas fa-exchange-alt fa-3x text-white" />
                </div>
                <div className="featurs-content text-center">
                  <h5>Hoàn trả trong 30 ngày</h5>
                  <p className="mb-0">Hoàn trả nếu hàng ko</p>
                </div>
              </div>
            </div>
            <div className="col-md-6 col-lg-3">
              <div className="featurs-item text-center rounded bg-light p-4">
                <div className="featurs-icon btn-square rounded-circle bg-secondary mb-5 mx-auto">
                  <i className="fa fa-phone-alt fa-3x text-white" />
                </div>
                <div className="featurs-content text-center">
                  <h5>Hỗ trợ 24/7</h5>
                  <p className="mb-0">Hỗ trợ nhanh chóng mọi lúc</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Featurs Section End */}




      {/* Sản phẩm của chúng tôi */}
      <div className="container-fluid fruite py-5 OurProduct">
        <div className="container py-5">
          <div className="tab-class text-center">
            <div className="row g-4 align-items-center">
              {/* Tiêu đề sản phẩm */}
              <div className="col-lg-4 text-start">
                <h1 className="text-uppercase fw-bold">Sản phẩm của chúng tôi</h1>
              </div>
              {/* Bộ lọc danh mục sản phẩm */}
              <div className='col-sm-2'>
  <div className="dropdown">
    <button
      className="btn btn-secondary dropdown-toggle"
      type="button"
      id="dropdownCategoryButton"
      data-bs-toggle="dropdown"
      aria-expanded="false"
    >
      {danhMucDuocChon 
        ? (danhMuc.find(dm => dm.id === danhMucDuocChon)?.name || "Danh mục không rõ")
        : "Tất cả sản phẩm"}
    </button>
    <ul className="dropdown-menu" aria-labelledby="dropdownCategoryButton">
      <li>
        <button className="dropdown-item" type="button" onClick={() => setDanhMucDuocChon('')}>
          Tất cả sản phẩm
        </button>
      </li>
      {danhMuc.map((dm) => (
        <li key={dm.id}>
          <button className="dropdown-item" type="button" onClick={() => setDanhMucDuocChon(dm.id)}>
            {dm.name}
          </button>
        </li>
      ))}
    </ul>
  </div>
</div>
</div>


            {/* Hiển thị sản phẩm */}
            <div className="tab-content mt-4">
              <div className="tab-pane fade show p-0 active">
                {dangtai ? (
                  <div className='text-center'>
                    <Spinner animation='border' variant='primary' />
                    <p>Đang tải dữ liệu...</p>
                  </div>
                ) : (
                  <div className="row g-4">
                    {sanPhamHienTai.map((sanPham) => (
                      <div className="col-md-6 col-lg-4 col-xl-3" key={sanPham.id}>
                        <div className="rounded position-relative fruite-item shadow-sm">
                          <div className="fruite-img position-relative">
                            <Link to={`/sanpham/${sanPham.id}`} className="btn btn-link">
                              <img
                                src={`${process.env.REACT_APP_BASEURL}/storage/${sanPham.hinhanh}`}
                                className="img-fluid w-100 rounded-top"
                                alt={sanPham.tieude}
                                style={{ height: 250, objectFit: 'cover' }}
                              />
                            </Link>
                            {sanPham.trangthai === 'Hết hàng' && (
                              <div className="position-absolute top-50 start-50 translate-middle d-flex align-items-center justify-content-center bg-dark bg-opacity-50"
                                style={{ zIndex: 1, padding: '5px 10px', borderRadius: '5px' }}>
                                <span className="text-white small fw-bold">Hết hàng</span>
                              </div>
                            )}
                          </div>
                          <div className="text-white bg-secondary px-2 py-1 rounded position-absolute"
                            style={{ top: 10, left: 10 }}>
                            {sanPham.danhmucsanpham?.name}
                          </div>
                          <div className="p-3  rounded-bottom">
                            <p className="h5 fw-bold">{sanPham.tieude}</p>
                            <div className="d-flex justify-content-between align-items-center">
                              <p className="text-dark fs-5 fst-italic mb-0">{sanPham.giatien} vnđ/ {sanPham.don_vi_tinh}</p>
                              {sanPham.trangthai !== 'Hết hàng' && (
                                <button
                                  onClick={() => addToCart(sanPham)}
                                  className="btn border border-secondary rounded-pill px-3 text-primary"
                                >
                                  <i className="fa fa-shopping-bag me-2 text-primary" />
                                  Thêm vào giỏ
                                </button>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                {/* Phân trang (Cập nhật) */}
                <div className="d-flex justify-content-center mt-4">
                  <ul className="pagination pagination-sm m-0">
                    <li className={`page-item ${trangHienTai === 1 ? 'disabled' : ''}`}>
                      <button className="page-link" onClick={() => xuLyThayDoiTrang(1)}>«</button>
                    </li>
                    {[...Array(tongSoTrang)].map((_, i) => (
                      <li key={i + 1} className={`page-item ${trangHienTai === i + 1 ? 'active' : ''}`}>
                        <button className="page-link" onClick={() => xuLyThayDoiTrang(i + 1)}>{i + 1}</button>
                      </li>
                    ))}
                    <li className={`page-item ${trangHienTai === tongSoTrang ? 'disabled' : ''}`}>
                      <button className="page-link" onClick={() => xuLyThayDoiTrang(tongSoTrang)}>»</button>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Banner Section Start*/}
      <div className="container-fluid banner bg-secondary my-5">
        <div className="container py-5">
          <div className="row g-4 align-items-center">
            <div className="col-lg-6">
              <div className="py-4">
                <h1 className="display-3 text-white">Trái cây tươi kỳ lạ</h1>
                <p className="fw-normal display-3 text-dark mb-4">trong cửa hàng của chúng tôi</p>
                <p className="mb-4 text-dark"> Chúng tôi cung cấp các loại rau củ và trái cây tươi ngon, chất lượng, được trồng theo phương pháp hữu cơ.
                  Đến với cửa hàng của chúng tôi, bạn sẽ tìm thấy nguồn thực phẩm sạch, giàu dinh dưỡng cho bữa ăn hàng ngày của gia đình..</p>

              </div>
            </div>
            <div className="col-lg-6">
              <div className="position-relative">
                <img src="img/baner-1.png" className="img-fluid w-100 rounded" />
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Banner Section End */}

      {/* Fruits Shop End */}
      <Footerusers />
      <ToastContainer />
    </>
  );
};

export default TrangchuNguoidung;
