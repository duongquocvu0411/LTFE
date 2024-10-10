import React from "react";
import { Modal, Button, Form } from "react-bootstrap";
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
const MoadlChitietsanpham = ({ show, handleClose, chiTiet, setChiTiet, handleSaveChiTiet }) => {
  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Chi tiết sản phẩm</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group className="mb-3">
            <Form.Label>Mô tả chung</Form.Label>
            <Form.Control
              type="text"
              value={chiTiet.mo_ta_chung || ''}
              onChange={(e) =>
                setChiTiet({ ...chiTiet, mo_ta_chung: e.target.value })
              }
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Hình dáng</Form.Label>
            <Form.Control
              type="text"
              value={chiTiet.hinh_dang || ''}
              onChange={(e) =>
                setChiTiet({ ...chiTiet, hinh_dang: e.target.value })
              }
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Công dụng</Form.Label>
            <Form.Control
              type="text"
              value={chiTiet.cong_dung || ''}
              onChange={(e) =>
                setChiTiet({ ...chiTiet, cong_dung: e.target.value })
              }
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Xuất xứ</Form.Label>
            <Form.Control
              type="text"
              value={chiTiet.xuat_xu || ''}
              onChange={(e) =>
                setChiTiet({ ...chiTiet, xuat_xu: e.target.value })
              }
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Khối lượng</Form.Label>
            <Form.Control
              type="text"
              value={chiTiet.khoi_luong || ''}
              onChange={(e) =>
                setChiTiet({ ...chiTiet, khoi_luong: e.target.value })
              }
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Bảo quản</Form.Label>
            <Form.Control
              type="text"
              value={chiTiet.bao_quan || ''}
              onChange={(e) =>
                setChiTiet({ ...chiTiet, bao_quan: e.target.value })
              }
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Thành phần dinh dưỡng</Form.Label>
            <Form.Control
              type="text"
              value={chiTiet.thanh_phan_dinh_duong || ''}
              onChange={(e) =>
                setChiTiet({
                  ...chiTiet,
                  thanh_phan_dinh_duong: e.target.value,
                })
              }
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Ngày thu hoạch</Form.Label>
            <Form.Control
              type="text"
              value={chiTiet.ngay_thu_hoach || ''}
              onChange={(e) =>
                setChiTiet({ ...chiTiet, ngay_thu_hoach: e.target.value })
              }
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Hương vị</Form.Label>
            <Form.Control
              type="text"
              value={chiTiet.huong_vi || ''}
              onChange={(e) =>
                setChiTiet({ ...chiTiet, huong_vi: e.target.value })
              }
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Nồng độ đường</Form.Label>
            <Form.Control
              type="text"
              value={chiTiet.nong_do_duong || ''}
              onChange={(e) =>
                setChiTiet({ ...chiTiet, nong_do_duong: e.target.value })
              }
            />
          </Form.Group>
          <Form.Group className="mb-3">
  <Form.Label>Bài viết</Form.Label>
  <CKEditor
              editor={ClassicEditor}
              data={chiTiet.bai_viet || ""}
              onChange={(event, editor) => {
                const data = editor.getData();
                setChiTiet({ ...chiTiet, bai_viet: data });
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
