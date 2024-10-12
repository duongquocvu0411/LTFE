import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Button } from 'react-bootstrap';
import { nanoid } from 'nanoid';


import Footer from '../Footer';
import { toast, ToastContainer } from 'react-toastify';
import ModalChiTietKhachHang from '../modla/ModaChiTietKhachHang';
import HeaderAdmin from '../HeaderAdmin';
import SiderbarAdmin from '../SidebarAdmin';
import { Link } from 'react-router-dom';

const Khachhangs = () => {
  // Khai báo các state cần thiết
  const [danhSachKhachHang, setDanhSachKhachHang] = useState([]);
  const [trangHienTai, setTrangHienTai] = useState(1);
  const soPhanTuMotTrang = 10; // Số phần tử hiển thị trên mỗi trang
  const [hienThiModal, setHienThiModal] = useState(false);
  const [chiTietKhachHang, setChiTietKhachHang] = useState(null);
  const [timKiem, setTimKiem] = useState('');
  const [timKiemTrangThai, setTimKiemTrangThai] = useState('');
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

  // Hàm lọc theo trạng thái đơn hàng
  const xuLyLocTrangThai = (e) => {
    const giaTriLocTrangThai = e.target.value.toLowerCase();
    setTimKiemTrangThai(giaTriLocTrangThai);

    const ketQuaLoc = danhSachKhachHang.filter(khachHang =>
      layTrangThaiDonHang(khachHang.hoadons).toLowerCase().includes(giaTriLocTrangThai)
    );

    setKhachHangHienThi(ketQuaLoc);
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
  
        // Cập nhật trạng thái đơn hàng trong danh sách khách hàng hiện tại
        setKhachHangHienThi(trangThaiTruoc  => {
          // Sử dụng map để duyệt qua danh sách khách hàng hiện tại
          return trangThaiTruoc.map(khachHang => {
            // Kiểm tra nếu khách hàng này có đơn hàng với mã billId
            if (khachHang.hoadons.some(hoadon => hoadon.id === billId)) {
              // Nếu tìm thấy, tạo một bản sao của khách hàng và cập nhật trạng thái hóa đơn trong hoadons
              return {
                ...khachHang,  // Giữ nguyên các thông tin khác của khách hàng
                hoadons: khachHang.hoadons.map(hoadon => 
                  // Kiểm tra nếu id hóa đơn trùng với billId
                  hoadon.id === billId 
                  ? { ...hoadon, status: newStatus }  // Cập nhật trạng thái đơn hàng
                  : hoadon  // Nếu không trùng, giữ nguyên hóa đơn
                )
              };
            }
            // Nếu khách hàng không có hóa đơn với mã billId, trả về khách hàng mà không thay đổi gì
            return khachHang;
          });
        });
        setHienThiModal(false);  // Đóng modal 
      })
      .catch(error => {
        console.log('Có lỗi khi cập nhật trạng thái đơn hàng:', error);
        toast.error('Có lỗi khi cập nhật trạng thái đơn hàng!', {
          position: 'top-right',
          autoClose: 3000
        });
      });
  };
  
// Kiểm tra xem hóa đơn của khách hàng có trạng thái "Đã hủy" hoặc "Giao không thành công" hay không
const kiemTraTrangThaiHoaDon = (hoadons) => {
  return hoadons?.some(hoadon => 
    hoadon.status === 'Hủy đơn' || hoadon.status === 'Giao không thành công' || hoadon.status === 'Giao không thành công'
  );
};

// Hàm kiểm tra trạng thái đơn hàng
const layTrangThaiDonHang = (hoadons) => {
  // Kiểm tra nếu có đơn hàng đang giao
  const hoadonDangGiao = hoadons?.find(h => h.status === 'Đang giao');
  if (hoadonDangGiao) {
    return 'Đã xử lý (đang giao)';
  }
  
  // Kiểm tra nếu có đơn hàng đã giao thành công
  const hoadonGiaoThanhCong = hoadons?.find(h => h.status === 'Đã giao thành công');
  if (hoadonGiaoThanhCong) {
    return 'Đã xử lý (thành công)';
  }
    
  // Kiểm tra nếu có đơn hàng giao không thành công
  const hoadonKhongGiaoThanhCong = hoadons?.find(h => h.status === 'Giao không thành công');
  if (hoadonKhongGiaoThanhCong) {
    return 'Đã xử lý (Không thành công)';
  }
  
  // Kiểm tra đơn hàng chờ xử lý
  const hoadonChoXuLy = hoadons?.find(h => h.status === 'Chờ xử lý');
  return hoadonChoXuLy ? hoadonChoXuLy.status : 'Đã xử lý';
};


  return (
    <div id="wrapper">
      <SiderbarAdmin />

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
                      <li className="breadcrumb-item"><Link to="/admin/trangchu">Home</Link></li>
                      <li className="breadcrumb-item active">Danh Sách Khách Hàng</li>
                    </ol>
                    
                  </div>
                  <div className=' col-sm-6'>
                     {/* Tìm kiếm theo tên khách hàng */}
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

            {/* Main content */}
            <div className="container-fluid">
              <div className="card shadow mb-4">
                <div className="card-header py-3 d-flex justify-content-between align-items-center">
                  <h3 className="m-0 font-weight-bold text-primary">Danh Sách Khách Hàng</h3>
                  
                 
                  {/* Lọc theo trạng thái đơn hàng */}
                  <select
                    className="form-control"
                    value={timKiemTrangThai}
                    onChange={xuLyLocTrangThai}
                    style={{ maxWidth: '200px' }}
                  >
                    <option value="">Lọc theo trạng thái</option>
                    <option value="đang giao">Đang giao</option>
                    <option value="thành công">Thành công</option>
                    <option value="hủy đơn">hủy đơn</option>
                    <option value="Không thành công">Không thành công</option>
                    <option value="chờ xử lý">Chờ xử lý</option>
                  </select>
                </div>

                {/* Bảng danh sách khách hàng */}
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
                        <th scope='col'>Ghi chú</th>
                        <th scope='col'>Trạng thái</th>
                        <th scope="col">Chức Năng</th>
                      </tr>
                    </thead>
                    <tbody>
                      {/* Kiểm tra nếu không có dữ liệu */}
                      {danhSachKhachHang.length === 0 ? (
                        <tr>
                          <td colSpan="9" className="text-center">Hiện tại chưa có khách hàng</td>
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
                            <td>{item.ghichu}</td>
                            <td>{layTrangThaiDonHang(item.hoadons)}</td>
                            <td>
                              <Button variant="info" onClick={() => hienThiChiTiet(item.id)}>
                                Xem chi tiết
                              </Button>{' '}
                              {kiemTraTrangThaiHoaDon(item.hoadons) && (
                                <Button variant="danger" onClick={() => xoaKhachHang(item.id)}>
                                  Xóa
                                </Button>
                              )}
                            </td>
                          </tr>
                        ))
                      ) : (
                        <tr>
                          <td colSpan="9" className="text-center">Không tìm thấy khách hàng</td>
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
