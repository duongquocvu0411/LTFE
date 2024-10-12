import React, { useState, useEffect } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import axios from "axios";
import { toast } from "react-toastify";
import MoadlChitietsanpham from "./ModlaSanphamchitiet";

const ModlaSanpham = ({
  show,
  handleClose,
  isEdit,
  product,
  fetchSanpham,
}) => {
  const [tieude, setTieude] = useState("");
  const [giatien, setGiatien] = useState("");
  const [dvt, setDvt] = useState("");
  const [hinhanh, setHinhanh] = useState(null);
  const [danhmucsanphamID, setDanhmucsanphamID] = useState(""); 
  const [danhmuc, setDanhmuc] = useState([]);
  const [trangthai, setTrangthai] = useState("");
  

  // State quản lý modal chi tiết sản phẩm
  const [showChiTietModal, setShowChiTietModal] = useState(false);
  const [chiTiet, setChiTiet] = useState({
    mo_ta_chung: "",
    hinh_dang: "",
    cong_dung: "",
    xuat_xu: "",
    khoi_luong: "",
    bao_quan: "",
    thanh_phan_dinh_duong: "",
    ngay_thu_hoach: "",
    huong_vi: "",
    nong_do_duong: "",
    bai_viet: "",
  });

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_BASEURL}/api/danhsachsanpham`)
      .then((response) => {
        setDanhmuc(response.data);
      })
      .catch((error) => {
        console.log("Có lỗi khi lấy dữ liệu từ API ", error);
      });

    if (isEdit && product) {

      // nếu là edit thì sẽ lấy dữ liệu của id sản phẩm cần edit
      setTieude(product.tieude);
      setTrangthai(product.trangthai);
      setGiatien(product.giatien);
      setDvt(product.don_vi_tinh);
      setHinhanh(product.hinhanh);
      setDanhmucsanphamID(product.danhsachsanpham_id);

      // Đặt các trường chi tiết sản phẩm nếu có
    if (product.chitiet) {
      setChiTiet({
        mo_ta_chung: product.chitiet.mo_ta_chung || '',
        hinh_dang: product.chitiet.hinh_dang || '',
        cong_dung: product.chitiet.cong_dung || '',
        xuat_xu: product.chitiet.xuat_xu || '',
        khoi_luong: product.chitiet.khoi_luong || '',
        bao_quan: product.chitiet.bao_quan || '',
        thanh_phan_dinh_duong: product.chitiet.thanh_phan_dinh_duong || '',
        ngay_thu_hoach: product.chitiet.ngay_thu_hoach || '',
        huong_vi: product.chitiet.huong_vi || '',
        nong_do_duong: product.chitiet.nong_do_duong || '',
        bai_viet: product.chitiet.bai_viet || '',
      });
    } else {
      // Nếu không có `chitiet`, reset chiTiet về trạng thái ban đầu
      resetChiTiet();
    }
  } else {
    resetForm();
    resetChiTiet();
  }
  if (isEdit && product) {
    console.log('Chi tiết sản phẩm:', product.chitiet); // Kiểm tra xem chi tiết có được nạp đúng không
  }
  }, [isEdit, product]);

  // Hàm reset form chi tiết sản phẩm
  const resetChiTiet = () => {
    setChiTiet({
      mo_ta_chung: "",
      hinh_dang: "",
      cong_dung: "",
      xuat_xu: "",
      khoi_luong: "",
      bao_quan: "",
      thanh_phan_dinh_duong: "",
      ngay_thu_hoach: "",
      huong_vi: "",
      nong_do_duong: "",
    });
  };

  // Hàm lưu chi tiết sản phẩm khi người dùng nhấn nút Lưu trong modal phụ
  const handleSaveChiTiet = () => {
    setShowChiTietModal(false); // Đóng modal sau khi lưu
    // Chi tiết sản phẩm đã được lưu vào state `chiTiet`, sẵn sàng để submit
  };

  const handleSubmit = async () => {
    const formData = new FormData();
    formData.append("tieude", tieude);
    formData.append("trangthai", trangthai);
    formData.append("giatien", giatien);
    formData.append("don_vi_tinh", dvt); 
    formData.append("danhsachsanpham_id", danhmucsanphamID);

    // Thêm chi tiết sản phẩm vào formData,bao gồm cả chitiet sản phẩm
    for (const key in chiTiet) {
      formData.append(key, chiTiet[key]);
    }

    if (hinhanh instanceof File) {
      formData.append("hinhanh", hinhanh);
    }

    if (isEdit) {
      axios
        .post(
          `${process.env.REACT_APP_BASEURL}/api/products/${product.id}?_method=PUT`,
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        )
        .then(() => {
          toast.success("Sản phẩm đã được cập nhật thành công!", {
            position: "top-right",
            autoClose: 3000,
          });
          fetchSanpham(); 
          handleClose(); 
          resetForm();
          resetChiTiet(); // Reset form chi tiết
        })
        .catch((error) => {
          console.log("Error updating product:", error);
          toast.error("Có lỗi xảy ra khi cập nhật sản phẩm. Vui lòng thử lại.", {
            position: "top-right",
            autoClose: 3000,
          });
        });
    } else {
      axios
        .post(`${process.env.REACT_APP_BASEURL}/api/products`, formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        })
        .then(() => {
          toast.success("Sản phẩm đã được thêm thành công!", {
            position: "top-right",
            autoClose: 3000,
          });
          fetchSanpham(); 
          handleClose(); 
          resetForm();
          resetChiTiet(); // Reset form chi tiết
        })
        .catch((error) => {
          console.log("Error adding product:", error);
          toast.error("Có lỗi xảy ra khi thêm sản phẩm. Vui lòng thử lại.", {
            position: "top-right",
            autoClose: 3000,
          });
        });
    }
  };

  const resetForm = () => {
    setTieude("");
    setTrangthai("");
    setGiatien("");
    setDvt("");
    setHinhanh(null);
    setDanhmucsanphamID("");
  };

  return (
    <>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>{isEdit ? "Sửa sản phẩm" : "Thêm sản phẩm"}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>Tiêu đề</Form.Label>
              <Form.Control
                type="text"
                value={tieude}
                onChange={(e) => setTieude(e.target.value)} 
              />
            </Form.Group>
           
           
            <Form.Group className="mb-3">
              <Form.Label>Trạng thái</Form.Label>
              <Form.Control
                as="select"
                value={trangthai}
                onChange={(e) => setTrangthai(e.target.value)}
              >
                <option value="">Chọn trạng thái</option>
                <option value="Còn hàng">Còn hàng</option>
                <option value="Hết hàng">Hết hàng</option>
              </Form.Control>
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Giá</Form.Label>
              <Form.Control
                type="number"
                value={giatien}
                onChange={(e) => setGiatien(e.target.value)}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Đơn vị tính</Form.Label>
              <Form.Control
                as="select"
                value={dvt}
                onChange={(e) => setDvt(e.target.value)}
              >
                <option value="">Chọn Đơn vị tính</option>
                <option value="Kg">kg</option>
                <option value="Phần">phần</option>
              </Form.Control>
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Danh mục sản phẩm</Form.Label>
              <Form.Control
                as="select"
                value={danhmucsanphamID}
                onChange={(e) => setDanhmucsanphamID(e.target.value)}
              >
                <option value="">Chọn danh mục sản phẩm</option>
                {danhmuc.map((category) => (
                  <option key={category.id} value={category.id}>
                    {category.name}
                  </option>
                ))}
              </Form.Control>
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Hình ảnh</Form.Label>
              <Form.Control
                type="file"
                onChange={(e) => setHinhanh(e.target.files[0])}
              />
            </Form.Group>

            {/* Nút mở modal chi tiết sản phẩm */}
            <Button
              variant="info"
              className="mt-3"
              onClick={() => setShowChiTietModal(true)}
            >
              Thêm/Sửa Chi tiết sản phẩm
            </Button>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Hủy
          </Button>
          <Button variant="primary" onClick={handleSubmit}>
            {isEdit ? "Cập nhật" : "Thêm"}
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Modal chi tiết sản phẩm */}
      <MoadlChitietsanpham
        show={showChiTietModal}
        handleClose={() => setShowChiTietModal(false)}
        chiTiet={chiTiet}
        setChiTiet={setChiTiet}
        handleSaveChiTiet={handleSaveChiTiet} // Thêm hàm lưu chi tiết
      />
    </>
  );
};

export default ModlaSanpham;
