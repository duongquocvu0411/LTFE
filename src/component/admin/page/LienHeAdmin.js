import React, { useEffect, useState } from 'react';

import Footer from '../Footer';
import axios from 'axios';
import { Button, Modal, Form, Spinner, Row, Container, Col } from 'react-bootstrap';
import { nanoid } from 'nanoid';
import { toast, ToastContainer } from 'react-toastify';
import HeaderAdmin from '../HeaderAdmin';
import SiderbarAdmin from '../SidebarAdmin';
import { Link } from 'react-router-dom';

const LienHeAdmin = () => {
  const [danhSachLienHe, setDanhSachLienHe] = useState([]);
  const [danhSachLienHeLoc, setDanhSachLienHeLoc] = useState([]);
  const [trangHienTai, setTrangHienTai] = useState(1);
  const soPhanTuMotTrang = 4;
  const [hienThiModal, setHienThiModal] = useState(false);
  const [noiDungChiTiet, setNoiDungChiTiet] = useState('');
  const [ngayLoc, setNgayLoc] = useState('');
  const [dangtai, setDangtai] = useState(false);

  // Logic phân trang
  const chiSoPhanTuCuoi = trangHienTai * soPhanTuMotTrang;
  const chiSoPhanTuDau = chiSoPhanTuCuoi - soPhanTuMotTrang;
  const cacPhanTuHienTai = danhSachLienHeLoc.slice(chiSoPhanTuDau, chiSoPhanTuCuoi);
  const tongSoTrang = Math.ceil(danhSachLienHeLoc.length / soPhanTuMotTrang);

  const thayDoiTrang = (soTrang) => setTrangHienTai(soTrang);

  // Lấy danh sách liên hệ từ API
  const layDanhSachLienHe = async () => {
    setDangtai(true);
    try {
      const response = await axios.get(`${process.env.REACT_APP_BASEURL}/api/lienhe`);
      setDanhSachLienHe(response.data);
      setDanhSachLienHeLoc(response.data);
      setDangtai(false);
    }
    catch (error) {
      console.log('có lỗi khi lấy lien hệ', error);
      toast.error('có lỗi khi lấy thông tin liên hê vui lòng thử lại sau', {
        position: 'top-right',
        autoClose: 3000
      })
    }
  };

  useEffect(() => {
    layDanhSachLienHe();
  }, []);

  // Xóa liên hệ
  const xoaLienHe = async (id) => {
    try {
      await axios.delete(`${process.env.REACT_APP_BASEURL}/api/lienhe/${id}`);

      toast.success('đã xóa liên hệ thành công', {
        position: 'top-right',
        autoClose: 3000
      });
      layDanhSachLienHe(); // cập nhật danh sách liên hệ sau khi xóa thành công 

    } catch (error) {
      console.log('có lỗi khi xóa liên hệ', error);

      toast.error('có lỗi khi xóa liên hệ. vui lòng thử lại', {
        position: 'top-right',
        autoClose: 3000
      });
    }
  };

  // Hiển thị modal với nội dung chi tiết
  const hienThiChiTiet = (ghichu) => {
    setNoiDungChiTiet(ghichu);
    setHienThiModal(true);
  };

  // Lọc danh sách liên hệ theo ngày
  const locTheoNgay = (ngay) => {
    setNgayLoc(ngay);
    // kiểm tra có ngày được chọn thì truyền ngay vào hook 
    if (ngay) {
      const danhSachLoc = danhSachLienHe.filter(item => item.created_at.startsWith(ngay));
      setDanhSachLienHeLoc(danhSachLoc);
    } else {
      //ngược lại k có ngày được chọn thì truyền vào hook là danhsachLieHe
      setDanhSachLienHeLoc(danhSachLienHe);
    }
  };

  return (
    <div id="wrapper">
      <SiderbarAdmin />

      {/* Content Wrapper */}
      <div id="content-wrapper" className="d-flex flex-column">
        {/* Main Content */}
        <div id="content">
          <HeaderAdmin />
          {/* Content Header */}
          <div className="content-header">
            <div className="container-fluid">
              <div className="row mb-2">
                <div className="col-sm-6">
                  <h1 className="h3 mb-0 text-gray-800">Danh Sách Liên Hệ</h1>
                </div>
                <div className="col-sm-6">
                  <ol className="breadcrumb float-sm-right">
                    <li className="breadcrumb-item"><Link to="/admin/trangchu">Home</Link></li>
                    <li className="breadcrumb-item active">Danh Sách Liên Hệ</li>
                  </ol>
                </div>
              </div>
            </div>
          </div>

          {/* Main content */}
          <div className="container-fluid">
            <div className="card shadow mb-4">
              <div className="card-header py-3 d-flex justify-content-between align-items-center">
                <h3 className="m-0 font-weight-bold text-primary">Danh Sách Liên Hệ</h3>
                <div className="card-tools">
                  {/* Bộ lọc theo ngày */}
                  <Form.Group controlId="formNgayLoc" className="mb-0">
                    <Form.Control
                      type="date"
                      value={ngayLoc}
                      onChange={(e) => locTheoNgay(e.target.value)}
                    />
                  </Form.Group>
                </div>
              </div>

              {/* Bảng hiển thị liên hệ */}
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
                )}
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

        <Footer />
        <ToastContainer />

        {/* Modal để hiển thị nội dung chi tiết */}
        <Modal show={hienThiModal} onHide={() => setHienThiModal(false)}>
          <Modal.Header closeButton>
            <Modal.Title>Chi Tiết Nội Dung</Modal.Title>
          </Modal.Header>
          <Modal.Body style={{ maxHeight: '400px', overflowY: 'auto' }}>
            <Container>
              <Row>
                <Col>
                  <div
                    className="p-2"
                    style={{
                      wordWrap: 'break-word',
                      whiteSpace: 'pre-wrap', // Giữ khoảng trắng và xuống dòng theo nội dung
                    }}
                  >
                    {noiDungChiTiet}
                  </div>
                </Col>
              </Row>
            </Container>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={() => setHienThiModal(false)}>
              Đóng
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    </div>
  );
};

export default LienHeAdmin;
