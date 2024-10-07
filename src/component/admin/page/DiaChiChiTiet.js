import React, { useEffect, useState } from 'react';
import Sidebar from '../Sidebar';
import Footer from '../Footer';
import axios from 'axios';
import { Button } from 'react-bootstrap';
import { nanoid } from 'nanoid';
import ModalDiaChiChiTiet from '../modla/ModlaDiachichitiet';
import { ToastContainer } from 'react-toastify';
import HeaderAdmin from '../HeaderAdmin';

const DiaChiChiTiet = () => {
  const [danhSachDiaChi, setDanhSachDiaChi] = useState([]); // State lưu trữ danh sách địa chỉ
  const [hienThiModal, setHienThiModal] = useState(false); // State để điều khiển hiển thị Modal
  const [chinhSua, setChinhSua] = useState(false); // State xác định chế độ chỉnh sửa hay thêm mới
  const [diaChiHienTai, setDiaChiHienTai] = useState(null); // State lưu trữ thông tin địa chỉ đang được chỉnh sửa

  // Gọi API lấy danh sách địa chỉ khi component được mount
  useEffect(() => {
    layDanhSachDiaChi();
  }, []);

  // Hàm lấy danh sách địa chỉ từ API
  const layDanhSachDiaChi = () => {
    axios.get(`${process.env.REACT_APP_BASEURL}/api/diachichitiet`)
      .then(response => {
        setDanhSachDiaChi(response.data); // Lưu dữ liệu vào state
      })
      .catch(error => {
        console.log('Lỗi khi lấy danh sách địa chỉ:', error);
      });
  };

  // Hàm mở modal để chỉnh sửa địa chỉ
  const chinhSuaDiaChi = (diaChi) => {
    setChinhSua(true);
    setDiaChiHienTai(diaChi);
    setHienThiModal(true);
  };
  
// Hàm xóa địa chỉ
  // const xoaDiaChi = (id) => {
  //   axios.delete(`${process.env.REACT_APP_BASEURL}/api/diachichitiet/${id}`)
  //   .then(() => {
  //     window.alert('Đã xóa địa chỉ và email thành công');
  //     layDanhSachDiaChi();
  //   })
  //   .catch(error => console.log('Lỗi khi xóa:', error));
  // }

  // // Hàm mở modal để thêm địa chỉ mới
  // const themDiaChi = () => {
  //   setChinhSua(false);
  //   setDiaChiHienTai(null);
  //   setHienThiModal(true);
  // };

  return (
    <div id="wrapper">
      <Sidebar />

      <div id="content-wrapper" className="d-flex flex-column">
        {/* Main Content */}
        <div id="content">
        <HeaderAdmin />
        <div id="content">
          {/* Content Header (Page header) */}
          <div className="content-header">
            <div className="container-fluid">
              <div className="row mb-2">
                <div className="col-sm-6">
                  <h1 className="h3 mb-0 text-gray-800">Danh Sách Địa Chỉ Chi Tiết</h1>
                </div>
              </div>
            </div>
          </div>
          {/* /.content-header */}

          {/* Main content */}
          <div className="container-fluid">
            <div className="card shadow mb-4">
              <div className="card-header py-3">
                <h3 className="m-0 font-weight-bold text-primary">Danh Sách Địa Chỉ</h3>
              </div>
              {/* /.card-header */}
              <div className="card-body table-responsive" style={{ maxHeight: '400px' }}>
                <table className="table table-hover table-bordered table-striped">
                  <thead>
                    <tr>
                      <th scope="col">STT</th>
                      <th scope="col">Địa Chỉ</th>
                      <th scope="col">Email</th>
                      <th scope="col">SĐT</th>
                      <th scope="col">Chức Năng</th>
                    </tr>
                  </thead>
                  <tbody>
                    {danhSachDiaChi.map((diaChi, index) => (
                      <tr key={nanoid()}>
                        <td>{index + 1}</td>
                        <td>{diaChi.diachi}</td>
                        <td>{diaChi.email}</td>
                        <td>{diaChi.sdt}</td>
                        <td>
                          <Button
                            variant="primary me-2"
                            onClick={() => chinhSuaDiaChi(diaChi)}
                            className="btn btn-sm btn-primary"
                          >
                            <i className="fas fa-edit"></i>
                          </Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              {/* /.card-body */}
            </div>
            {/* /.card */}
          </div>
          {/* /.container-fluid */}
        </div>
        </div>
        {/* /.content */}

        {/* Modal thêm/sửa địa chỉ */}
        <ModalDiaChiChiTiet
          show={hienThiModal}
          handleClose={() => setHienThiModal(false)}
          isEdit={chinhSua}
          detail={diaChiHienTai}
          fetchDetails={layDanhSachDiaChi}
        />

        <Footer />
      </div>
      {/* /.content-wrapper */}

      <ToastContainer />
    </div>
  );
};

export default DiaChiChiTiet;
