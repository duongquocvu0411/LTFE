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
  const [title, setTitle] = useState("");
  const [price, setPrice] = useState("");
  const [dvt, setDvt] = useState("");
  const [image, setImage] = useState(null);
  const [categoryId, setCategoryId] = useState(""); 
  const [categories, setCategories] = useState([]);
  const [status, setStatus] = useState("");
  

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
  });

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_BASEURL}/api/danhsachsanpham`)
      .then((response) => {
        setCategories(response.data);
      })
      .catch((error) => {
        console.log("Có lỗi khi lấy dữ liệu từ API ", error);
      });

    if (isEdit && product) {
      setTitle(product.title);
      setStatus(product.status);
      setPrice(product.price);
      setDvt(product.dvt);
      setImage(product.image);
      setCategoryId(product.danhsachsanpham_id);

      // Set các trường chi tiết sản phẩm nếu có
      if (product.chitiet) {
        setChiTiet({
          mo_ta_chung: product.chitiet.mo_ta_chung,
          hinh_dang: product.chitiet.hinh_dang,
          cong_dung: product.chitiet.cong_dung,
          xuat_xu: product.chitiet.xuat_xu,
          khoi_luong: product.chitiet.khoi_luong,
          bao_quan: product.chitiet.bao_quan,
          thanh_phan_dinh_duong: product.chitiet.thanh_phan_dinh_duong,
          ngay_thu_hoach: product.chitiet.ngay_thu_hoach,
          huong_vi: product.chitiet.huong_vi,
          nong_do_duong: product.chitiet.nong_do_duong,
        });
      }
    } else {
      resetForm();
      resetChiTiet();
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
    formData.append("title", title);
    formData.append("status", status);
    formData.append("price", price);
    formData.append("don_vi_tinh", dvt); 
    formData.append("danhsachsanpham_id", categoryId);

    // Thêm chi tiết sản phẩm vào formData
    for (const key in chiTiet) {
      formData.append(key, chiTiet[key]);
    }

    if (image instanceof File) {
      formData.append("image", image);
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
    setTitle("");
    setStatus("");
    setPrice("");
    setDvt("");
    setImage(null);
    setCategoryId("");
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
                value={title}
                onChange={(e) => setTitle(e.target.value)} 
              />
            </Form.Group>
           
           
            <Form.Group className="mb-3">
              <Form.Label>Trạng thái</Form.Label>
              <Form.Control
                as="select"
                value={status}
                onChange={(e) => setStatus(e.target.value)}
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
                value={price}
                onChange={(e) => setPrice(e.target.value)}
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
                value={categoryId}
                onChange={(e) => setCategoryId(e.target.value)}
              >
                <option value="">Chọn danh mục sản phẩm</option>
                {categories.map((category) => (
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
                onChange={(e) => setImage(e.target.files[0])}
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
