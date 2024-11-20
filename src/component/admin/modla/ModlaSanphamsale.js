import React, { useState, useEffect } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import { toast } from "react-toastify";

const ModlaSanphamsale = ({ show, handleClose, saleData, setSaleData }) => {
  const [giasale, setGiasale] = useState("");
  const [thoigianbatdau, setThoigianbatdau] = useState("");
  const [thoigianketthuc, setThoigianketthuc] = useState("");
  const [trangthai, setTrangthai] = useState("");

  useEffect(() => {
    if (saleData) {
      setGiasale(saleData.giasale || "");
      setThoigianbatdau(saleData.thoigianbatdau || "");
      setThoigianketthuc(saleData.thoigianketthuc || "");
      setTrangthai(saleData.trangthai || "Không áp dụng");
    } else {
      resetForm();
    }
  }, [saleData]);

  const resetForm = () => {
    setGiasale("");
    setThoigianbatdau("");
    setThoigianketthuc("");
    setTrangthai("Không áp dụng");
  };

  const handleSubmit = () => {
    // Kiểm tra dữ liệu trước khi submit
    if (!giasale || !thoigianbatdau || !thoigianketthuc || !trangthai) {
      toast.error("Vui lòng nhập đầy đủ thông tin trước khi lưu!", {
        position: "top-right",
        autoClose: 3000,
      });
      return;
    }

    // Gửi dữ liệu nếu hợp lệ
    setSaleData({
      giasale: giasale || null,
      thoigianbatdau: thoigianbatdau || null,
      thoigianketthuc: thoigianketthuc || null,
      trangthai: trangthai || "Không áp dụng",
    });
    handleClose();
  };

  return (
    <Modal show={show} onHide={handleClose} size="lg">
      <Modal.Header closeButton>
        <Modal.Title>Quản lý chương trình khuyến mãi</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group className="mb-3">
            <Form.Label>Giá Sale</Form.Label>
            <Form.Control
              type="number"
              value={giasale}
              onChange={(e) => setGiasale(e.target.value)}
              placeholder="Nhập giá sale"
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Thời gian bắt đầu</Form.Label>
            <Form.Control
              type="datetime-local"
              value={thoigianbatdau}
              onChange={(e) => setThoigianbatdau(e.target.value)}
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Thời gian kết thúc</Form.Label>
            <Form.Control
              type="datetime-local"
              value={thoigianketthuc}
              onChange={(e) => setThoigianketthuc(e.target.value)}
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Trạng thái</Form.Label>
            <Form.Control
              as="select"
              value={trangthai}
              onChange={(e) => setTrangthai(e.target.value)}
            >
                 <option value="" disabled>Chọn trạng thái</option>
              <option value="Đang áp dụng">Đang áp dụng</option>
              <option value="Không áp dụng">Không áp dụng</option>
            </Form.Control>
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Hủy
        </Button>
        <Button variant="primary" onClick={handleSubmit}>
          Lưu
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ModlaSanphamsale;
