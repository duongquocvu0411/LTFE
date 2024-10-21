import React, { useEffect, useState } from 'react';

import Footer from '../Footer';
import HeaderAdmin from '../HeaderAdmin'; // Import HeaderAdmin component

import axios from 'axios';
import { Button, Spinner } from 'react-bootstrap';
import ModalThemDanhMucSanPham from '../modla/ModlaDanhmucsanpham';
import { nanoid } from 'nanoid';
import { toast, ToastContainer } from 'react-toastify';
import SiderbarAdmin from '../SidebarAdmin';
import { Link } from 'react-router-dom';

const Danhmucsanpham = () => {
  const [danhSachDanhMuc, setDanhSachDanhMuc] = useState([]);
  const [dangtai,setDangtai]= useState(false);
  const [trangHienTai, setTrangHienTai] = useState(1);
  const danhMucMoiTrang = 4;

  // Thêm state để lưu trữ giá trị tìm kiếm
  const [timKiem, setTimKiem] = useState('');
  
  // Logic tìm kiếm danh mục theo tên
  const danhMucDaLoc = danhSachDanhMuc.filter((danhMuc) =>
    danhMuc.name.toLowerCase().includes(timKiem.toLowerCase())
  );

  // Logic phân trang
  const viTriDanhMucCuoi = trangHienTai * danhMucMoiTrang;
  const viTriDanhMucDau = viTriDanhMucCuoi - danhMucMoiTrang;
  const danhMucTheoTrang = danhMucDaLoc.slice(viTriDanhMucDau, viTriDanhMucCuoi);
  const tongSoTrang = Math.ceil(danhMucDaLoc.length / danhMucMoiTrang);

  const phanTrang = (soTrang) => setTrangHienTai(soTrang);

  const [hienThiModal, setHienThiModal] = useState(false);
  const [chinhSua, setChinhSua] = useState(false);
  const [danhMucHienTai, setDanhMucHienTai] = useState(null);

  useEffect(() => {
    layDanhSachDanhMuc();
  }, []);
  // Lấy danh sách danh mục từ API
  const layDanhSachDanhMuc = async () => {
    setDangtai(true); // bật trạng thái đang load để lấy dữ liệu 
    try{
      const response = await axios.get(`${process.env.REACT_APP_BASEURL}/api/danhmucsanphams`)

      setDanhSachDanhMuc(response.data);
      setDangtai(false);
    } 
    catch(error){
      console.log('có lỗi khi lấy danh sách danh mục', error);

      toast.error('có lỗi khi lấy danh sách ',{
        position:'top-right',
        autoClose:3000
      });
    }
  };



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
  const xoaDanhMuc = async (id,name) => {
    try{
      await axios.delete(`${process.env.REACT_APP_BASEURL}/api/danhmucsanphams/${id}`);
      toast.success(`xóa danh muc "${name} " thành công`,{
        position:'top-right',
        autoClose:3000
      });
      layDanhSachDanhMuc(); // lấy lại danh mục khi xóa thành công
      setTrangHienTai(1);
    }
    catch(error){
      console.log('có lỗi khi xóa danh mục', error);
      toast.error('có lỗi khi xóa danh mục',{
        position:'top-right',
        autoClose:3000
      });
    }
  };

  return (
    <div id="wrapper">
    <SiderbarAdmin />
  
    <div id="content-wrapper" className="d-flex flex-column">
      {/* Main Content */}
      <div id="content">
        <HeaderAdmin />
  
        {/* Content Header */}
        <div className="content-header">
          <div className="container-fluid">
            <div className="row mb-2">
              <div className="col-sm-6">
                <h1 className="h3 mb-0 text-gray-800">Danh sách danh mục</h1>
              </div>
              <div className="col-sm-6">
                <ol className="breadcrumb float-sm-right">
                  <li className="breadcrumb-item"><Link to="/admin/trangchu">Home</Link></li>
                  <li className="breadcrumb-item active">Danh sách danh mục</li>
                </ol>
              </div>
            </div>
          </div>
        </div>
  
        {/* Content Row */}
        <div className="container-fluid mb-3">
          <div className="row">
            {/* Tìm kiếm danh mục */}
            <div className="col-12 col-md-6 col-lg-4 mb-3">
              <label htmlFor="searchCategory" className="form-label">Tìm kiếm danh mục:</label>
              <input
                id="searchCategory"
                type="text"
                className="form-control"
                placeholder="Nhập tên danh mục..."
                value={timKiem}
                onChange={(e) => setTimKiem(e.target.value)}
              />
            </div>
          </div>
        </div>
  
        {/* Bảng danh mục sản phẩm */}
        <div className="container-fluid">
          <div className="card shadow mb-4">
            <div className="card-header py-3 d-flex flex-row align-items-center justify-content-between">
              <h6 className="m-0 font-weight-bold text-primary">Danh sách danh mục</h6>
              <div className="card-tools">
                <Button variant="primary" onClick={moModalThemDanhMuc}>
                  <i className="fas fa-plus-circle"></i> Thêm danh mục
                </Button>
              </div>
            </div>
  
            <div className="card-body table-responsive p-0" style={{ maxHeight: '400px' }}>
             {dangtai ? (
                <div className='text-center'>
                  <Spinner animation='border' variant='primary'/> {/*hiển thị spinner khi đang lấy dữ liệu */}
                    <p>Đang tải dữ liệu...</p>
                </div>
             ) :(
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
                        onClick={() => xoaDanhMuc(danhMuc.id, danhMuc.name)}
                      >
                        <i className="fas fa-trash"></i>
                      </Button>
                    </td>
                  </tr>
                ))}
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
  
      <Footer />
    </div>
  
    {/* Modal Thêm/Sửa danh mục */}
    <ModalThemDanhMucSanPham
      show={hienThiModal} // Hiển thị hoặc ẩn modal dựa trên trạng thái hienThiModal
      handleClose={() => setHienThiModal(false)} // Hàm đóng modal
      isEdit={chinhSua}  // Truyền trạng thái chỉnh sửa hay không
      danhmuc={danhMucHienTai}  // Truyền danh mục hiện tại cần chỉnh sửa
      fetchdanhmucs={layDanhSachDanhMuc} // Hàm để lấy lại danh sách sản phẩm sau khi chỉnh sửa
    />
  
    <ToastContainer />
  </div>
  
  );
};

export default Danhmucsanpham;
