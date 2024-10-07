import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Button } from 'react-bootstrap';
import { nanoid } from 'nanoid';

import Sidebar from './../Sidebar';
import Footer from '../Footer';
import { toast, ToastContainer } from 'react-toastify';
import ModalChiTietKhachHang from '../modla/ModaChiTietKhachHang';
import HeaderAdmin from '../HeaderAdmin';

const Khachhangs = () => {
  // Khai báo các state cần thiết
  const [danhSachKhachHang, setDanhSachKhachHang] = useState([]);
  const [trangHienTai, setTrangHienTai] = useState(1);
  const soPhanTuMotTrang = 10; // Số phần tử hiển thị trên mỗi trang
  const [hienThiModal, setHienThiModal] = useState(false);
  const [chiTietKhachHang, setChiTietKhachHang] = useState(null);
  const [timKiem, setTimKiem] = useState('');
  const [khachHangHienThi, setKhachHangHienThi] = useState([]);

  // Tính toán các phần tử hiện tại để hiển thị dựa trên trang hiện tại
  const chiSoPhanTuCuoi = trangHienTai * soPhanTuMotTrang;
  const chiSoPhanTuDau = chiSoPhanTuCuoi - soPhanTuMotTrang;
  const cacPhanTuHienTai = khachHangHienThi.slice(chiSoPhanTuDau, chiSoPhanTuCuoi);
  const tongSoTrang = Math.ceil(khachHangHienThi.length / soPhanTuMotTrang);

  // Hàm thay đổi trang
  const thayDoiTrang = (soTrang) => setTrangHienTai(soTrang);

  // Hàm lấy danh sách khách hàng từ API
  const layDanhSachKhachHang = () => {
    axios.get(`${process.env.REACT_APP_BASEURL}/api/khachhangs`)
      .then(response => {
        // Cập nhật danh sách khách hàng
        setDanhSachKhachHang(response.data);
        setKhachHangHienThi(response.data);
      })
      .catch(error => {
        console.log('Có lỗi khi lấy danh sách khách hàng:', error);
        toast.error('Có lỗi khi lấy danh sách khách hàng', {
          position: 'top-right',
          autoClose: 3000
        });
      });
  };

  // Lấy danh sách khách hàng khi component được mount
  useEffect(() => {
    layDanhSachKhachHang();
  }, []);

  // Hàm xử lý tìm kiếm
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

  // Hàm xóa khách hàng
  const xoaKhachHang = (id) => {
    axios.delete(`${process.env.REACT_APP_BASEURL}/api/khachhangs/${id}`)
      .then(() => {
        toast.success('Xóa khách hàng thành công!', {
          position: 'top-right',
          autoClose: 3000,
        });
        layDanhSachKhachHang(); // Lấy lại danh sách sau khi xóa
        setHienThiModal(false);
      })
      .catch(error => {
        console.log('Có lỗi khi xóa khách hàng:', error);
        toast.error('Có lỗi khi xóa khách hàng!', {
          position: 'top-right',
          autoClose: 3000
        });
      });
  };

  // Hàm hiển thị chi tiết khách hàng
  const hienThiChiTiet = (id) => {
    axios.get(`${process.env.REACT_APP_BASEURL}/api/khachhangs/${id}`)
      .then(response => {
        setChiTietKhachHang(response.data);
        setHienThiModal(true);
      })
      .catch(error => {
        console.log('Có lỗi khi lấy chi tiết khách hàng:', error);
        toast.error('Có lỗi khi lấy chi tiết khách hàng', {
          position: 'top-right',
          autoClose: 3000
        });
      });
  };

  // Hàm cập nhật trạng thái đơn hàng
  const capNhatTrangThai = (billId, newStatus) => {
    axios.put(`${process.env.REACT_APP_BASEURL}/api/orders/${billId}/status`, { status: newStatus })
      .then(() => {
        toast.success('Đã cập nhật trạng thái đơn hàng thành công!', {
          position: 'top-right',
          autoClose: 3000
        });
        hienThiChiTiet(chiTietKhachHang.id);
      })
      .catch(error => {
        console.log('Có lỗi khi cập nhật trạng thái đơn hàng:', error);
        toast.error('Có lỗi khi cập nhật trạng thái đơn hàng!', {
          position: 'top-right',
          autoClose: 3000
        });
      });
  };

  return (
    <div id="wrapper">
      <Sidebar />

      <div id="content-wrapper" className="d-flex flex-column">
        {/* Main Content */}
        <div id="content">
          <HeaderAdmin />
          <div id="content">
            {/* Content Header */}
            <div className="content-header">
              <div className="container-fluid">
                <div className="row mb-2">
                  <div className="col-sm-6">
                    <h1 className="h3 mb-0 text-gray-800">Danh Sách Khách Hàng</h1>
                  </div>
                  <div className="col-sm-6">
                    <ol className="breadcrumb float-sm-right">
                      <li className="breadcrumb-item"><a href="#">Home</a></li>
                      <li className="breadcrumb-item active">Danh Sách Khách Hàng</li>
                    </ol>
                  </div>
                </div>
              </div>
            </div>

            {/* Main content */}
            <div className="container-fluid">
              <div className="card shadow mb-4">
                <div className="card-header py-3 d-flex justify-content-between align-items-center">
                  <h3 className="m-0 font-weight-bold text-primary">Danh Sách Khách Hàng</h3>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Tìm kiếm theo tên khách hàng"
                    value={timKiem}
                    onChange={xuLyTimKiem}
                    style={{ maxWidth: '300px' }}
                  />
                </div>

                {/* Bảng danh sách khách hàng */}
                {/* ?: Có thể hiểu là "nếu đúng thì..."
                    :: Có thể hiểu là "nếu không thì..." */}
                <div className="card-body table-responsive" style={{ maxHeight: '400px' }}>
                  <table className="table table-bordered table-hover table-striped">
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
                      {/* Kiểm tra nếu không có dữ liệu */}
                      {danhSachKhachHang.length === 0 ? (
                        <tr>
                          <td colSpan="7" className="text-center">Hiện tại chưa có khách hàng</td>
                        </tr>
                      ) : cacPhanTuHienTai.length > 0 ? (
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

                {/* Phân trang */}
                <div className="card-footer clearfix">
                  <ul className="pagination pagination-sm m-0 float-right">
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
        </div>
        {/* Sử dụng ModalChiTietKhachHang component */}
        <ModalChiTietKhachHang
          show={hienThiModal}
          handleClose={() => setHienThiModal(false)}
          chiTietKhachHang={chiTietKhachHang}
          capNhatTrangThai={capNhatTrangThai}
          xoaKhachHang={xoaKhachHang}
        />

        <Footer />
        <ToastContainer />
      </div>
    </div>
  );
};

export default Khachhangs;
