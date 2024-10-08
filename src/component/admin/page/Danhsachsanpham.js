import React, { useEffect, useState } from 'react';
import Sidebar from '../SidebarAdmin';
import Footer from '../Footer';
import HeaderAdmin from '../HeaderAdmin'; // Import HeaderAdmin component

import axios from 'axios';
import { Button } from 'react-bootstrap';
import ModalThemDanhMucSanPham from '../modla/ModlaDanhsachsanpham';
import { nanoid } from 'nanoid';
import { toast, ToastContainer } from 'react-toastify';
import SiderbarAdmin from '../SidebarAdmin';

const DanhSachSanPham = () => {
  const [danhSachDanhMuc, setDanhSachDanhMuc] = useState([]);
  const [trangHienTai, setTrangHienTai] = useState(1);
  const danhMucMoiTrang = 4;

  // Logic phân trang
  const viTriDanhMucCuoi = trangHienTai * danhMucMoiTrang;
  const viTriDanhMucDau = viTriDanhMucCuoi - danhMucMoiTrang;
  const danhMucTheoTrang = danhSachDanhMuc.slice(viTriDanhMucDau, viTriDanhMucCuoi);
  const tongSoTrang = Math.ceil(danhSachDanhMuc.length / danhMucMoiTrang);

  const phanTrang = (soTrang) => setTrangHienTai(soTrang);

  const [hienThiModal, setHienThiModal] = useState(false);
  const [chinhSua, setChinhSua] = useState(false);
  const [danhMucHienTai, setDanhMucHienTai] = useState(null);

  // Lấy danh sách danh mục từ API
  const layDanhSachDanhMuc = () => {
    axios.get(`${process.env.REACT_APP_BASEURL}/api/danhsachsanpham`)
      .then(response => {
        setDanhSachDanhMuc(response.data);
      })
      .catch(error => {
        console.log('Lỗi khi lấy danh sách danh mục:', error);
        toast.error('Lỗi khi lấy danh sách danh mục:', {
          position: 'top-right',
          autoClose: 3000
        });
      });
  };

  useEffect(() => {
    layDanhSachDanhMuc();
  }, []);

  // Mở modal để thêm danh mục mới
  const moModalThemDanhMuc = () => {
    setChinhSua(false);
    setDanhMucHienTai(null);
    setHienThiModal(true);
  };

  // Mở modal để chỉnh sửa danh mục (tham số)
  const moModalSuaDanhMuc = (danhMuc) => {
    setChinhSua(true);
    setDanhMucHienTai(danhMuc);
    setHienThiModal(true);
  };

  // Xóa danh mục
  const xoaDanhMuc = (id) => {
    axios.delete(`${process.env.REACT_APP_BASEURL}/api/danhsachsanpham/${id}`)
      .then(() => {
        toast.success('Đã xóa danh mục thành công!', {
          position: 'top-right',
          autoClose: 3000,
        });
        layDanhSachDanhMuc();
      })
      .catch(error => {
        console.log('Có lỗi khi xóa danh mục:', error);
        toast.error('Có lỗi khi xóa danh mục!', {
          position: 'top-right',
          autoClose: 3000,
        });
      });
  };

  return (
    <div id="wrapper">
      <SiderbarAdmin />

      <div id="content-wrapper" className="d-flex flex-column">
        {/* Main Content */}
        <div id="content">
          <HeaderAdmin />

          {/* Begin Page Content */}
          <div className="container-fluid">
            {/* Page Heading */}
            <div className="d-sm-flex align-items-center justify-content-between mb-4">
              <h1 className="h3 mb-0 text-gray-800">Danh mục sản phẩm</h1>
            </div>

            {/* Content Row */}
            <div className="row">
              <div className="col-xl-12 col-lg-12">
                <div className="card shadow mb-4">
                  <div className="card-header py-3 d-flex flex-row align-items-center justify-content-between">
                    <h6 className="m-0 font-weight-bold text-primary">Danh sách danh mục</h6>
                    <div className="card-tools">
                      <Button variant="primary" onClick={moModalThemDanhMuc}>
                        <i className="fas fa-plus-circle"></i> Thêm danh mục
                      </Button>
                    </div>
                  </div>

                  {/* Bảng danh mục sản phẩm */}
                  <div className="card-body table-responsive p-0" style={{ maxHeight: '400px' }}>
                    <table className="table table-bordered table-hover table-striped">
                      <thead>
                        <tr>
                          <th scope="col">STT</th>
                          <th scope="col">Tên</th>
                          <th scope="col">Chức năng</th>
                        </tr>
                      </thead>
                      <tbody>
                        {danhMucTheoTrang.map((danhMuc, index) => (
                          <tr key={nanoid()}>
                            <td>{viTriDanhMucDau + index + 1}</td>
                            <td>{danhMuc.name}</td>
                            <td>
                              <Button
                                variant="primary me-2"
                                onClick={() => moModalSuaDanhMuc(danhMuc)}
                              >
                                <i className="fas fa-edit"></i>
                              </Button>
                              <Button
                                variant="danger"
                                onClick={() => xoaDanhMuc(danhMuc.id)}
                              >
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
          </div>
          {/* End of Page Content */}
        </div>

        <Footer />
      </div>

      {/* Modal Thêm/Sửa danh mục */}
      <ModalThemDanhMucSanPham
        show={hienThiModal} // Hiển thị hoặc ẩn modal dựa trên trạng thái hienThiModal
        handleClose={() => setHienThiModal(false)} // Hàm đóng modal
        isEdit={chinhSua}  // Truyền trạng thái chỉnh sửa hay không
        product={danhMucHienTai}  // Truyền danh mục hiện tại cần chỉnh sửa
        fetchProducts={layDanhSachDanhMuc} // Hàm để lấy lại danh sách sản phẩm sau khi chỉnh sửa
      />

      <ToastContainer />
    </div>
  );
};

export default DanhSachSanPham;
