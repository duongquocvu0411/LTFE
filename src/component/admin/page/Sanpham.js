import React, { useEffect, useState } from 'react';

import Footer from '../Footer';
import axios from 'axios';
import { Button, Modal, Spinner } from 'react-bootstrap';
import { nanoid } from 'nanoid';
import { toast, ToastContainer } from 'react-toastify';
import HeaderAdmin from '../HeaderAdmin';
import ModlaSanpham from './../modla/ModlaSanpham';
import SiderbarAdmin from '../SidebarAdmin';
import ModalDanhGia from '../modla/ModalDanhGia';
import { Link } from 'react-router-dom';
import Countdown from 'react-countdown';

const SanPham = () => {
  // State lưu trữ danh mục sản phẩma
  const [danhMuc, setDanhMuc] = useState([]);


  // State lưu trữ danh mục được chọn
  const [danhMucDuocChon, setDanhMucDuocChon] = useState("");
  // State lưu trữ danh sách sản phẩm
  const [danhSachSanPham, setDanhSachSanPham] = useState([]);
  const [showModalDanhGia, setShowModalDanhGia] = useState(false); // Quản lý hiển thị modal đánh giá
  const [sanphamIdXemDanhGia, setSanphamIdXemDanhGia] = useState(null); // Lưu trữ sanphams_id cho modal đánh giá
  // State hiển thị modal chi tiết sản phẩm
  const [hienThiModalChiTiet, setHienThiModalChiTiet] = useState(false);
  const [noiDungChiTiet, setNoiDungChiTiet] = useState({});
  const [dangtai, setDangtai] = useState(false);
  // State quản lý trang hiện tại của phân trang
  const [trangHienTai, setTrangHienTai] = useState(1);

  // Số sản phẩm hiển thị mỗi trang
  const sanPhamMoiTrang = 5;

  // State hiển thị modal và chỉnh sửa sản phẩm
  const [hienThiModal, setHienThiModal] = useState(false);
  const [chinhSua, setChinhSua] = useState(false);
  const [sanPhamHienTai, setSanPhamHienTai] = useState(null);

  // Tính toán vị trí sản phẩm để phân trang
  const viTriSanPhamCuoi = trangHienTai * sanPhamMoiTrang;
  const viTriSanPhamDau = viTriSanPhamCuoi - sanPhamMoiTrang;
  const sanPhamTheoTrang = Array.isArray(danhSachSanPham)
  ? danhSachSanPham.slice(viTriSanPhamDau, viTriSanPhamCuoi)
  : [];
const tongSoTrang = Array.isArray(danhSachSanPham)
  ? Math.ceil(danhSachSanPham.length / sanPhamMoiTrang)
  : 0;


  // Hàm thay đổi trang hiện tại khi người dùng bấm nút phân trang
  const phanTrang = (soTrang) => setTrangHienTai(soTrang);

  // Gọi API lấy danh sách sản phẩm khi component được render lần đầu
  useEffect(() => {
    layDanhSachSanPham();
    layDanhMuc();
  }, [danhMucDuocChon]);

  const layDanhSachSanPham = async () => {
    setDangtai(true); // Bắt đầu trạng thái đang tải
    try {
      const url = danhMucDuocChon
        ? `${process.env.REACT_APP_BASEURL}/api/Sanpham/danhmuc/${danhMucDuocChon}`
        : `${process.env.REACT_APP_BASEURL}/api/sanpham`;

      const response = await axios.get(url);
      setDanhSachSanPham(response.data || []); // Lưu danh sách sản phẩm vào state
      setTrangHienTai(1); // Đặt lại trang hiện tại về 1 khi thay đổi danh mục
    } catch (error) {
      if (error.response && error.response.status === 404) {
        setDanhSachSanPham([]); // Khi API trả về 404, đặt danh sách sản phẩm là mảng rỗng
      } else {
        console.log("Có lỗi khi lấy API:", error);
        toast.error("Có lỗi khi lấy danh sách sản phẩm", {
          position: "top-right",
          autoClose: 3000,
        });
      }
    } finally {
      setDangtai(false); // Kết thúc trạng thái đang tải
    }
  };

  // Hàm gọi API để lấy danh sách danh mục sản phẩm
  const layDanhMuc = async () => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_BASEURL}/api/danhmucsanpham`);
      setDanhMuc(response.data); // Lưu danh mục sản phẩm vào state
    } catch (error) {
      console.error('Lỗi khi lấy danh mục sản phẩm:', error);
    }
  };



  // Hàm mở modal để thêm sản phẩm
  const moModalThemSanPham = () => {
    setChinhSua(false); // Đặt trạng thái không phải chỉnh sửa
    // setSanPhamHienTai(null); // Đặt sản phẩm hiện tại về null bỏ đi dòng code vẫn được vì bên trong component con đã có reset from khi add 
    setHienThiModal(true); // Hiển thị modal
  };

  // Hàm mở modal để chỉnh sửa sản phẩm
  const moModalSuaSanPham = async (sanPham) => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_BASEURL}/api/sanpham/${sanPham.id}`);
      const productData = response.data;

      setSanPhamHienTai(productData); // Lưu sản phẩm hiện tại với chi tiết đầy đủ
      setChinhSua(true); // Đặt trạng thái chỉnh sửa
      setHienThiModal(true); // Hiển thị modal

    } catch (error) {
      console.log('Lỗi khi lấy dữ liệu sản phẩm:', error);
      toast.error('Không thể lấy dữ liệu sản phẩm', {
        position: 'top-right',
        autoClose: 3000,
      });
    }
  };


  // Hàm xóa sản phẩm
  const xoaSanPham = async (id) => {
    const SanphamXoa = danhSachSanPham.find((sanpham) => sanpham.id === id);

    try {
      await axios.delete(`${process.env.REACT_APP_BASEURL}/api/sanpham/${id}`);

      toast.success(`Sản phẩm ${SanphamXoa.tieude} đã được xóa thành công!`, {
        position: 'top-right',
        autoClose: 3000,
      });

      layDanhSachSanPham(); // Cập nhật danh sách sản phẩm sau khi xóa

    } catch (error) {
      console.log('Lỗi khi xóa sản phẩm:', error);
      toast.error(`Sản phẩm ${SanphamXoa.tieude} chưa xóa được, vui lòng thử lại!`, {
        position: 'top-right',
        autoClose: 3000,
      });
    }
  };



  // Hàm mở modal để xem chi tiết sản phẩm (gọi API lấy dữ liệu chi tiết)
  const moModalChiTiet = async (sanphams_id) => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_BASEURL}/api/chitiets/${sanphams_id}`);
      console.log(response.data);  // Xem dữ liệu có đầy đủ thông tin không
      setNoiDungChiTiet(response.data); // Lưu dữ liệu chi tiết sản phẩm
      setHienThiModalChiTiet(true); // Hiển thị modal chi tiết
    } catch (error) {
      if (error.response && error.response.status === 404) {
        setNoiDungChiTiet("");
        setHienThiModalChiTiet(true);
      } else {
        console.log('Lỗi khi lấy chi tiết sản phẩm:', error);
        toast.error('Không thể lấy chi tiết sản phẩm', {
          position: 'top-right',
          autoClose: 3000,
        });
      }
    }
  };

  const moModalDanhGia = (sanphams_id) => {
    setSanphamIdXemDanhGia(sanphams_id); // Lưu trữ sanphams_id
    setShowModalDanhGia(true); // Hiển thị modal đánh giá
  };


  return (
    <div id="wrapper">
      {/* Sidebar */}
      <SiderbarAdmin />

      {/* Phần nội dung chính */}
      <div id="content-wrapper" className="d-flex flex-column">
        <div id="content">
          {/* Header Admin */}
          <HeaderAdmin />

          {/* Tiêu đề trang */}
          <div className="content-header">
            <div className="container-fluid">
              <div className="row mb-2">
                <div className="col-sm-6">
                  <h1 className="h3 mb-0 text-gray-800">Danh sách sản phẩm</h1>
                </div>
                <div className="col-sm-6">
                  <ol className="breadcrumb float-sm-right">
                    <li className="breadcrumb-item"><Link to="/admin/trangchu">Home</Link></li>
                    <li className="breadcrumb-item active">Sản Phẩm</li>
                  </ol>
                </div>
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
            </div>
          </div>

          {/* Bảng danh sách sản phẩm */}
          <div className="container-fluid">
            <div className="card shadow mb-4">
              <div className="card-header py-3 d-flex flex-row align-items-center justify-content-between">
                <h6 className="m-0 font-weight-bold text-primary">
                  Danh sách sản phẩm
                </h6>
                <div className="card-tools">
                  <Button
                    variant="primary"
                    onClick={moModalThemSanPham}
                  >
                    <i className="fas fa-plus-circle"></i> Thêm sản phẩm
                  </Button>
                </div>
              </div>

              <div className="card-body table-responsive" style={{ maxHeight: "400px" }}>
                {dangtai ? (
                  <div className="text-center">
                    <Spinner animation="border" variant="primary" /> {/* Hiển thị spinner khi đang tải */}
                    <p>Đang tải dữ liệu...</p>
                  </div>
                ) : (
                  <table className="table table-bordered table-hover table-striped">
                    <thead>
                      <tr>
                        <th scope="col">STT</th>
                        <th scope="col">Hình ảnh</th>
                        <th scope="col">Tên</th>
                        <th scope="col">Giá</th>
                        <th scope="col">Đơn vị tính</th>
                        <th scope="col">Chi tiết sản phẩm</th>
                        <th scope="col">Đánh giá</th>
                        <th scope="col">Trạng thái</th>
                        <th scope='col'>Khuyến mãi</th>
                        <th scope="col">Chức năng</th>
                      </tr>
                    </thead>
                    <tbody>
                      {danhSachSanPham && danhSachSanPham.length > 0 ? (
                        sanPhamTheoTrang.map((sanPham, index) => (
                          <tr key={nanoid()}>
                            <td>{viTriSanPhamDau + index + 1}</td>
                            <td>
                              <div className="d-flex align-items-center">
                                <img src={sanPham.hinhanh} alt={sanPham.tieude} style={{ height: "50px", objectFit: "cover" }} />
                              </div>
                            </td>
                            <td>{sanPham.tieude}</td>
                            <td>{sanPham.giatien} vnđ</td>
                            <td>{sanPham.donViTinh}</td>
                            <td>
                              <Button
                                variant="btn btn-primary"
                                onClick={() => moModalChiTiet(sanPham.id)}
                              >
                                Xem chi tiết
                              </Button>
                            </td>
                            <td>
                              <Button variant="info" onClick={() => moModalDanhGia(sanPham.id)}>
                                Xem Đánh Giá
                              </Button>
                            </td>
                            <td>{sanPham.trangthai}</td>
                            <td>
                              {sanPham.sanphamSales.length > 0 ? (
                                sanPham.sanphamSales.map((sale) => (
                                  <div key={sale.id}>
                                    <p>Trạng thái: {sale.trangthai}</p>
                                    {sale.trangthai === "Đang áp dụng" ? (
                                      <p>
                                        Còn lại:{" "}
                                        <Countdown
                                          date={new Date(sale.thoigianketthuc)}
                                          renderer={({ days, hours, minutes, seconds, completed }) =>
                                            completed ? (
                                              <span>Khuyến mãi đã kết thúc</span>
                                            ) : (
                                              <span>
                                                {days} ngày {hours} giờ {minutes} phút {seconds} giây
                                              </span>
                                            )
                                          }
                                        />
                                      </p>
                                    ) : (
                                      <span>Khuyến mãi đã kết thúc</span>
                                    )}
                                  </div>
                                ))
                              ) : (
                                <span>Không có khuyến mãi</span>
                              )}
                            </td>


                            <td>
                              <Button variant="primary me-2" onClick={() => moModalSuaSanPham(sanPham)}>
                                <i className="fas fa-edit"></i>
                              </Button>
                              <Button variant="danger" onClick={() => xoaSanPham(sanPham.id)}>
                                <i className="fas fa-trash"></i>
                              </Button>
                            </td>
                          </tr>
                        ))
                      ) : (
                        <tr>
                          <td colSpan="10" className="text-center">Không có sản phẩm nào trong danh mục này</td>
                        </tr>
                      )}
                    </tbody>

                  </table>
                )}
              </div>


              {/* Phân trang */}
              <div className="card-footer clearfix">
                <ul className="pagination pagination-sm m-0 float-right">
                  <li className={`page-item ${trangHienTai === 1 ? 'disabled' : ''}`}>
                    <button className="page-link" onClick={() => phanTrang(trangHienTai > 1 ? trangHienTai - 1 : 1)}>«</button>
                  </li>
                  {[...Array(tongSoTrang)].map((_, i) => (
                    <li key={i + 1} className={`page-item ${trangHienTai === i + 1 ? 'active' : ''}`}>
                      <button className="page-link" onClick={() => phanTrang(i + 1)}>{i + 1}</button>
                    </li>
                  ))}
                  <li className={`page-item ${trangHienTai === tongSoTrang ? 'disabled' : ''}`}>
                    <button className="page-link" onClick={() => phanTrang(trangHienTai < tongSoTrang ? trangHienTai + 1 : tongSoTrang)}>»</button>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* Modal thêm/sửa sản phẩm */}
        <ModlaSanpham
          show={hienThiModal}
          handleClose={() => setHienThiModal(false)}
          isEdit={chinhSua}
          product={sanPhamHienTai}
          fetchSanpham={layDanhSachSanPham}
        />

        {/* Modal xem đánh giá */}
        <ModalDanhGia
          show={showModalDanhGia}
          handleClose={() => setShowModalDanhGia(false)}
          sanphamId={sanphamIdXemDanhGia}
        />

        {/* Footer */}
        <Footer />
        <ToastContainer />


        {/* Modal chi tiết sản phẩm */}
        <Modal show={hienThiModalChiTiet} onHide={() => setHienThiModalChiTiet(false)} size='xl'>
          <Modal.Header closeButton>
            <Modal.Title>Chi Tiết Sản Phẩm</Modal.Title>
          </Modal.Header>
          <Modal.Body >
            <p><strong>Mô tả chung:</strong> {noiDungChiTiet.mo_ta_chung}</p>
            <p><strong>Hình dáng:</strong> {noiDungChiTiet.hinh_dang}</p>
            <p><strong>Công dụng:</strong> {noiDungChiTiet.cong_dung}</p>
            <p><strong>Xuất xứ:</strong> {noiDungChiTiet.xuat_xu}</p>
            <p><strong>Khối lượng:</strong> {noiDungChiTiet.khoi_luong}</p>
            <p><strong>Bảo quản:</strong> {noiDungChiTiet.bao_quan}</p>
            <p><strong>Thành phần dinh dưỡng:</strong> {noiDungChiTiet.thanh_phan_dinh_duong}</p>
            <p><strong>Ngày thu hoạch:</strong> {noiDungChiTiet.ngay_thu_hoach}</p>
            <p><strong>Hương vị:</strong> {noiDungChiTiet.huong_vi}</p>
            <p><strong>Nồng độ đường:</strong> {noiDungChiTiet.nong_do_duong}</p>
            {/* Use dangerouslySetInnerHTML to render bài viết as HTML */}
            <p><strong>Bài viết:</strong></p>
            <div dangerouslySetInnerHTML={{ __html: noiDungChiTiet.bai_viet }} />
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={() => setHienThiModalChiTiet(false)}>
              Đóng
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    </div>

  );
};

export default SanPham;
