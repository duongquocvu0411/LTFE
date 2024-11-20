import React, { useState, useEffect } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import axios from "axios";
import { toast } from "react-toastify";
import MoadlChitietsanpham from "./ModlaSanphamchitiet";
import ModlaSanphamsale from './ModlaSanphamsale';

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
  const [showSaleModal, setShowSaleModal] = useState(false);
  // Quản lý ảnh phụ
  const [Fileanhphu, setFileanhphu] = useState([{}]);
  const [hinhanhPhu, setHinhanhPhu] = useState([]); // Hình ảnh phụ mới chọn
  const [existingHinhanhPhu, setExistingHinhanhPhu] = useState([]); // Ảnh phụ hiện có từ API
  const [saleData, setSaleData] = useState(null);
  // Modal chi tiết sản phẩm
  const [showChiTietModal, setShowChiTietModal] = useState(false);
  const [chiTiet, setChiTiet] = useState({
    moTaChung: "",
    hinhDang: "",
    congDung: "",
    xuatXu: "",
    khoiLuong: "",
    baoQuan: "",
    thanhPhanDinhDuong: "",
    ngayThuHoach: "",
    huongVi: "",
    nongDoDuong: "",
    baiViet: "",
  });

  useEffect(() => {

    axios
      .get(`${process.env.REACT_APP_BASEURL}/api/danhmucsanpham`)
      .then((response) => {
        setDanhmuc(response.data);
      })
      .catch((error) => {
        console.log("Có lỗi khi lấy dữ liệu từ API ", error);
      });
    console.log("Product data:", product); // Kiểm tra giá trị của `product`
    if (isEdit && product) {
      setTieude(product.tieude || "");
      setTrangthai(product.trangthai || "");
      setGiatien(product.giatien || "");
      setDvt(product.don_vi_tinh || ""); // Đảm bảo `dvt` có giá trị mặc định
      setDanhmucsanphamID(product.danhmucsanpham_id || "");

      setSaleData(
        product.sanphamSales && product.sanphamSales.length > 0
          ? {
              ...product.sanphamSales[0],
              thoigianbatdau: product.sanphamSales[0].thoigianbatdau
                ? product.sanphamSales[0].thoigianbatdau.substring(0, 16)
                : "",
              thoigianketthuc: product.sanphamSales[0].thoigianketthuc
                ? product.sanphamSales[0].thoigianketthuc.substring(0, 16)
                : "",
            }
          : null
      );


      // Hiển thị ảnh chính
      if (product.hinhanh) {
        setXemtruocHinhAnh(`${process.env.REACT_APP_BASEURL}/${product.hinhanh}`);
      }

      // Hiển thị ảnh phụ từ API
      if (product.images) {
        setExistingHinhanhPhu(product.images);
        setFileanhphu(product.images.map(() => ({}))); // Tạo input tương ứng với số ảnh phụ
      }

      if (product.chiTiet) {
        setChiTiet({
          moTaChung: product.chiTiet.mo_ta_chung || "",
          hinhDang: product.chiTiet.hinh_dang || "",
          congDung: product.chiTiet.cong_dung || "",
          xuatXu: product.chiTiet.xuat_xu || "",
          khoiLuong: product.chiTiet.khoi_luong || "",
          baoQuan: product.chiTiet.bao_quan || "",
          thanhPhanDinhDuong: product.chiTiet.thanh_phan_dinh_duong || "",
          ngayThuHoach: product.chiTiet.ngay_thu_hoach || "",
          huongVi: product.chiTiet.huong_vi || "",
          nongDoDuong: product.chiTiet.nong_do_duong || "",
          baiViet: product.chiTiet.bai_viet || "",
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
    let hasError = false;

    // Validation cho các trường bắt buộc
    if (!tieude) {
      toast.error("Vui lòng nhập tiêu đề sản phẩm.", { autoClose: 3000 });
      hasError = true;
    }

    if (!giatien) {
      toast.error("Vui lòng nhập giá sản phẩm.", { autoClose: 3000 });
      hasError = true;
    }

    if (!dvt) {
      toast.error("Vui lòng chọn đơn vị tính.", { autoClose: 3000 });
      hasError = true;
    }

    if (!danhmucsanphamID) {
      toast.error("Vui lòng chọn danh mục sản phẩm.", { autoClose: 3000 });
      hasError = true;
    }

    if (!trangthai) {
      toast.error("Vui lòng chọn trạng thái sản phẩm.", { autoClose: 3000 });
      hasError = true;
    }

    if (!isEdit && !hinhanh) {
      toast.error("Vui lòng chọn hình ảnh chính.", { autoClose: 3000 });
      hasError = true;
    }

    if (hasError) return;

    // Tạo FormData và thêm tất cả các trường
    const formData = new FormData();
    formData.append("Tieude", tieude);
    formData.append("Giatien", giatien);
    formData.append("Trangthai", trangthai);
    formData.append("DonViTinh", dvt);
    formData.append("DanhmucsanphamId", danhmucsanphamID);

    // Thêm hình ảnh chính nếu có hình ảnh mới
    if (hinhanh) {
      formData.append("Hinhanh", hinhanh);
    }
    if (saleData) {
      formData.append("Sale.Giasale", saleData.giasale || "");
      formData.append("Sale.Thoigianbatdau", saleData.thoigianbatdau || "");
      formData.append("Sale.Thoigianketthuc", saleData.thoigianketthuc || "");
      formData.append("Sale.Trangthai", saleData.trangthai || "");
    }


    // Thêm ảnh phụ nếu có ảnh mới
    hinhanhPhu.forEach((file) => {
      if (file) formData.append("Images", file);
    });

    // Thêm chi tiết sản phẩm nếu có bất kỳ trường nào được nhập
    if (Object.keys(chiTiet).some((key) => chiTiet[key])) {
      formData.append("ChiTiet.MoTaChung", chiTiet.moTaChung || "");
      formData.append("ChiTiet.HinhDang", chiTiet.hinhDang || "");
      formData.append("ChiTiet.CongDung", chiTiet.congDung || "");
      formData.append("ChiTiet.XuatXu", chiTiet.xuatXu || "");
      formData.append("ChiTiet.KhoiLuong", chiTiet.khoiLuong || "");
      formData.append("ChiTiet.BaoQuan", chiTiet.baoQuan || "");
      formData.append("ChiTiet.ThanhPhanDinhDuong", chiTiet.thanhPhanDinhDuong || "");
      formData.append("ChiTiet.NgayThuHoach", chiTiet.ngayThuHoach || "");
      formData.append("ChiTiet.HuongVi", chiTiet.huongVi || "");
      formData.append("ChiTiet.NongDoDuong", chiTiet.nongDoDuong || "");
      formData.append("ChiTiet.BaiViet", chiTiet.baiViet || "");
    }

    try {
      const method = isEdit ? "put" : "post";
      const url = isEdit
        ? `${process.env.REACT_APP_BASEURL}/api/sanpham/${product.id}`
        : `${process.env.REACT_APP_BASEURL}/api/sanpham`;


      const response = await axios({
        method,
        url,
        data: formData,
        headers: { "Content-Type": "multipart/form-data" },
      });

      toast.success(`Sản phẩm đã được ${isEdit ? "cập nhật" : "thêm"} thành công!`, { autoClose: 3000 });
      fetchSanpham();
      handleClose();
      resetForm();
      resetChiTiet();
    } catch (error) {
      console.error("Error while submitting product:", error);
      if (error.response) {
        console.error("Error details:", error.response.data);
      }
      toast.error(`Có lỗi khi ${isEdit ? "cập nhật" : "thêm"} sản phẩm. Vui lòng thử lại.`, { autoClose: 3000 });
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
    setSaleData(null);

  };
  const resetChiTiet = () => {
    setChiTiet({
      moTaChung: "",
      hinhDang: "",
      congDung: "",
      xuatXu: "",
      khoiLuong: "",
      baoQuan: "",
      thanhPhanDinhDuong: "",
      ngayThuHoach: "",
      huongVi: "",
      nongDoDuong: "",
      baiViet: "",
    });
  };

  // Hàm xử lý xóa ảnh phụ khi người dùng nhấn nút xóa
  const handleRemoveImage = async (imageId, index) => {
    try {
      await axios.delete(`${process.env.REACT_APP_BASEURL}/api/sanpham/images/${imageId}`);
      toast.success("Đã xóa ảnh phụ thành công!", { autoClose: 3000 });
      const updatedExistingImages = existingHinhanhPhu.filter((img) => img.id !== imageId);
      setExistingHinhanhPhu(updatedExistingImages);
      const capnhatFile = Fileanhphu.filter((_, i) => i !== index);
      setFileanhphu(capnhatFile);
    } catch (error) {
      console.error("Có lỗi khi xóa ảnh phụ:", error);
      toast.error("Không thể xóa ảnh phụ. Vui lòng thử lại!", { autoClose: 3000 });
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
                value={dvt} // Make sure this is exactly `dvt` with fallback to an empty string
                onChange={(e) => setDvt(e.target.value)} // Ensure this is updating the `dvt` state
              >
                <option value="">Chọn Đơn vị tính</option>
                <option value="kg">kg</option>
                <option value="phần">phần</option>
                {/* Add more options as needed */}
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
                <img src={`${process.env.REACT_APP_BASEURL}/${img.hinhanh}`} alt={`Ảnh phụ ${index + 1}`} width="200" />
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
            <Button
              variant="info"
              className="mt-3"
              onClick={() => setShowSaleModal(true)}
            >
              {saleData ? "Chỉnh sửa khuyến mãi" : "Thêm khuyến mãi"}
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
        {/* Modal sale */}
        <ModlaSanphamsale
        show={showSaleModal}
        handleClose={() => setShowSaleModal(false)}
        saleData={saleData}
        setSaleData={setSaleData}
      />


    </>
  );
};

export default ModlaSanpham;
