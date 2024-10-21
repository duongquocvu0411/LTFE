import React, { useState, useEffect } from "react";
import { Button, Modal } from "react-bootstrap";
import axios from "axios";
import { toast } from "react-toastify";

const ModalDanhGia = ({ show, handleClose, sanphamId }) => {
  const [danhGias, setDanhGias] = useState([]);
  const [trangHienTai, setTrangHienTai] = useState(1);
  const danhGiaMoiTrang = 4;
  const viTriDanhGiaCuoi = trangHienTai * danhGiaMoiTrang;
  const viTriDanhGiaDau = viTriDanhGiaCuoi - danhGiaMoiTrang;
  const danhGiaTheoTrang = Array.isArray(danhGias) ? danhGias.slice(viTriDanhGiaDau, viTriDanhGiaCuoi) : []; 
  const tongSoTrang = Math.ceil(danhGias.length / danhGiaMoiTrang);

  useEffect(() => {
    if (sanphamId && show) {
      axios
        .get(`${process.env.REACT_APP_BASEURL}/api/danhgia?sanphams_id=${sanphamId}`)
        .then((response) => {
          setDanhGias(Array.isArray(response.data) ? response.data : []);
          
        })
        .catch((error) => {
          if (error.response && error.response.status === 404) {
            setDanhGias([]); // Nếu không tìm thấy đánh giá, đặt mảng rỗng
          } else {
            console.error("Lỗi khi lấy đánh giá:", error);
            toast.error("Không thể lấy danh sách đánh giá", {
              position: "top-right",
              autoClose: 3000,
            });
          }
        });
    }
  }, [sanphamId, show]);

  const phanTrang = (soTrang) => setTrangHienTai(soTrang);
  
  const xoaDanhGia = async (id) => {
    try{
      await axios.delete(`${process.env.REACT_APP_BASEURL}/api/danhgia/${id}`);
  
      toast.success('xóa đánh giá thành công',{
        position:'top-right',
        autoClose:3000
      })
      setDanhGias(danhGias.filter((danhGia) => danhGia.id !== id));
      //filter tạo ra một mảng mới chứa tất cả các phần tử của mảng danhGias mà id của chúng khác với id 
      // của đánh giá vừa bị xóa. Phần tử có id khớp với id đã xóa sẽ bị loại bỏ khỏi mảng mới này.
      
  }
  catch(error){
    console.log('có lỗi khi xóa đánh giá', error);
  
    toast.error('có lỗi khi xóa đánh giá',{
      position:'top-right',
      autoClose:3000
    });
  }
  };

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Xem Đánh Giá</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {danhGiaTheoTrang.length > 0 ? (
          danhGiaTheoTrang.map((danhGia) => (
            <div key={danhGia.id} className="mb-3">
              <h5>{danhGia.ho_ten}</h5>
              <p>{danhGia.noi_dung}</p>
              <p>Số sao: {danhGia.so_sao}</p>
              <Button variant="danger" onClick={() => xoaDanhGia(danhGia.id)}>
                Xóa Đánh Giá
              </Button>
            </div>
          ))
        ) : (
          <p>Không có đánh giá cho sản phẩm này.</p>
        )}
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Đóng
        </Button>
        <div className="pagination-container">
          <ul className="pagination pagination-sm m-0">
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
      </Modal.Footer>
    </Modal>
  );
};

export default ModalDanhGia;
