import React, { useEffect, useState } from 'react';
import Sidebar from '../Sidebar';
import Footer from '../Footer';
import axios from 'axios';

import { Button, Modal } from 'react-bootstrap';
import { nanoid } from 'nanoid';
import { toast, ToastContainer } from 'react-toastify';
import HeaderAdmin from '../HeaderAdmin';
import ModlaSanpham from './../modla/ModlaSanpham';

const SanPham = () => {
  const [danhSachSanPham, setDanhSachSanPham] = useState([]);
  const [trangHienTai, setTrangHienTai] = useState(1);
  const sanPhamMoiTrang = 5;
  const [hienThiModal, setHienThiModal] = useState(false);
  const [chinhSua, setChinhSua] = useState(false);
  const [sanPhamHienTai, setSanPhamHienTai] = useState(null);

  // Phân trang
  const viTriSanPhamCuoi = trangHienTai * sanPhamMoiTrang;
  const viTriSanPhamDau = viTriSanPhamCuoi - sanPhamMoiTrang;
  const sanPhamTheoTrang = danhSachSanPham.slice(viTriSanPhamDau, viTriSanPhamCuoi);
  const tongSoTrang = Math.ceil(danhSachSanPham.length / sanPhamMoiTrang);

  const phanTrang = (soTrang) => setTrangHienTai(soTrang);

  // Lấy danh sách sản phẩm từ API Laravel
  const layDanhSachSanPham = () => {
    axios.get(`${process.env.REACT_APP_BASEURL}/api/products`)
      .then(response => {
        setDanhSachSanPham(response.data);
      })
      .catch(error => {
        console.log('Có lỗi khi lấy API:', error);
        toast.error('Có lỗi khi lấy danh sách sản phẩm', {
          position: 'top-right',
          autoClose: 3000,
        });
      });
  };

  useEffect(() => {
    layDanhSachSanPham();
  }, []);

  // Mở modal thêm sản phẩm mới
  const moModalThemSanPham = () => {
    setChinhSua(false);
    setSanPhamHienTai(null);
    setHienThiModal(true);
  };

  // Mở modal sửa sản phẩm
  const moModalSuaSanPham = (sanPham) => {  
    setChinhSua(true);
    setSanPhamHienTai(sanPham);
    setHienThiModal(true);
  };

  // Xóa sản phẩm
  const xoaSanPham = (id) => {
    const SanphamXoa = danhSachSanPham.find((sanpham) => sanpham.id === id);
    axios.delete(`${process.env.REACT_APP_BASEURL}/api/products/${id}`)
      .then(() => {
        toast.success(`Sản phẩm ${SanphamXoa.title} đã được xóa thành công!`, {
          position: 'top-right',
          autoClose: 3000,
        });
        layDanhSachSanPham(); // Cập nhật danh sách sản phẩm
      })
      .catch(error => {
        console.log('Lỗi khi xóa sản phẩm:', error);
        toast.error(`Sản phẩm ${SanphamXoa.title} chưa xóa được, vui lòng thử lại!`, {
          position: 'top-right',
          autoClose: 3000,
        });
      });
  };

  // Hiển thị modal với nội dung chi tiết
  const [hienThiModalChiTiet, setHienThiModalChiTiet] = useState(false);
  const [noiDungChiTiet, setNoiDungChiTiet] = useState('');

  const moModalChiTiet = (noiDung) => {
    setNoiDungChiTiet(noiDung);
    setHienThiModalChiTiet(true);
  };

  return (
    <div id="wrapper">
      <Sidebar />

      <div id="content-wrapper" className="d-flex flex-column">
        {/* Main Content */}
        <div id="content">
          <HeaderAdmin/>
          {/* Content Header */}
          <div className="content-header">
            <div className="container-fluid">
              <div className="row mb-2">
                <div className="col-sm-6">
                  <h1 className="h3 mb-0 text-gray-800">Danh sách sản phẩm</h1>
                </div>
                <div className="col-sm-6">
                  <ol className="breadcrumb float-sm-right">
                    <li className="breadcrumb-item"><a href="#">Home</a></li>
                    <li className="breadcrumb-item active">Sản Phẩm</li>
                  </ol>
                </div>
              </div>
            </div>
          </div>

          {/* Main content */}
          <div className="container-fluid">
            <div className="card shadow mb-4">
              <div className="card-header py-3 d-flex justify-content-between align-items-center">
                <h3 className="m-0 font-weight-bold text-primary">Danh sách sản phẩm</h3>
                <button className="btn btn-primary" onClick={moModalThemSanPham}>
                  <i className="fas fa-plus"></i> Thêm sản phẩm
                </button>
              </div>
              <div className="card-body table-responsive" style={{ maxHeight: '400px' }}>
                <table className="table table-bordered table-hover table-striped">
                  <thead>
                    <tr>
                      <th scope="col">STT</th>
                      <th scope="col">Hình ảnh</th>
                      <th scope="col">Tên</th> 
                      <th scope="col">Nội dung</th>
                      <th scope="col">Giá</th>
                      <th scope='col'>Trạng thái</th>
                      <th scope="col">Chức năng</th>
                    </tr>
                  </thead>
                  <tbody>
                    {sanPhamTheoTrang.map((sanPham, index) => (
                      <tr key={nanoid()}>
                        <td>{viTriSanPhamDau + index + 1}</td>
                        <td>
                          <div className="d-flex align-items-center">
                            <img 
                              src={`${process.env.REACT_APP_BASEURL}/storage/${sanPham.image}`} 
                              alt={sanPham.title} 
                              style={{ height: '50px', objectFit: 'cover' }} 
                            />
                          </div>
                        </td>
                        <td>{sanPham.title}</td>
                        <td>
                          {sanPham.description.length > 10 ? (
                            <>
                              {sanPham.description.substring(0, 10)}...
                              <Button variant="link" onClick={() => moModalChiTiet(sanPham.description)}>
                                Xem chi tiết
                              </Button>
                            </>
                          ) : (
                            sanPham.description
                          )}
                        </td>
                        <td>{sanPham.price} vnđ / kg</td>
                        <td>{sanPham.status}</td>
                        <td>
                          <Button variant="primary me-2" onClick={() => moModalSuaSanPham(sanPham)}>
                            <i className="fas fa-edit"></i>
                          </Button>
                          <Button variant="danger" onClick={() => xoaSanPham(sanPham.id)}>
                            <i className="fas fa-trash"></i>
                          </Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
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

        {/* Modal Thêm/Sửa Sản Phẩm */}
        <ModlaSanpham
          show={hienThiModal}
          handleClose={() => setHienThiModal(false)}
          isEdit={chinhSua}
          product={sanPhamHienTai}
          fetchSanpham={layDanhSachSanPham}    
        />

        <Footer />
        <ToastContainer />

        {/* Modal để hiển thị nội dung chi tiết */}
        <Modal show={hienThiModalChiTiet} onHide={() => setHienThiModalChiTiet(false)}>
          <Modal.Header closeButton>
            <Modal.Title>Chi Tiết Nội Dung</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            {noiDungChiTiet}
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
