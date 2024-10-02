import React, { useEffect, useState } from 'react';
import Sidebar from '../Sidebar';
import Footer from '../Footer';
import Header from '../Header';
import axios from 'axios';
import { Button, Modal, Form } from 'react-bootstrap';
import { nanoid } from 'nanoid';

const LienHeAdmin = () => {
  const [danhSachLienHe, setDanhSachLienHe] = useState([]);
  const [danhSachLienHeLoc, setDanhSachLienHeLoc] = useState([]);
  const [trangHienTai, setTrangHienTai] = useState(1);
  const soPhanTuMotTrang = 4;
  const [hienThiModal, setHienThiModal] = useState(false);
  const [noiDungChiTiet, setNoiDungChiTiet] = useState('');
  const [ngayLoc, setNgayLoc] = useState('');

  // Logic phân trang
  const chiSoPhanTuCuoi = trangHienTai * soPhanTuMotTrang;
  const chiSoPhanTuDau = chiSoPhanTuCuoi - soPhanTuMotTrang;
  const cacPhanTuHienTai = danhSachLienHeLoc.slice(chiSoPhanTuDau, chiSoPhanTuCuoi);
  const tongSoTrang = Math.ceil(danhSachLienHeLoc.length / soPhanTuMotTrang);

  const thayDoiTrang = (soTrang) => setTrangHienTai(soTrang);

  // Lấy danh sách liên hệ từ API
  const layDanhSachLienHe = () => {
    axios.get('http://127.0.0.1:8000/api/lienhe')
      .then(response => {
        setDanhSachLienHe(response.data);
        setDanhSachLienHeLoc(response.data);
      })
      .catch(error => {
        console.error('Lỗi khi lấy danh sách liên hệ:', error);
      });
  };

  useEffect(() => {
    layDanhSachLienHe();
  }, []);

  // Xóa liên hệ
  const xoaLienHe = (id) => {
    axios.delete(`http://127.0.0.1:8000/api/lienhe/${id}`)
      .then(() => {
        window.alert('Liên hệ đã được xóa thành công');
        layDanhSachLienHe();
      })
      .catch(error => console.error('Lỗi khi xóa liên hệ:', error));
  };

  // Hiển thị modal với nội dung chi tiết
  const hienThiChiTiet = (ghichu) => {
    setNoiDungChiTiet(ghichu);
    setHienThiModal(true);
  };

  // Lọc danh sách liên hệ theo ngày
  const locTheoNgay = (ngay) => {
    setNgayLoc(ngay);
    if (ngay) {
      const danhSachLoc = danhSachLienHe.filter(item => item.created_at.startsWith(ngay));
      setDanhSachLienHeLoc(danhSachLoc);
    } else {
      setDanhSachLienHeLoc(danhSachLienHe);
    }
  };

  return (
    <div>
      <Header />
      <div className="d-flex">
        <Sidebar />
        <div className="flex-grow-1">
          <div className="container">
            <h1 className="mb-4">Danh Sách Liên Hệ</h1>

            {/* Bộ lọc theo ngày */}
            <Form.Group controlId="formNgayLoc" className="mb-4">
              <Form.Label>Lọc theo ngày</Form.Label>
              <Form.Control
                type="date"
                value={ngayLoc}
                onChange={(e) => locTheoNgay(e.target.value)}
              />
            </Form.Group>

            {/* Bảng hiển thị liên hệ */}
            <div className="table-responsive" style={{ maxHeight: '400px', overflowY: 'auto' }}>
              <table className="table table-bordered border-dark table-hover">
                <thead>
                  <tr>
                    <th scope="col">STT</th>
                    <th scope="col">Họ Tên</th>
                    <th scope="col">Email</th>
                    <th scope="col">Số Điện Thoại</th>
                    <th scope="col">Nội Dung</th>
                    <th scope="col">Ngày Tạo</th>
                    <th scope="col">Chức Năng</th>
                  </tr>
                </thead>
                <tbody>
                  {cacPhanTuHienTai.map((item, index) => (
                    <tr key={nanoid()}>
                      <td>{chiSoPhanTuDau + index + 1}</td>
                      <td>{item.ten}</td>
                      <td>{item.email}</td>
                      <td>{item.sdt}</td>
                      <td>
                        {item.ghichu.length > 10 ? (
                          <>
                            {item.ghichu.substring(0, 10)}...
                            <Button variant="link" onClick={() => hienThiChiTiet(item.ghichu)}>
                              Xem chi tiết
                            </Button>
                          </>
                        ) : (
                          item.ghichu
                        )}
                      </td>
                      <td>{new Date(item.created_at).toLocaleDateString()}</td>
                      <td>
                        <Button
                          variant="danger"
                          onClick={() => xoaLienHe(item.id)}
                        >
                          <i className="bi bi-trash3-fill"></i> Xóa
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
                  <button className="page-link" onClick={() => thayDoiTrang(trangHienTai > 1 ? trangHienTai - 1 : 1)}>«</button>
                </li>
                {[...Array(tongSoTrang)].map((_, i) => (
                  <li key={i + 1} className={`page-item ${trangHienTai === i + 1 ? 'active' : ''}`}>
                    <button className="page-link" onClick={() => thayDoiTrang(i + 1)}>{i + 1}</button>
                  </li>
                ))}
                <li className={`page-item ${trangHienTai === tongSoTrang ? 'disabled' : ''}`}>
                  <button className="page-link" onClick={() => thayDoiTrang(trangHienTai < tongSoTrang ? trangHienTai + 1 : tongSoTrang)}>»</button>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      <Footer />

      {/* Modal để hiển thị nội dung chi tiết */}
      <Modal show={hienThiModal} onHide={() => setHienThiModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Chi Tiết Nội Dung</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {noiDungChiTiet}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setHienThiModal(false)}>
            Đóng
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default LienHeAdmin;