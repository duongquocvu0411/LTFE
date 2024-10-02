import React, { useEffect, useState } from 'react';
import Sidebar from '../Sidebar';
import Footer from '../Footer';
import Header from '../Header';
import axios from 'axios';
import { Button } from 'react-bootstrap';
import { nanoid } from 'nanoid';
import ModalDiaChiChiTiet from '../modla/ModlaDiachichitiet';

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
    axios.get('http://127.0.0.1:8000/api/diachichitiet')
      .then(response => {
        setDanhSachDiaChi(response.data); // Lưu dữ liệu vào state
      })
      .catch(error => {
        console.log('Lỗi khi lấy danh sách địa chỉ:', error);
      });
  };

  // Hàm xóa địa chỉ
  // const xoaDiaChi = (id) => {
  //   axios.delete(`http://127.0.0.1:8000/api/diachichitiet/${id}`)
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

  // Hàm mở modal để chỉnh sửa địa chỉ
  const chinhSuaDiaChi = (diaChi) => {
    setChinhSua(true);
    setDiaChiHienTai(diaChi);
    setHienThiModal(true);
  };

  return (
    <div>
      <Header />
      <div className="d-flex">
        <Sidebar />
        <div className="flex-grow-1">
          <div className="container">
            <h1 className="mb-4">Danh Sách Địa Chỉ Chi Tiết</h1>
            {/* <div className="text-end mb-3">
              <Button variant="primary" onClick={themDiaChi}>
                <i className="bi bi-file-plus-fill"> Thêm Địa Chỉ</i>
              </Button>
            </div> */}

            {/* Bảng hiển thị danh sách địa chỉ */}
            <div className="table-responsive" style={{ maxHeight: '400px', overflowY: 'auto' }}>
              <table className="table table-bordered border-dark table-hover">
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
                  {danhSachDiaChi.map((diaChi) => (
                    <tr key={nanoid()}>
                      <td>
                        <p className='mb-0 mt-4'>{diaChi.id}</p>
                      </td>
                      <td>
                        <p className="mb-0 mt-4">{diaChi.diachi}</p>
                      </td>
                      <td>
                        <p className="mb-0 mt-4">{diaChi.email}</p>
                      </td>
                      <td>
                        <p className="mb-0 mt-4">{diaChi.sdt}</p>
                      </td>
                      <td>
                        <Button
                          variant="primary me-2"
                          onClick={() => chinhSuaDiaChi(diaChi)}
                        >
                          <i className="bi bi-pencil-square"></i>
                        </Button>{' '}
                        {/* <Button
                          variant="primary me-2"
                          onClick={() => xoaDiaChi(diaChi.id)}
                        >
                           <i class="bi bi-trash3-fill"></i>
                        </Button>{' '} */}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>

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
  );
};

export default DiaChiChiTiet;
