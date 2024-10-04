import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Button, Modal, Form } from 'react-bootstrap';
import { nanoid } from 'nanoid';
import Header from './../Header';
import Sidebar from './../Sidebar';
import Footer from '../Footer';

const Khachhangs = () => {
  const [danhSachKhachHang, setDanhSachKhachHang] = useState([]);
  const [trangHienTai, setTrangHienTai] = useState(1);
  const soPhanTuMotTrang = 4;
  const [hienThiModal, setHienThiModal] = useState(false);
  const [chiTietKhachHang, setChiTietKhachHang] = useState(null);
  const [timKiem, setTimKiem] = useState('');
  const [khachHangHienThi, setKhachHangHienThi] = useState([]);

  const chiSoPhanTuCuoi = trangHienTai * soPhanTuMotTrang;
  const chiSoPhanTuDau = chiSoPhanTuCuoi - soPhanTuMotTrang;
  const cacPhanTuHienTai = khachHangHienThi.slice(chiSoPhanTuDau, chiSoPhanTuCuoi);
  const tongSoTrang = Math.ceil(khachHangHienThi.length / soPhanTuMotTrang);

  const thayDoiTrang = (soTrang) => setTrangHienTai(soTrang);

  const layDanhSachKhachHang = () => {
    axios.get('http://127.0.0.1:8000/api/khachhangs')
      .then(response => {
        setDanhSachKhachHang(response.data);
        setKhachHangHienThi(response.data);
      })
      .catch(error => {
        console.error('Lỗi khi lấy danh sách khách hàng:', error);
      });
  };

  useEffect(() => {
    layDanhSachKhachHang();
  }, []);

  const xuLyTimKiem = (e) => {
    const giaTriTimKiem = e.target.value.toLowerCase();
    setTimKiem(giaTriTimKiem);

    if (giaTriTimKiem) {
      const ketQuaLoc = danhSachKhachHang.filter(khachHang =>
        (khachHang.ho + ' ' + khachHang.ten).toLowerCase().includes(giaTriTimKiem)
      );
      setKhachHangHienThi(ketQuaLoc);
    } else {
      setKhachHangHienThi(danhSachKhachHang);
    }
  };

  const xoaKhachHang = (id) => {
    axios.delete(`http://127.0.0.1:8000/api/khachhangs/${id}`)
      .then(() => {
        window.alert('Khách hàng đã được xóa thành công');
        layDanhSachKhachHang();
      })
      .catch(error => console.error('Lỗi khi xóa khách hàng:', error));
  };

  const hienThiChiTiet = (id) => {
    axios.get(`http://127.0.0.1:8000/api/khachhangs/${id}`)
      .then(response => {
        setChiTietKhachHang(response.data);
        setHienThiModal(true);
      })
      .catch(error => {
        console.error('Lỗi khi lấy chi tiết khách hàng:', error);
      });
  };

  const capNhatTrangThai = (billId, newStatus) => {
    axios.put(`http://127.0.0.1:8000/api/orders/${billId}/status`, { status: newStatus })
      .then(() => {
        window.alert('Trạng thái đơn hàng đã được cập nhật');
        hienThiChiTiet(chiTietKhachHang.id);
      })
      .catch(error => {
        console.error('Lỗi khi cập nhật trạng thái đơn hàng:', error);
      });
  };

  return (
    <>
      <Header />
      <div className='d-flex '>
        <Sidebar />
        <div className='flex-grow-1 '>
          <div className="container">
            <h1 className="mb-4">Danh Sách Khách Hàng</h1>

            <div className="mb-4">
              <input
                type="text"
                className="form-control"
                placeholder="Tìm kiếm theo tên khách hàng"
                value={timKiem}
                onChange={xuLyTimKiem}
              />
            </div>

            <div className="table-responsive" style={{ maxHeight: '400px', overflowY: 'auto' }}>
              <table className="table table-bordered border-dark table-hover">
                <thead>
                  <tr>
                    <th scope="col">STT</th>
                    <th scope="col">Họ Tên</th>
                    <th scope="col">Email</th>
                    <th scope="col">Số Điện Thoại</th>
                    <th scope='col'>Địa chỉ chi tiết</th>
                    <th scope='col'>Thành phố</th>
                    <th scope="col">Chức Năng</th>
                  </tr>
                </thead>
                <tbody>
                  {cacPhanTuHienTai.length > 0 ? (
                    cacPhanTuHienTai.map((item, index) => (
                      <tr key={nanoid()}>
                        <td>{chiSoPhanTuDau + index + 1}</td>
                        <td>{item.ho} {item.ten}</td>
                        <td>{item.Emaildiachi}</td>
                        <td>{item.sdt}</td>
                        <td>{item.diachicuthe}</td>
                        <td>{item.thanhpho}</td>
                        <td>
                          <Button variant="info" onClick={() => hienThiChiTiet(item.id)}>
                            Xem chi tiết
                          </Button>{' '}
                          <Button variant="danger" onClick={() => xoaKhachHang(item.id)}>
                            Xóa
                          </Button>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="7" className="text-center">Không tìm thấy khách hàng</td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>

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

        <Modal show={hienThiModal} onHide={() => setHienThiModal(false)}>
          <Modal.Header closeButton>
            <Modal.Title>Chi Tiết Khách Hàng</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            {chiTietKhachHang && (
              <div>
                <p><strong>Họ Tên:</strong> {chiTietKhachHang.ho} {chiTietKhachHang.ten}</p>
                <p><strong>Email:</strong> {chiTietKhachHang.Emaildiachi}</p>
                <p><strong>Số Điện Thoại:</strong> {chiTietKhachHang.sdt}</p>
                <p><strong>Hóa Đơn:</strong></p>
                {chiTietKhachHang.bills.map((bill, index) => (
                  <div key={index}>
                    <p>Hóa đơn #{index + 1}: Tổng tiền - {bill.total_price}</p>
                    <p><strong>Trạng thái:</strong> {bill.status}</p>
                    <p><strong>Mã đơn hàng:</strong> {bill.order_code}</p>
                    <p>Chi tiết:</p>
                    <ul>
                      {bill.billchitiets.map((chitiet, idx) => (
                        <li key={idx}>
                          Sản phẩm: {chitiet.sanpham_names} x {chitiet.quantity}, Giá: {chitiet.price} (VND)
                        </li>
                      ))}
                    </ul>
                    {/* Hiển thị nút xóa nếu trạng thái là "Hủy đơn" */}
                    {bill.status === 'Hủy đơn' && (
                      <Button variant="danger" onClick={() => xoaKhachHang(chiTietKhachHang.id)}>Xóa đơn hàng</Button>
                    )}
                    {/* Chỉ hiển thị Form.Group nếu trạng thái không phải là "Hủy đơn" hoặc "Đã giao thành công" */}
                    {bill.status !== 'Hủy đơn' && bill.status !== 'Đã giao thành công' && (
                      <Form.Group controlId="formTrangThai">
                        <Form.Label>Trạng thái đơn hàng:</Form.Label>
                        <Form.Control
                          as="select"
                          value={bill.status}
                          onChange={(e) => capNhatTrangThai(bill.id, e.target.value)}
                        >
                          <option value="Chờ xử lý">Chờ xử lý</option>
                          <option value="Đang giao">Đang giao</option>
                          <option value="Đã giao thành công">Đã giao thành công</option>
                          <option value="Hủy đơn">Hủy đơn</option>
                          <option value="Giao không thành công">Giao không thành công</option>
                        </Form.Control>
                      </Form.Group>
                    )}
                  </div>
                ))}
              </div>
            )}
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={() => setHienThiModal(false)}>Đóng</Button>
          </Modal.Footer>
        </Modal>
      </div>
      <Footer />
    </>
  );
};

export default Khachhangs;
