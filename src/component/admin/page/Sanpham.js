import React, { useEffect, useState } from 'react';
import Sidebar from '../Sidebar';
import Footer from '../Footer';
import Header from '../Header';
import axios from 'axios';
import ThemHoacSuaSanPhamModal from '../modla/AddProduct';
import { Button, Modal } from 'react-bootstrap';
import { nanoid } from 'nanoid';

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
    axios.get('http://127.0.0.1:8000/api/products')
      .then(response => {
        setDanhSachSanPham(response.data);
      })
      .catch(error => {
        console.log('Có lỗi khi lấy dữ liệu từ API ', error);
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
    axios.delete(`http://127.0.0.1:8000/api/products/${id}`)
      .then(() => {
        window.alert('Đã xóa sản phẩm thành công');
        layDanhSachSanPham(); // Cập nhật danh sách sản phẩm
      })
      .catch(error => console.log('Lỗi khi xóa sản phẩm:', error));
    console.log("Đã xóa sản phẩm thành công:", id);
  };
  
  // Hiển thị modal với nội dung chi tiết
  const [hienThiModalChiTiet, setHienThiModalChiTiet] = useState(false);
  const [noiDungChiTiet, setNoiDungChiTiet] = useState('');

  const moModalChiTiet = (noiDung) => {
    setNoiDungChiTiet(noiDung);
    setHienThiModalChiTiet(true);
  };

  return (
    <div>
      <Header />
      <div className="d-flex">
        <Sidebar />
        <div className="flex-grow-1">
          <div className="container">
            <h1 className="mb-4">Danh sách sản phẩm</h1>

            <div className="text-end mb-3">
              <button className="btn btn-primary" onClick={moModalThemSanPham}>
                <i className="bi bi-file-plus-fill"></i> Thêm sản phẩm
              </button>
            </div>

            {/* Bảng sản phẩm */}
            <div className="table-responsive" style={{ maxHeight: '400px', overflowY: 'auto', overflowX: 'auto' }}>
              <table className="table table-bordered border-dark table-hover table-striped">
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
                      <td>
                        <p className="mb-0 mt-4">{viTriSanPhamDau + index + 1}</p>
                      </td>
                      <td>
                        <div className="d-flex align-items-center">
                          <img 
                            src={`http://127.0.0.1:8000/storage/${sanPham.image}`} 
                            alt={sanPham.title} 
                            style={{ height: '50px', objectFit: 'cover' }} 
                          />
                        </div>
                      </td>
                      <td>
                        <p className="mb-0 mt-4">{sanPham.title}</p>
                      </td>
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
                      <td>
                        <p className="mb-0 mt-4">{sanPham.price} vnđ / kg</p>
                      </td>
                      <td className='mb-0 mt-4'>{sanPham.status}</td>
                      <td>
                        <Button variant="primary me-2" onClick={() => moModalSuaSanPham(sanPham)}>
                          <i className="bi bi-pencil-square"></i>
                        </Button>
                        <Button variant="danger" onClick={() => xoaSanPham(sanPham.id)}>
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

      {/* Modal Thêm/Sửa Sản Phẩm */}
      <ThemHoacSuaSanPhamModal
        show={hienThiModal}
        handleClose={() => setHienThiModal(false)}
        isEdit={chinhSua}
        product={sanPhamHienTai}
        fetchSanpham={layDanhSachSanPham}
      />
      
      <Footer />

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
  );
};

export default SanPham;
