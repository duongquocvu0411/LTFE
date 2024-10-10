import React, { useState, useEffect } from "react";
import { Button, Modal } from "react-bootstrap";
import axios from "axios";
import { toast } from "react-toastify";

const ModalDanhGia = ({ show, handleClose, sanphamId }) => {
  const [danhGias, setDanhGias] = useState([]);

  useEffect(() => {
    if (sanphamId && show) {
      axios
        .get(`${process.env.REACT_APP_BASEURL}/api/danhgia?sanphams_id=${sanphamId}`)
        .then((response) => {
          setDanhGias(response.data); // Lưu danh sách đánh giá vào state
        })
        .catch((error) => {
          if (error.response && error.response.status === 404) {
            // Xử lý khi không tìm thấy đánh giá
            setDanhGias([]); // Đặt danh sách đánh giá rỗng
            
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
  

  // Hàm xử lý xóa đánh giá
  const xoaDanhGia = (id) => {
    axios
      .delete(`${process.env.REACT_APP_BASEURL}/api/danhgia/${id}`)
      .then(() => {
        toast.success("Đánh giá đã được xóa thành công!", {
          position: "top-right",
          autoClose: 3000,
        });
        // Cập nhật danh sách đánh giá sau khi xóa
        setDanhGias(danhGias.filter((danhGia) => danhGia.id !== id));
      })
      .catch((error) => {
        console.error("Lỗi khi xóa đánh giá:", error);
        toast.error("Không thể xóa đánh giá", {
          position: "top-right",
          autoClose: 3000,
        });
      });
  };

  return (
    <Modal show={show} onHide={handleClose}>
    <Modal.Header closeButton>
      <Modal.Title>Xem Đánh Giá</Modal.Title>
    </Modal.Header>
    <Modal.Body>
      {danhGias.length > 0 ? (
        danhGias.map((danhGia) => (
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
    </Modal.Footer>
  </Modal>
  );
};

export default ModalDanhGia;
