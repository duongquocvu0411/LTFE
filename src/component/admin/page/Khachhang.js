import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Button, Spinner } from 'react-bootstrap';
import { nanoid } from 'nanoid';

import Footer from '../Footer';
import { toast, ToastContainer } from 'react-toastify';
import ModalChiTietKhachHang from '../modla/ModaChiTietKhachHang';
import HeaderAdmin from '../HeaderAdmin';
import SiderbarAdmin from '../SidebarAdmin';
import { Link } from 'react-router-dom';

const Khachhangs = () => {
  const [danhSachKhachHang, setDanhSachKhachHang] = useState([]);
  const [trangHienTai, setTrangHienTai] = useState(1);
  const soPhanTuMotTrang = 10;
  const [hienThiModal, setHienThiModal] = useState(false);
  const [chiTietKhachHang, setChiTietKhachHang] = useState(null);
  const [timKiem, setTimKiem] = useState('');
  const [timKiemTrangThai, setTimKiemTrangThai] = useState('');
  const [khachHangHienThi, setKhachHangHienThi] = useState([]);
  const [dangtai, setDangtai] = useState(false);

  const chiSoPhanTuCuoi = trangHienTai * soPhanTuMotTrang;
  const chiSoPhanTuDau = chiSoPhanTuCuoi - soPhanTuMotTrang;
  const cacPhanTuHienTai = khachHangHienThi.slice(chiSoPhanTuDau, chiSoPhanTuCuoi);
  const tongSoTrang = Math.ceil(khachHangHienThi.length / soPhanTuMotTrang);

  const thayDoiTrang = (soTrang) => setTrangHienTai(soTrang);

  const layDanhSachKhachHang = async () => {
    setDangtai(true);
    try {
      const response = await axios.get(`${process.env.REACT_APP_BASEURL}/api/khachhang`);
      setDanhSachKhachHang(response.data);
      setKhachHangHienThi(response.data);
      setDangtai(false);
    } catch (error) {
      console.log('có lỗi khi lấy danh sách khách hàng', error);
      toast.error('có lỗi khi lấy danh sách', {
        position: 'top-right',
        autoClose: 3000
      });
    }
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


  const xuLyLocTrangThai = (e) => {
    const giaTriLocTrangThai = e.target.value;
    setTimKiemTrangThai(giaTriLocTrangThai);

    // Lọc theo trạng thái đơn hàng
    if (giaTriLocTrangThai) {
      const ketQuaLoc = danhSachKhachHang.filter((khachHang) =>
        khachHang.hoaDons.some(
          (hoadon) => hoadon.status === giaTriLocTrangThai
        )
      );
      setKhachHangHienThi(ketQuaLoc);
    } else {
      setKhachHangHienThi(danhSachKhachHang); // Nếu không có giá trị lọc, hiển thị toàn bộ danh sách
    }
  };

  const xoaKhachHang = async (id, ten) => {
    try {
      await axios.delete(`${process.env.REACT_APP_BASEURL}/api/khachhang/${id}`);
      toast.success(` xóa khách hàng " ${ten}" thành công`, {
        position: 'top-right',
        autoClose: 3000
      });
      layDanhSachKhachHang();
      setHienThiModal(false);
    } catch (error) {
      console.log('có lỗi khi xóa khách hàng', error);
      toast.error(`có lỗi khi xóa khách hàng "${ten}"`, {
        position: 'top-right',
        autoClose: 3000
      });
    }
  };

  const hienThiChiTiet = async (id) => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_BASEURL}/api/khachhang/${id}`);
      setChiTietKhachHang(response.data);
      setHienThiModal(true);
    } catch (error) {
      console.log('có lỗi khi lấy chi tiết khách hàng', error);
      toast.error(' có lỗi khi lấy chi tiết khách hàng', {
        position: 'top-right',
        autoClose: 300
      });
    }
  };
  const capNhatTrangThai = async (billId, trangthaimoi) => {
    try {
      // Gửi trạng thái cập nhật lên backend
      await axios.put(
        `${process.env.REACT_APP_BASEURL}/api/HoaDon/UpdateStatus/${billId}`,
        { status: trangthaimoi },
        { headers: { 'Content-Type': 'application/json' } }
      );
  
      toast.success('Đã cập nhật trạng thái đơn hàng thành công!', {
        position: 'top-right',
        autoClose: 3000,
      });
  
      // Cập nhật trạng thái của đơn hàng trong danh sách khách hàng
      setDanhSachKhachHang((prevList) =>
        prevList.map((khachHang) => {
          if (khachHang.hoaDons) {
            khachHang.hoaDons = khachHang.hoaDons.map((hoadon) =>
              hoadon.id === billId ? { ...hoadon, status: trangthaimoi } : hoadon
            );
          }
          return khachHang;
        })
      );
  
      setKhachHangHienThi((prevList) =>
        prevList.map((khachHang) => {
          if (khachHang.hoaDons) {
            khachHang.hoaDons = khachHang.hoaDons.map((hoadon) =>
              hoadon.id === billId ? { ...hoadon, status: trangthaimoi } : hoadon
            );
          }
          return khachHang;
        })
      );
  
      // Đóng modal sau khi cập nhật thành công
      setHienThiModal(false); 
    } catch (error) {
      console.error('Có lỗi khi cập nhật trạng thái đơn hàng:', error);
      toast.error('Có lỗi khi cập nhật trạng thái đơn hàng!', {
        position: 'top-right',
        autoClose: 3000,
      });
    }
  };
  

  const kiemTraTrangThaiHoaDon = (hoadons) => {
    return hoadons?.some(hoadon => hoadon.status === 'Hủy đơn');
  };

  const layTrangThaiDonHang = (hoaDons) => {
    if (!hoaDons || hoaDons.length === 0) {
      return { text: 'Chưa có đơn hàng', bgColor: 'bg-muted', textColor: 'text-dark' };
    }

    // Kiểm tra các trạng thái ưu tiên của đơn hàng
    const hoadonDangGiao = hoaDons.find(h => h.status === 'Đang giao');
    if (hoadonDangGiao) {
      return { text: 'Đang giao', bgColor: 'bg-warning', textColor: 'text-dark' };
    }

    const hoadonGiaoThanhCong = hoaDons.find(h => h.status === 'Đã giao thành công');
    if (hoadonGiaoThanhCong) {
      return { text: 'Thành công', bgColor: 'bg-success', textColor: 'text-white' };
    }

    const hoadonHuy = hoaDons.find(h => h.status === 'Hủy đơn');
    if (hoadonHuy) {
      return { text: 'Hủy đơn', bgColor: 'bg-danger', textColor: 'text-white' };
    }

    const hoadonKhongGiaoThanhCong = hoaDons.find(h => h.status === 'Giao không thành công');
    if (hoadonKhongGiaoThanhCong) {
      return { text: 'Không thành công', bgColor: 'bg-secondary', textColor: 'text-white' };
    }

    const hoadonChoXuLy = hoaDons.find(h => h.status === 'Chờ xử lý');
    if (hoadonChoXuLy) {
      return { text: 'Chờ xử lý', bgColor: 'bg-primary', textColor: 'text-white' };
    }

    return { text: 'Chưa có đơn hàng', bgColor: 'bg-muted', textColor: 'text-dark' };
  };
  return (
    <div id="wrapper">
      <SiderbarAdmin />
      <div id="content-wrapper" className="d-flex flex-column">
        <div id="content">
          <HeaderAdmin />
          <div id="content">
            <div className="content-header">
              <div className="container-fluid">
                <div className="row mb-2">
                  <div className="col-sm-6">
                    <h1 className="h3 mb-0 text-gray-800">Danh Sách Khách Hàng</h1>
                  </div>
                  <div className="col-sm-6">
                    <ol className="breadcrumb float-sm-right">
                      <li className="breadcrumb-item"><Link to="/admin/trangchu">Home</Link></li>
                      <li className="breadcrumb-item active">Danh Sách Khách Hàng</li>
                    </ol>
                  </div>
                  <div className=' col-sm-6'>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Tìm kiếm theo tên khách hàng"
                      value={timKiem}
                      onChange={xuLyTimKiem}
                      style={{ maxWidth: '300px', marginRight: '10px' }}
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className="container-fluid">
              <div className="card shadow mb-4">
                <div className="card-header py-3 d-flex justify-content-between align-items-center">
                  <h3 className="m-0 font-weight-bold text-primary">Danh Sách Khách Hàng</h3>
                  <select
                    className="form-control"
                    value={timKiemTrangThai}
                    onChange={xuLyLocTrangThai}
                    style={{ maxWidth: '200px' }}
                  >
                    <option value="">Lọc theo trạng thái</option>
                    <option value="Đang giao">Đang giao</option>
                    <option value="Đã giao thành công">Đã giao thành công</option>
                    <option value="Hủy đơn">Hủy đơn</option>
                    <option value="Giao không thành công">Giao không thành công</option>
                    <option value="Chờ xử lý">Chờ xử lý</option>
                  </select>
                </div>

                <div className="card-body table-responsive" style={{ maxHeight: '400px' }}>
                  {dangtai ? (
                    <div className='text-center'>
                      <Spinner animation='border' variant='primary' />
                      <p>Đang tải dữ liệu...</p>
                    </div>
                  ) : (
                    <table className="table table-bordered table-hover table-striped">
                      <thead>
                        <tr>
                          <th scope="col">STT</th>
                          <th scope="col">Họ Tên</th>
                          <th scope="col">Email</th>
                          <th scope="col">Số Điện Thoại</th>
                          <th scope='col'>Địa chỉ chi tiết</th>
                          <th scope='col'>Thành phố</th>
                          <th scope='col'>Ghi chú</th>
                          <th scope='col'>Trạng thái</th>
                          <th scope="col">Chức Năng</th>
                        </tr>
                      </thead>
                      <tbody>
                        {danhSachKhachHang.length === 0 ? (
                          <tr>
                            <td colSpan="9" className="text-center">Hiện tại chưa có khách hàng</td>
                          </tr>
                        ) : cacPhanTuHienTai.length > 0 ? (
                          cacPhanTuHienTai.map((item, index) => {
                            const trangThaiDonHang = layTrangThaiDonHang(item.hoaDons); // Lấy trạng thái từ danh sách hoaDons
                            return (
                              <tr key={nanoid()}>
                                <td>{chiSoPhanTuDau + index + 1}</td>
                                <td>{item.ho} {item.ten}</td>
                                <td>{item.emailDiaChi}</td>
                                <td>{item.sdt}</td>
                                <td>{item.diaChiCuThe}</td>
                                <td>{item.thanhPho}</td>
                                <td>{item.ghiChu}</td>
                                <td className={`${trangThaiDonHang.bgColor} ${trangThaiDonHang.textColor}`}>
                                  {trangThaiDonHang.text}
                                </td>
                                <td>
                                  <Button variant="info" onClick={() => hienThiChiTiet(item.id)}>
                                    Xem chi tiết
                                  </Button>{' '}
                                  {kiemTraTrangThaiHoaDon(item.hoaDons) && (
                                    <Button variant="danger" onClick={() => xoaKhachHang(item.id, item.ten)}>
                                      Xóa
                                    </Button>
                                  )}
                                </td>
                              </tr>
                            );
                          })
                        ) : (
                          <tr>
                            <td colSpan="9" className="text-center">Không tìm thấy khách hàng</td>
                          </tr>
                        )}
                      </tbody>

                    </table>
                  )}
                </div>

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
