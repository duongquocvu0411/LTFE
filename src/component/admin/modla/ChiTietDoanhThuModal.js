import React from "react";
import { Modal, Button } from "react-bootstrap";

const ChiTietDoanhThuModal = ({ show, onHide, thangDuocChon, chiTietDoanhThu }) => {
  return (
    <Modal show={show} onHide={onHide}>
      <Modal.Header closeButton>
        <Modal.Title>Chi tiết doanh thu tháng {thangDuocChon?.month}/{thangDuocChon?.year}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {chiTietDoanhThu ? (
          <p>Tổng doanh thu: {chiTietDoanhThu.doanhThu} VND</p>
        ) : (
          <p>Đang tải...</p>
        )}
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onHide}>
          Đóng 
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ChiTietDoanhThuModal;
