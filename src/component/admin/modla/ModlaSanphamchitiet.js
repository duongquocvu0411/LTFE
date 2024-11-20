import React from "react";
import { Modal, Button, Form } from "react-bootstrap";
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
const MoadlChitietsanpham = ({ show, handleClose, chiTiet, setChiTiet, handleSaveChiTiet }) => {
  return (
    <Modal show={show} onHide={handleClose} size="xl">
      <Modal.Header closeButton>
        <Modal.Title>Chi tiết sản phẩm</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group className="mb-3">
            <Form.Label>Mô tả chung</Form.Label>
            <Form.Control
              type="text"
              value={chiTiet.moTaChung  || ''}
              onChange={(e) =>
                setChiTiet({ ...chiTiet, moTaChung: e.target.value })
              }
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Hình dáng</Form.Label>
            <Form.Control
              type="text"
              value={chiTiet.hinhDang || ''}
              onChange={(e) =>
                setChiTiet({ ...chiTiet, hinhDang: e.target.value })
              }
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Công dụng</Form.Label>
            <Form.Control
              type="text"
              value={chiTiet.congDung || ''}
              onChange={(e) =>
                setChiTiet({ ...chiTiet, congDung: e.target.value })
              }
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Xuất xứ</Form.Label>
            <Form.Control
              type="text"
              value={chiTiet.xuatXu || ''}
              onChange={(e) =>
                setChiTiet({ ...chiTiet, xuatXu: e.target.value })
              }
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Khối lượng</Form.Label>
            <Form.Control
              type="text"
              value={chiTiet.khoiLuong || ''}
              onChange={(e) =>
                setChiTiet({ ...chiTiet, khoiLuong: e.target.value })
              }
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Bảo quản</Form.Label>
            <Form.Control
              type="text"
              value={chiTiet.baoQuan || ''}
              onChange={(e) =>
                setChiTiet({ ...chiTiet, baoQuan: e.target.value })
              }
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Thành phần dinh dưỡng</Form.Label>
            <Form.Control
              type="text"
              value={chiTiet.thanhPhanDinhDuong || ''}
              onChange={(e) =>
                setChiTiet({
                  ...chiTiet,
                  thanhPhanDinhDuong: e.target.value,
                })
              }
            />
          </Form.Group>
          <Form.Group className="mb-3">
  <Form.Label>Ngày thu hoạch</Form.Label>
  <Form.Control
    type="date"
    value={
      chiTiet.ngayThuHoach
        ? new Date(chiTiet.ngayThuHoach).toISOString().split("T")[0]
        : ""
    }
    onChange={(e) =>
      setChiTiet({ ...chiTiet, ngayThuHoach: e.target.value })
    }
  />
</Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Hương vị</Form.Label>
            <Form.Control
              type="text"
              value={chiTiet.huongVi || ''}
              onChange={(e) =>
                setChiTiet({ ...chiTiet, huongVi: e.target.value })
              }
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Nồng độ đường</Form.Label>
            <Form.Control
              type="text"
              value={chiTiet.nongDoDuong || ''}
              onChange={(e) =>
                setChiTiet({ ...chiTiet, nongDoDuong: e.target.value })
              }
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Bài viết</Form.Label>
            <CKEditor
              editor={ClassicEditor}
              data={chiTiet.baiViet || ""}
              config={{
                ckfinder: {
                  uploadUrl: `${process.env.REACT_APP_BASEURL}/api/Sanpham/upload-image`,
                },
                mediaEmbed: {
                  previewsInData: true
                }
              }}
              onChange={(event, editor) => {
                const data = editor.getData();
                setChiTiet({ ...chiTiet, baiViet: data });
              }}
            />
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Đóng
        </Button>
        <Button variant="primary" onClick={handleSaveChiTiet}>
          Lưu
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default MoadlChitietsanpham;
