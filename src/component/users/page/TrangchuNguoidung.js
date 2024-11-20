import React, { useContext, useEffect, useState } from 'react';
import Footerusers from '../Footerusers';
import axios from 'axios';
import HeaderUsers from '../HeaderUsers';
import { CartContext } from './CartContext';
import { Link } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import { Spinner } from 'react-bootstrap';
import Countdown from 'react-countdown';
// Định nghĩa renderer cho Countdown
const renderer = ({ days, hours, minutes, seconds, completed }) => {
  if (completed) {
    // Hiển thị khi đã hoàn thành
    return <span>Đã kết thúc</span>;
  } else {
    // Hiển thị bộ đếm lùi
    return (
      <span>
        {days} ngày {hours} giờ {minutes} phút {seconds} giây
      </span>
    );
  }
};
const TrangchuNguoidung = () => {
  const [danhMuc, setDanhMuc] = useState([]); // Khởi tạo state lưu trữ danh mục
  const [sanPham, setSanPham] = useState([]); // Khởi tạo state lưu trữ sản phẩm
  const [sanPhamSale, setSanPhamSale] = useState([]);
  const [danhMucDuocChon, setDanhMucDuocChon] = useState(""); // Danh mục được chọn
  const { addToCart } = useContext(CartContext); // Lấy hàm thêm vào giỏ hàng từ context
  const [dangtai, setDangtai] = useState(false);
  const [dactrungs, setDactrungs] = useState([]); // State lưu danh sách đặc trưng
  const [banners, setBanners] = useState([]);
  // Phân trang sản phẩm thông thường
  const [trangHienTai, datTrangHienTai] = useState(1);
  const sanPhamMoiTrang = 8;
  const chiSoSanPhamCuoi = trangHienTai * sanPhamMoiTrang;
  const chiSoSanPhamDau = chiSoSanPhamCuoi - sanPhamMoiTrang;
  const sanPhamHienTai = sanPham.slice(chiSoSanPhamDau, chiSoSanPhamCuoi);
  const tongSoTrang = Math.ceil(sanPham.length / sanPhamMoiTrang);


  // Phân trang sản phẩm khuyến mãi
  const [trangHienTaiSale, datTrangHienTaiSale] = useState(1);
  const sanPhamSaleMoiTrang = 4;
  const chiSoSanPhamCuoiSale = trangHienTaiSale * sanPhamSaleMoiTrang;
  const chiSoSanPhamDauSale = chiSoSanPhamCuoiSale - sanPhamSaleMoiTrang;
  const sanPhamSaleHienTai = sanPhamSale.slice(chiSoSanPhamDauSale, chiSoSanPhamCuoiSale);
  const tongSoTrangSale = Math.ceil(sanPhamSale.length / sanPhamSaleMoiTrang);

  // Gọi API lấy danh mục và sản phẩm
  useEffect(() => {
    laySanPham();
    layDanhMuc();
    layDactrungs()
    layBanners();
  }, [danhMucDuocChon]); // Chạy lại khi thay đổi danh mục

  const layBanners = async () => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_BASEURL}/api/banners`);
      setBanners(response.data);
    } catch (error) {
      console.error("Lỗi khi lấy banners:", error);
      toast.error("Không thể tải banners!", {
        position: "top-right",
        autoClose: 3000,
      });
    }
  };
  const layDanhMuc = async () => {
    try {
      const phanHoi = await axios.get(`${process.env.REACT_APP_BASEURL}/api/danhmucsanpham`);
      setDanhMuc(phanHoi.data);
    } catch (loi) {
      console.error('Lỗi khi lấy danh mục:', loi);
    }
  };

  const layDactrungs = async () => {
    setDangtai(true);
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_BASEURL}/api/dactrung`
      );
      const data = response.data;

      // Sắp xếp theo thứ tự hiển thị (thutuhienthi)
      const sortedData = data.sort((a, b) => a.thutuhienthi - b.thutuhienthi);

      setDactrungs(sortedData);
    } catch (error) {
      console.error("Lỗi khi lấy danh sách đặc trưng:", error);
      toast.error("Không thể tải danh sách đặc trưng!", {
        position: "top-right",
        autoClose: 3000,
      });
    } finally {
      setDangtai(false);
    }
  };


  const laySanPham = async () => {
    setDangtai(true); // Bắt đầu trạng thái tải
    try {
      // Tạo URL dựa trên danh mục được chọn
      const url = danhMucDuocChon
        ? `${process.env.REACT_APP_BASEURL}/api/sanpham/danhmuc/${danhMucDuocChon}`
        : `${process.env.REACT_APP_BASEURL}/api/sanpham`;

      const phanHoi = await axios.get(url);

      if (phanHoi.status === 200 && Array.isArray(phanHoi.data)) {
        // Lọc sản phẩm khuyến mãi và không khuyến mãi
        const sanPhamDangSale = phanHoi.data.filter(
          (sp) => sp.sanphamSales && sp.sanphamSales.some((sale) => sale.trangthai === 'Đang áp dụng')
        );

        const sanPhamKhongSale = phanHoi.data.filter(
          (sp) => !sp.sanphamSales || !sp.sanphamSales.some((sale) => sale.trangthai === 'Đang áp dụng')
        );

        setSanPhamSale(sanPhamDangSale);
        setSanPham(sanPhamKhongSale);
      } else {
        // Trường hợp không có sản phẩm nào
        setSanPham([]);
        setSanPhamSale([]);
      }
    } catch (error) {
      if (error.response && error.response.status === 404) {
        // Xử lý khi danh mục không có sản phẩm
        setSanPham([]);
        setSanPhamSale([]);
      } else {
        console.error('Lỗi khi lấy sản phẩm:', error);
        toast.warning('Có lỗi khi lấy sản phẩm', {
          position: 'top-right',
          autoClose: 3000,
        });
      }
    } finally {
      setDangtai(false); // Kết thúc trạng thái tải
    }
  };


  // const tinhThoiGianConLai = (thoigianbatdau, thoigianketthuc) => {
  //   const now = new Date();
  //   const ketthuc = new Date(thoigianketthuc);

  //   if (now > ketthuc) return 'Đã kết thúc';

  //   const khoangThoiGian = ketthuc - now;
  //   const ngay = Math.floor(khoangThoiGian / (1000 * 60 * 60 * 24));
  //   const gio = Math.floor((khoangThoiGian % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  //   const phut = Math.floor((khoangThoiGian % (1000 * 60 * 60)) / (1000 * 60));
  //   const giay = Math.floor((khoangThoiGian % (1000 * 60)) / 1000);

  //   return `${ngay} ngày ${gio} giờ ${phut} phút ${giay} giây`;
  // };

  return (
    <>
      <HeaderUsers />

      {/* Hero Start */}
      <div className="container-fluid py-5 mb-5 hero-header">
        <div className="container py-5">
          <div className="row g-5 align-items-center">
            <div className="col-md-12 col-lg-7">
              {banners.length > 0 && (
                <>
                  <h4 className="mb-3 text-secondary">{banners[0].tieude}</h4>
                  <h1 className="mb-5 display-3 text-primary">{banners[0].phude}</h1>
                </>
              )}
            </div>
            <div className="col-md-12 col-lg-5">
              <div id="carouselId" className="carousel slide position-relative" data-bs-ride="carousel">
                <div className="carousel-inner" role="listbox">
                  {banners.length > 0 &&
                    banners[0].bannerImages.map((image, index) => (
                      <div
                        key={image.id}
                        className={`carousel-item ${index === 0 ? "active" : ""} rounded`}
                      >
                        <img
                          src={`${process.env.REACT_APP_BASEURL}/${image.imagePath}`}
                          className="img-fluid w-100 h-100 rounded"
                          alt="banner"
                        />
                      </div>
                    ))}
                </div>
                <button
                  className="carousel-control-prev"
                  type="button"
                  data-bs-target="#carouselId"
                  data-bs-slide="prev"
                >
                  <span className="carousel-control-prev-icon" aria-hidden="true" />
                  <span className="visually-hidden">Previous</span>
                </button>
                <button
                  className="carousel-control-next"
                  type="button"
                  data-bs-target="#carouselId"
                  data-bs-slide="next"
                >
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
            {dangtai ? (
              <div className="text-center">
                <p>Đang tải...</p>
              </div>
            ) : dactrungs.length > 0 ? (
              dactrungs.map((item) => (
                <div className="col-md-6 col-lg-3" key={item.id}>
                  <div className="featurs-item text-center rounded bg-light p-4">
                    <div className=" btn-square rounded-circle bg-secondary mb-5 mx-auto">
                      <img
                        src={`${process.env.REACT_APP_BASEURL}/${item.icon}`}
                        alt={item.tieude}
                        className="img-fluid"
                        style={{
                          width: "50px",
                          height: "50px",
                          objectFit: "cover",
                          borderRadius: "50%",
                        }}
                      />
                    </div>
                    <div className="featurs-content text-center">
                      <h5>{item.tieude}</h5>
                      <p className="mb-0">{item.phude}</p>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="text-center">
                <p>Không có dữ liệu đặc trưng nào để hiển thị.</p>
              </div>
            )}
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
              <div className="col-sm-2">
                <div className="dropdown">
                  <button
                    className="btn btn-secondary dropdown-toggle"
                    type="button"
                    id="dropdownCategoryButton"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                  >
                    {danhMucDuocChon
                      ? danhMuc.find((dm) => dm.id === danhMucDuocChon)?.name || 'Danh mục không rõ'
                      : 'Tất cả sản phẩm'}
                  </button>
                  <ul className="dropdown-menu" aria-labelledby="dropdownCategoryButton">
                    <li>
                      <button
                        className="dropdown-item"
                        type="button"
                        onClick={() => setDanhMucDuocChon('')}
                      >
                        Tất cả sản phẩm
                      </button>
                    </li>
                    {danhMuc.map((dm) => (
                      <li key={dm.id}>
                        <button
                          className="dropdown-item"
                          type="button"
                          onClick={() => setDanhMucDuocChon(dm.id)}
                        >
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
                ) : sanPham.length > 0 ? (
                  <div className="row g-4">
                    {sanPhamHienTai.map((sanPham) => (
                      <div className="col-md-6 col-lg-4 col-xl-3" key={sanPham.id}>
                        {/* Hiển thị thông tin sản phẩm */}
                        <div className="rounded position-relative fruite-item shadow-sm">
                          <div className="fruite-img position-relative">
                            <Link to={`/sanpham/${sanPham.id}`} className="btn btn-link">
                              <img
                                src={sanPham.hinhanh}
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
                            {sanPham.danhmucsanphamName}
                          </div>
                          <div className="p-3 rounded-bottom">
                            <h3 className=" fw-bold">{sanPham.tieude}</h3>
                            <h5 className="fw-bold">
                              {sanPham.moTaChung.length > 10 ? (
                                <>
                                  {sanPham.moTaChung.slice(0, 10)}{' '}
                                  <Link to={`/sanpham/${sanPham.id}`} className="btn btn-link">
                                    (Xem chi tiết)
                                  </Link>
                                </>
                              ) : (
                                <>
                                  {sanPham.moTaChung}{' '}
                                  <Link to={`/sanpham/${sanPham.id}`} className="btn btn-link">
                                    (Xem chi tiết)
                                  </Link>
                                </>
                              )}
                            </h5>
                            <div className="d-flex justify-content-between align-items-center">
                              <p className="text-dark fs-5 fst-italic mb-0">
                                {parseFloat(sanPham.giatien).toLocaleString("vi-VN", { minimumFractionDigits: 3 })}{" "}
                                vnđ / {sanPham.don_vi_tinh}
                              </p>

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
                ) : (
                  <div className="text-center mt-4">
                    <p>Không có sản phẩm nào trong danh mục này</p>
                  </div>
                )}
                {/* Phân trang cho sản phẩm thông thường */}
                <div className="d-flex justify-content-center mt-4">
                  <ul className="pagination pagination-sm m-0">
                    <li className={`page-item ${trangHienTai === 1 ? 'disabled' : ''}`}>
                      <button className="page-link" onClick={() => datTrangHienTai(1)}>«</button>
                    </li>
                    {[...Array(tongSoTrang)].map((_, i) => (
                      <li key={i + 1} className={`page-item ${trangHienTai === i + 1 ? 'active' : ''}`}>
                        <button className="page-link" onClick={() => datTrangHienTai(i + 1)}>{i + 1}</button>
                      </li>
                    ))}
                    <li className={`page-item ${trangHienTai === tongSoTrang ? 'disabled' : ''}`}>
                      <button className="page-link" onClick={() => datTrangHienTai(tongSoTrang)}>»</button>
                    </li>
                  </ul>
                </div>
                {/* Hiển thị sản phẩm khuyến mãi */}
                <div className="container-fluid fruite py-5 OurProduct bg-light">
                  <div className="container py-5">
                    <h2 className="text-center text-uppercase fw-bold mb-4">Sản phẩm đang khuyến mãi</h2>
                    {dangtai ? (
                      <div className="text-center">
                        <Spinner animation="border" variant="primary" />
                        <p>Đang tải dữ liệu...</p>
                      </div>
                    ) : sanPhamSale.length > 0 ? (
                      <div className="row g-4">
                        {sanPhamSale.map((sanPham) => {
                          const sale = sanPham.sanphamSales.find((sale) => sale.trangthai === 'Đang áp dụng');
                          const ngayHethan = new Date(sale?.thoigianketthuc);
                          const daHethan = ngayHethan <= new Date();

                          return (
                            <div className="col-md-6 col-lg-4 col-xl-3" key={sanPham.id}>
                              <div className="rounded position-relative fruite-item shadow-sm bg-white">
                                <div className="fruite-img position-relative">
                                  <Link to={`/sanpham/${sanPham.id}`} className="btn btn-link">
                                    <img
                                      src={sanPham.hinhanh}
                                      className="img-fluid w-100 rounded-top"
                                      alt={sanPham.tieude}
                                      style={{ height: 250, objectFit: 'cover' }}
                                    />
                                  </Link>
                                  <div
                                    className="position-absolute top-0 start-0 px-3 py-1 bg-danger text-white rounded-end"
                                    style={{
                                      fontSize: '0.9rem',
                                      fontWeight: 'bold',
                                      boxShadow: '0 2px 5px rgba(0, 0, 0, 0.2)',
                                    }}
                                  >
                                    <Countdown date={ngayHethan} renderer={renderer} />
                                  </div>
                                </div>
                                <div className="p-3">
                                  <h3 className="fw-bold">{sanPham.tieude}</h3>
                                  <h5 className="fw-bold">
                                    {sanPham.moTaChung.length > 10 ? (
                                      <>
                                        {sanPham.moTaChung.slice(0, 10)}{' '}
                                        <Link to={`/sanpham/${sanPham.id}`} className="btn btn-link">
                                          (Xem chi tiết)
                                        </Link>
                                      </>
                                    ) : (
                                      <>
                                        {sanPham.moTaChung}{' '}
                                        <Link to={`/sanpham/${sanPham.id}`} className="btn btn-link">
                                          (Xem chi tiết)
                                        </Link>
                                      </>
                                    )}
                                  </h5>
                                  <div className="d-flex justify-content-between align-items-center">
                                    <p className="text-muted mb-0" style={{ textDecoration: 'line-through' }}>
                                      {parseFloat(sanPham.giatien).toLocaleString("vi-VN", { minimumFractionDigits: 3 })}{" "}
                                      vnđ
                                    </p>
                                    <p className="text-danger fw-bold mb-0">

                                      {sale?.giasale && parseFloat(sale.giasale).toLocaleString("vi-VN", { minimumFractionDigits: 3 })}{" "}
                                      vnđ ({sanPham.don_vi_tinh})

                                    </p>
                                  </div>
                                  {!daHethan && (
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
                          );
                        })}
                      </div>
                    ) : (
                      <div className="text-center mt-4">
                        <p>Không có sản phẩm nào đang khuyến mãi</p>
                      </div>
                    )}

                    {/* Phân trang cho sản phẩm khuyến mãi */}
                    <div className="d-flex justify-content-center mt-4">
                      <ul className="pagination pagination-sm m-0">
                        <li className={`page-item ${trangHienTaiSale === 1 ? 'disabled' : ''}`}>
                          <button className="page-link" onClick={() => datTrangHienTaiSale(1)}>«</button>
                        </li>
                        {[...Array(tongSoTrangSale)].map((_, i) => (
                          <li key={i + 1} className={`page-item ${trangHienTaiSale === i + 1 ? 'active' : ''}`}>
                            <button className="page-link" onClick={() => datTrangHienTaiSale(i + 1)}>{i + 1}</button>
                          </li>
                        ))}
                        <li className={`page-item ${trangHienTaiSale === tongSoTrangSale ? 'disabled' : ''}`}>
                          <button className="page-link" onClick={() => datTrangHienTaiSale(tongSoTrangSale)}>»</button>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Fruits Shop End */}
      <Footerusers />
      <ToastContainer />
    </>
  );
};

export default TrangchuNguoidung;
