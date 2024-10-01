import React, { useEffect, useState } from 'react';
import Sidebar from '../Sidebar';
import Footer from '../Footer';
import Header from '../Header';
import axios from 'axios';
import { Button } from 'react-bootstrap';
import ModalThemDanhMucSanPham from '../modla/ModlaDanhsachsanpham';
import { nanoid } from 'nanoid';

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
    axios.get('http://127.0.0.1:8000/api/danhsachsanpham')
      .then(response => {
        setDanhSachDanhMuc(response.data);
      })
      .catch(error => {
        console.log('Lỗi khi lấy danh sách danh mục:', error);
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

  // Mở modal để chỉnh sửa danh mục
  const moModalSuaDanhMuc = (danhMuc) => {
    setChinhSua(true);
    setDanhMucHienTai(danhMuc);
    setHienThiModal(true);
  };

  // Xóa danh mục
  const xoaDanhMuc = (id) => {
    axios.delete(`http://127.0.0.1:8000/api/danhsachsanpham/${id}`)
      .then(() => {
        window.alert('Đã xóa danh mục thành công');
        layDanhSachDanhMuc();
      })
      .catch(error => console.log('Lỗi khi xóa danh mục:', error));
  };

  return (
    <div>
      <Header />
      <div className="d-flex">
        <Sidebar />
        <div className="flex-grow-1">
          <div className="container">
            <h1 className="mb-4">Danh mục sản phẩm</h1>
            <div className="text-end mb-3">
              <Button variant="primary" onClick={moModalThemDanhMuc}>
                <i className="bi bi-file-plus-fill"> Thêm danh mục</i>
              </Button>
            </div>

            {/* Bảng danh mục sản phẩm */}
            <div className="table-responsive" style={{ maxHeight: '400px', overflowY: 'auto' }}>
              <table className="table table-bordered border-dark table-hover">
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
                      <td>
                        <p className='mb-0 mt-4'>{viTriDanhMucDau + index + 1}</p>
                      </td>
                      <td>
                        <p className="mb-0 mt-4">{danhMuc.name}</p>
                      </td>
                      <td>
                        <Button
                          variant="primary me-2"
                          onClick={() => moModalSuaDanhMuc(danhMuc)}
                        >
                          <i className="bi bi-pencil-square"></i>
                        </Button>{' '}
                        <Button
                          variant="danger"
                          onClick={() => xoaDanhMuc(danhMuc.id)}
                        >
                          <i className="bi bi-trash3-fill"></i>
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Phân trang */}
            <div className="d-flex justify-content-center mt-5">
              <ul className="pagination">
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

      {/* Modal Thêm/Sửa danh mục */}
      <ModalThemDanhMucSanPham
        show={hienThiModal}
        handleClose={() => setHienThiModal(false)}
        isEdit={chinhSua}
        product={danhMucHienTai}
        fetchProducts={layDanhSachDanhMuc}
      />

      <Footer />
    </div>
  );
};

export default DanhSachSanPham
