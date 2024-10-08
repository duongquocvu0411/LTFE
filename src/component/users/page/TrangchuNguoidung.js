import React, { useContext, useEffect, useState } from 'react';
import Footerusers from '../Footerusers';
import axios from 'axios';
import HeaderUsers from '../HeaderUsers';
import { CartContext } from './CartContext';
import { Link } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';

const TrangchuNguoidung = () => {
  const [danhMuc, setDanhMuc] = useState([]); // Khởi tạo state lưu trữ danh mục
  const [sanPham, setSanPham] = useState([]); // Khởi tạo state lưu trữ sản phẩm
  const [danhMucDuocChon, setDanhMucDuocChon] = useState(""); // Danh mục được chọn
  const { addToCart } = useContext(CartContext); // Lấy hàm thêm vào giỏ hàng từ context

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
      const phanHoi = await axios.get(`${process.env.REACT_APP_BASEURL}/api/danhsachsanpham`);
      setDanhMuc(phanHoi.data);
    } catch (loi) {
      console.error('Lỗi khi lấy danh mục:', loi);
    }
  };

  const laySanPham = async () => {
    try {
      const url = danhMucDuocChon
        ? `${process.env.REACT_APP_BASEURL}/api/products?danhsachsanpham_id=${danhMucDuocChon}` // Nếu có danh mục thì lọc
        : `${process.env.REACT_APP_BASEURL}/api/products`; // Nếu không, lấy tất cả sản phẩm

      const phanHoi = await axios.get(url);
      setSanPham(phanHoi.data);
      datTrangHienTai(1);
    } catch (loi) {
      console.error('Lỗi khi lấy sản phẩm:', loi);
    }
  };

  // Hàm lấy tên danh mục dựa trên id
  const layTenDanhMuc = (idDanhMuc) => {
    const danhMucTimDuoc = danhMuc.find(dm => dm.id === idDanhMuc);
    return danhMucTimDuoc ? danhMucTimDuoc.name : 'Không rõ';
  };

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
              <div className="col-lg-8 text-end">
                <div className="form-group">
                  <select
                    className="form-select form-select-sm mb-3 w-50 d-inline-block"
                    value={danhMucDuocChon}
                    onChange={(e) => setDanhMucDuocChon(e.target.value)}
                  >
                    <option value="">Tất cả sản phẩm</option>
                    {danhMuc.map((dm) => (
                      <option key={dm.id} value={dm.id}>
                        {dm.name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>

            {/* Hiển thị sản phẩm */}
            <div className="tab-content mt-4">
              <div className="tab-pane fade show p-0 active">
                <div className="row g-4">
                  {sanPhamHienTai.map((sanPham) => (
                    <div className="col-md-6 col-lg-4 col-xl-3" key={sanPham.id}>
                      <div className="rounded position-relative fruite-item shadow-sm">
                        <div className="fruite-img position-relative">
                          <Link to={`/shop/${sanPham.id}`} className="btn btn-link">
                            <img
                              src={`${process.env.REACT_APP_BASEURL}/storage/${sanPham.image}`}
                              className="img-fluid w-100 rounded-top"
                              alt={sanPham.title}
                              style={{ height: 250, objectFit: 'cover' }}
                            />
                          </Link>
                          {sanPham.status === 'Hết hàng' && (
                            <div className="position-absolute top-50 start-50 translate-middle d-flex align-items-center justify-content-center bg-dark bg-opacity-50"
                              style={{ zIndex: 1, padding: '5px 10px', borderRadius: '5px' }}>
                              <span className="text-white small fw-bold">Hết hàng</span>
                            </div>
                          )}
                        </div>
                        <div className="text-white bg-secondary px-2 py-1 rounded position-absolute"
                          style={{ top: 10, left: 10 }}>
                          {layTenDanhMuc(sanPham.danhsachsanpham_id)}
                        </div>
                        <div className="p-3 border border-secondary border-top-0 rounded-bottom">
                          <p className="h5 fw-bold">{sanPham.title}</p>
                          <div className="d-flex justify-content-between align-items-center">
                            <p className="text-dark fs-5 fst-italic mb-0">{sanPham.price} vnđ/ {sanPham.don_vi_tinh}</p>
                            {sanPham.status !== 'Hết hàng' && (
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
