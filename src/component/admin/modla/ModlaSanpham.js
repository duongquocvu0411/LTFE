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
  const [hinhanh, setHinhanh] = useState(""); // Khởi tạo state cho hình ảnh
  const [previewImage, setPreviewImage] = useState(""); // State cho xem trước hình ảnh
  const [danhmucsanphamID, setDanhmucsanphamID] = useState("");
  const [danhmuc, setDanhmuc] = useState([]);
  const [trangthai, setTrangthai] = useState("");

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
      setTieude(product.tieude);
      setTrangthai(product.trangthai);
      setGiatien(product.giatien);
      setDvt(product.don_vi_tinh);
      setHinhanh(product.hinhanh); // Gán hình ảnh hiện tại khi edit
      setPreviewImage(`${process.env.REACT_APP_BASEURL}/storage/${product.hinhanh}`); // Hiển thị xem trước hình ảnh hiện tại
      setDanhmucsanphamID(product.danhsachsanpham_id);

      if (product.chitiet) {
        setChiTiet({
          mo_ta_chung: product.chitiet.mo_ta_chung || "",
          hinh_dang: product.chitiet.hinh_dang || "",
          cong_dung: product.chitiet.cong_dung || "",
          xuat_xu: product.chitiet.xuat_xu || "",
          khoi_luong: product.chitiet.khoi_luong || "",
          bao_quan: product.chitiet.bao_quan || "",
          thanh_phan_dinh_duong: product.chitiet.thanh_phan_dinh_duong || "",
          ngay_thu_hoach: product.chitiet.ngay_thu_hoach || "",
          huong_vi: product.chitiet.huong_vi || "",
          nong_do_duong: product.chitiet.nong_do_duong || "",
          bai_viet: product.chitiet.bai_viet || "",
        });
      } else {
        resetChiTiet();
      }
    } else {
      resetForm();
      resetChiTiet();
    }
  }, [isEdit, product]);

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

  const handleSaveChiTiet = () => {
    setShowChiTietModal(false);
  };

  const handleSubmit = async () => {
    if (!tieude || !giatien || !danhmucsanphamID) {
      toast.error("Vui lòng điền đầy đủ thông tin!", {
        position: "top-right",
        autoClose: 3000,
      });
      return;
    }

    const formData = new FormData();
    formData.append("tieude", tieude);
    formData.append("trangthai", trangthai);
    formData.append("giatien", giatien);
    formData.append("don_vi_tinh", dvt);
    formData.append("danhsachsanpham_id", danhmucsanphamID);

    // Thêm chi tiết sản phẩm vào formData
    for (const key in chiTiet) {
      formData.append(key, chiTiet[key]);
    }

    if (hinhanh) {
      formData.append("hinhanh", hinhanh); // Đưa hình ảnh vào formData
    }

    try {
      const url = isEdit
        ? `${process.env.REACT_APP_BASEURL}/api/products/${product.id}?_method=PUT`
        : `${process.env.REACT_APP_BASEURL}/api/products`;
      await axios.post(url, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      toast.success(
        isEdit ? "Sản phẩm đã được cập nhật thành công!" : "Sản phẩm đã được thêm thành công!",
        { position: "top-right", autoClose: 3000 }
      );
      fetchSanpham();
      handleClose();
      resetForm();
      resetChiTiet();
    } catch (error) {
      console.error("Error updating/adding product:", error);
      toast.error(
        "Có lỗi xảy ra khi " + (isEdit ? "cập nhật" : "thêm") + " sản phẩm. Vui lòng thử lại.",
        { position: "top-right", autoClose: 3000 }
      );
    }
  };

  const resetForm = () => {
    setTieude("");
    setTrangthai("");
    setGiatien("");
    setDvt("");
    setHinhanh(""); // Reset hình ảnh
    setPreviewImage(""); // Reset hình ảnh xem trước
    setDanhmucsanphamID("");
  };

  // Hàm xử lý khi người dùng chọn ảnh mới
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setHinhanh(file);
    setPreviewImage(URL.createObjectURL(file)); // Tạo URL xem trước cho hình ảnh được chọn
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
                onChange={handleImageChange} // Gọi hàm khi người dùng chọn hình ảnh mới
              />
              {previewImage && (
                <div className="mt-3">
                  <p>{isEdit ? "Hình ảnh mới chọn:" : "Xem trước hình ảnh:"}</p>
                  <img
                    src={previewImage}
                    alt="Xem trước hình ảnh"
                    style={{ width: "200px", height: "auto" }}
                  />
                </div>
              )}
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
        handleSaveChiTiet={handleSaveChiTiet}
      />
    </>
  );
};

export default ModlaSanpham;
