import React, { useEffect, useState } from 'react';
import Footer from '../Footer';
import axios from 'axios';
import { Button } from 'react-bootstrap';
import { nanoid } from 'nanoid';
import ModalDiaChiChiTiet from '../modla/ModlaDiachichitiet';
import { toast, ToastContainer } from 'react-toastify';
import HeaderAdmin from '../HeaderAdmin';
import SiderbarAdmin from '../SidebarAdmin';
import { Link } from 'react-router-dom';

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
  const layDanhSachDiaChi = async () => {
    try{
        const response = await axios.get(`${process.env.REACT_APP_BASEURL}/api/diachichitiet`)
        setDanhSachDiaChi(response.data);
    }
    catch(error){
      console.log('có lỗi khi lấy danh sách địa chỉ', error);
    }

  
  };

  // Hàm mở modal để chỉnh sửa địa chỉ
  const chinhSuaDiaChi = (diaChi) => {
    setChinhSua(true);
    setDiaChiHienTai(diaChi);
    setHienThiModal(true);
  };

  // Hàm xóa địa chỉ
  const xoaDiaChi = async (id) => {
    try{
        await axios.delete(`${process.env.REACT_APP_BASEURL}/api/diachichitiet/${id}`)
        toast.success('xóa địa chỉ thành công',{
          position:'top-right',
          autoClose:3000
        });
        layDanhSachDiaChi(); // lấy lại danh sách khi xóa thành công
    }
    catch(error){
      console.log('có lỗi khi xóa ', error)
    }

  };

  // Hàm mở modal để thêm địa chỉ mới
  const themDiaChi = () => {
    setChinhSua(false);
    setDiaChiHienTai(null);
    setHienThiModal(true);
  };

  // Hàm chọn địa chỉ làm địa chỉ đang sử dụng
  const suDungDiaChi = async (id) => {
    try{
      await axios.post(`${process.env.REACT_APP_BASEURL}/api/diachichitiet/setDiaChiHien/${id}`)

      toast.success('sử dụng dịa chỉ mới thành công',{
        position:'top-right',
        autoClose:3000
      });
      layDanhSachDiaChi(); // lấy lại danh sách khi sử dụng thành công
    }
    catch(error){
        console.log('có lỗi khi sử dụng địa chỉ', error);
        toast.error('có lỗi khi sử dụng dịa chỉ ',{
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
                  <h1 className="h3 mb-0 text-gray-800">Danh Sách Địa Chỉ</h1>
                </div>
                <div className="col-sm-6">
                  <ol className="breadcrumb float-sm-right">  
                    <li className="breadcrumb-item"><Link to="/admin/trangchu">Home</Link></li>
                    <li className="breadcrumb-item active">Danh Sách Địa Chỉ</li>
                  </ol>
                </div>
              </div>
            </div>

            {/* Main content */}
            <div className="container-fluid">
              <div className="card shadow mb-4">
                <div className="card-header py-3">
                  <h3 className="m-0 font-weight-bold text-primary">Danh Sách Địa Chỉ</h3>
                </div>
                <div className="col-sm-6">
                  <Button className="float-sm-right btn btn-primary" onClick={themDiaChi}>
                    Thêm Địa Chỉ
                  </Button>
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
                        <th scope="col">Trạng thái</th>
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
                          <td>{diaChi.status === 'đang sử dụng' ? 'Đang sử dụng' : 'Không sử dụng'}</td>
                          <td>
                            <Button
                              variant="primary me-2"
                              onClick={() => chinhSuaDiaChi(diaChi)}
                              className="btn btn-sm btn-primary"
                            >
                              <i className="fas fa-edit"></i>
                            </Button>
                            <Button
                              variant="danger me-2"
                              onClick={() => xoaDiaChi(diaChi.id)}
                              className="btn btn-sm btn-danger"
                            >
                              <i className="fas fa-trash"></i>
                            </Button>

                            {/* kiểm tra xem status của dia chỉ khác đang sử dụng không nếu khác thì hiện nút ngược lại đang sử dụng thì ẩn nút đi */}
                            {diaChi.status !== 'đang sử dụng' && (
                              <Button
                                variant="success"
                                onClick={() => suDungDiaChi(diaChi.id)}
                                className="btn btn-sm btn-success"
                              >
                                <i className="fas fa-check"></i> Sử dụng
                              </Button>
                            )}
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
