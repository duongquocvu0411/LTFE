import React, { useEffect, useState } from 'react';
import Footer from '../Footer';
import axios from 'axios';
import { Button, Spinner } from 'react-bootstrap';
import { nanoid } from 'nanoid';

import { toast, ToastContainer } from 'react-toastify';
import HeaderAdmin from '../HeaderAdmin';
import SiderbarAdmin from '../SidebarAdmin';
import { Link } from 'react-router-dom';
import ModalTencuahang from './../modla/ModalTencuahang';

const Tencuahang = () => {
  const [danhSachTencuahang, setDanhSachTencuahang] = useState([]); 
  const [hienThiModal, setHienThiModal] = useState(false); 
  const [chinhSua, setChinhSua] = useState(false); 
  const [tencuahangHienTai, setTencuahangHienTai] = useState(null); 
  const [dangtai, setDangtai] = useState(false);

  useEffect(() => {
    layDanhSachTencuahang();
  }, []);

  const layDanhSachTencuahang = async () => {
    setDangtai(true); 
    try {
      const response = await axios.get(`${process.env.REACT_APP_BASEURL}/api/Tencuahang`);
      setDanhSachTencuahang(response.data);
      setDangtai(false);
    } catch (error) {
      console.log('Có lỗi khi lấy danh sách tên cửa hàng', error);
      toast.error('Có lỗi khi lấy danh sách tên cửa hàng, vui lòng thử lại sau', {
        position: 'top-right',
        autoClose: 3000,
      });
    }
  };

  const chinhSuaTencuahang = (tencuahang) => {
    setChinhSua(true);
    setTencuahangHienTai(tencuahang);
    setHienThiModal(true);
  };

  const xoaTencuahang = async (id) => {
    try {
      await axios.delete(`${process.env.REACT_APP_BASEURL}/api/Tencuahang/${id}`);
      toast.success('Xóa tên cửa hàng thành công', {
        position: 'top-right',
        autoClose: 3000,
      });
      layDanhSachTencuahang(); 
    } catch (error) {
      console.log('Có lỗi khi xóa', error);
    }
  };

  const themTencuahang = () => {
    setChinhSua(false);
    setTencuahangHienTai(null);
    setHienThiModal(true);
  };

  // Hàm chọn tên cửa hàng làm cửa hàng đang sử dụng
  const suDungTencuahang = async (id) => {
    try {
      await axios.post(`${process.env.REACT_APP_BASEURL}/api/Tencuahang/setTencuahang/${id}`);
      toast.success('Cửa hàng đã được đánh dấu là đang sử dụng', {
        position: 'top-right',
        autoClose: 3000,
      });
      layDanhSachTencuahang(); // Lấy lại danh sách sau khi sử dụng thành công
    } catch (error) {
      console.log('Có lỗi khi sử dụng tên cửa hàng', error);
      toast.error('Có lỗi khi sử dụng tên cửa hàng', {
        position: 'top-right',
        autoClose: 3000,
      });
    }
  };

  return (
    <div id="wrapper">
      <SiderbarAdmin />

      <div id="content-wrapper" className="d-flex flex-column">
        <div id="content">
          <HeaderAdmin />
          <div className="content-header">
            <div className="container-fluid">
              <div className="row mb-2">
                <div className="col-sm-6">
                  <h1 className="h3 mb-0 text-gray-800">Danh Sách Tên Cửa Hàng</h1>
                </div>
                <div className="col-sm-6">
                  <ol className="breadcrumb float-sm-right">  
                    <li className="breadcrumb-item"><Link to="/admin/trangchu">Home</Link></li>
                    <li className="breadcrumb-item active">Danh Sách Tên Cửa Hàng</li>
                  </ol>
                </div>
              </div>
            </div>

            <div className="container-fluid">
              <div className="card shadow mb-4">
                <div className="card-header py-3">
                  <h3 className="m-0 font-weight-bold text-primary">Danh Sách Tên Cửa Hàng</h3>
                </div>
                <div className="col-sm-6">
                  <Button className="float-sm-right btn btn-primary" onClick={themTencuahang}>
                    Thêm Tên Cửa Hàng
                  </Button>
                </div>
                <div className="card-body table-responsive" style={{ maxHeight: '400px' }}>
                  {dangtai ? (
                    <div className='text-center'>
                      <Spinner animation='border' variant='primary'/>
                        <p>Đang tải dữ liệu...</p>
                    </div>
                  ) : (
                    <table className="table table-hover table-bordered table-striped">
                      <thead>
                        <tr>
                          <th scope="col">STT</th>
                          <th scope="col">Tên Cửa Hàng</th>
                          <th scope="col">Chức Năng</th>
                        </tr>
                      </thead>
                      <tbody>
                        {danhSachTencuahang.map((tencuahang, index) => (
                          <tr key={nanoid()}>
                            <td>{index + 1}</td>
                            <td>{tencuahang.name}</td>
                            <td>
                              <Button
                                variant="primary me-2"
                                onClick={() => chinhSuaTencuahang(tencuahang)}
                                className="btn btn-sm btn-primary"
                              >
                                <i className="fas fa-edit"></i>
                              </Button>
                              <Button
                                variant="danger me-2"
                                onClick={() => xoaTencuahang(tencuahang.id)}
                                className="btn btn-sm btn-danger"
                              >
                                <i className="fas fa-trash"></i>
                              </Button>

                              {/* Kiểm tra trạng thái cửa hàng, nếu chưa sử dụng thì hiện nút "Sử dụng" */}
                              {tencuahang.trangthai !== 'đang sử dụng' && (
                                <Button
                                  variant="success"
                                  onClick={() => suDungTencuahang(tencuahang.id)}
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
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Modal thêm/sửa tên cửa hàng */}
        <ModalTencuahang
          show={hienThiModal}
          handleClose={() => setHienThiModal(false)}
          isEdit={chinhSua}
          detail={tencuahangHienTai}
          fetchDetails={layDanhSachTencuahang}
        />

        <Footer />
      </div>

      <ToastContainer />
    </div>
  );
};

export default Tencuahang;
