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
  const [hinhanh, setHinhanh] = useState(null); // Hình ảnh chính
  const [xemtruochinhanh, setXemtruocHinhAnh] = useState(""); // Xem trước ảnh chính
  const [danhmucsanphamID, setDanhmucsanphamID] = useState("");
  const [danhmuc, setDanhmuc] = useState([]);
  const [trangthai, setTrangthai] = useState("");

  // Quản lý ảnh phụ
  const [Fileanhphu, setFileanhphu] = useState([{}]);
  const [hinhanhPhu, setHinhanhPhu] = useState([]); // Hình ảnh phụ mới chọn
  const [existingHinhanhPhu, setExistingHinhanhPhu] = useState([]); // Ảnh phụ hiện có từ API

  // Modal chi tiết sản phẩm
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
      .get(`${process.env.REACT_APP_BASEURL}/api/danhmucsanphams`)
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
      setHinhanh(null); // Đặt lại hình ảnh chính khi bắt đầu
      setDanhmucsanphamID(product.danhmucsanpham_id);

      // Hiển thị ảnh chính
      if (product.hinhanh) {
        setXemtruocHinhAnh(`${process.env.REACT_APP_BASEURL}/storage/${product.hinhanh}`);
      }

      // Hiển thị ảnh phụ từ API
      if (product.images) {
        setExistingHinhanhPhu(product.images);
        setFileanhphu(product.images.map(() => ({}))); // Tạo input tương ứng với số ảnh phụ
      }

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
      // Khi thêm mới sản phẩm
      resetForm();
      resetChiTiet();
      setHinhanhPhu([]); // Reset ảnh phụ
      setExistingHinhanhPhu([]); // Reset danh sách ảnh phụ hiện có
      setFileanhphu([{}]); // Reset input fields
    }
  }, [isEdit, product]);



  const handleSaveChiTiet = () => {
    setShowChiTietModal(false);
  };

  const handleThaydoihinhanh = (e) => {
    const file = e.target.files[0];
    setHinhanh(file);
    if (file) {
      setXemtruocHinhAnh(URL.createObjectURL(file));
    }
  };

  // Xử lý thay đổi ảnh phụ
  const handleDoianhphu = (index, e) => {
    const file = e.target.files[0];
    const updatedHinhanhs = [...hinhanhPhu];
    updatedHinhanhs[index] = file;

    setHinhanhPhu(updatedHinhanhs);
  };

  // Thêm một input mới cho ảnh phụ
  const handleThemanhphu = () => {
    setFileanhphu((Fileanh) => [...Fileanh, {}]);
  };

  const handleXoaanhphu = (index) => {
    const capnhatFile = Fileanhphu.filter((_, i) => i !== index);
    setFileanhphu(capnhatFile);

    const updatedHinhanhs = hinhanhPhu.filter((_, i) => i !== index);
    setHinhanhPhu(updatedHinhanhs);
  };

  const handleSubmit = async () => {
    const formData = new FormData();
    formData.append("tieude", tieude);
    formData.append("trangthai", trangthai);
    formData.append("giatien", giatien);
    formData.append("don_vi_tinh", dvt);
    formData.append("danhmucsanpham_id", danhmucsanphamID);

    // Thêm ảnh phụ
    hinhanhPhu.forEach((file, index) => {
      formData.append(`images[${index}]`, file);
    });

    if (hinhanh instanceof File) {
      formData.append("hinhanh", hinhanh);
    }

    for (const key in chiTiet) {
      formData.append(key, chiTiet[key]);
    }

    if (isEdit) {
      axios
        .post(
          `${process.env.REACT_APP_BASEURL}/api/sanphams/${product.id}?_method=PUT`,
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
          resetChiTiet();
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
        .post(`${process.env.REACT_APP_BASEURL}/api/sanphams`, formData, {
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
          resetChiTiet();
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
    setXemtruocHinhAnh("");
    setDanhmucsanphamID("");
    setHinhanhPhu([]); // Reset ảnh phụ
    setFileanhphu([{}]); // Reset input fields
  };
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
      bai_viet: "",
    });
  };

  // Hàm xử lý xóa ảnh phụ khi người dùng nhấn nút xóa
  const handleRemoveImage = async (imageId, index) => {
    try {
      await axios.delete(`${process.env.REACT_APP_BASEURL}/api/sanphams/images/${imageId}`);

      toast.success("Đã xóa ảnh phụ thành công!", {
        position: "top-right",
        autoClose: 3000,
      });

      const updatedExistingImages = existingHinhanhPhu.filter((img) => img.id !== imageId);
      setExistingHinhanhPhu(updatedExistingImages);

      const capnhatFile = Fileanhphu.filter((_, i) => i !== index);
      setFileanhphu(capnhatFile);
    } catch (error) {
      console.error("Có lỗi khi xóa ảnh phụ:", error);
      toast.error("Không thể xóa ảnh phụ. Vui lòng thử lại!", {
        position: "top-right",
        autoClose: 3000,
      });
    }
  };

  return (
    <>
      <Modal show={show} onHide={handleClose} size="lg">
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
                onChange={handleThaydoihinhanh}
              />
              {xemtruochinhanh && (
                <div className="mt-3">
                  <p>{isEdit ? "Hình ảnh mới chọn:" : "Xem trước hình ảnh:"}</p>
                  <img
                    src={xemtruochinhanh}
                    alt="Xem trước hình ảnh"
                    style={{ width: "340px", height: "200px" }}
                  />
                </div>
              )}
            </Form.Group>

            {/* Hiển thị ảnh phụ hiện có (từ API) */}
            {existingHinhanhPhu.map((img, index) => (
              <Form.Group key={img.id} className="mb-3">
                <Form.Label>Hình ảnh phụ {index + 1}</Form.Label>
                <img src={`${process.env.REACT_APP_BASEURL}/storage/${img.hinhanh}`} alt={`Ảnh phụ ${index + 1}`} width="200" />
                <Button variant="danger" className="mt-2" onClick={() => handleRemoveImage(img.id, index)}>
                  Xóa ảnh phụ
                </Button>
              </Form.Group>
            ))}

            {/* Hiển thị input cho ảnh phụ mới */}
            {Fileanhphu.map((input, index) => (
              <Form.Group key={index} className="mb-3">
                <Form.Label>Hình ảnh phụ {index + 1}</Form.Label>
                <Form.Control type="file" onChange={(e) => handleDoianhphu(index, e)} />
                {hinhanhPhu[index] && (
                  <div>
                    <img src={URL.createObjectURL(hinhanhPhu[index])} alt={`Ảnh phụ ${index + 1}`} width="200" />
                    <Button variant="danger" onClick={() => handleXoaanhphu(index)}>
                      Xóa ảnh phụ
                    </Button>
                  </div>
                )}
              </Form.Group>
            ))}

            <Button onClick={handleThemanhphu}>Thêm ảnh phụ</Button>

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
