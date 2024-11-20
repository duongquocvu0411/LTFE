import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Footerusers from "../Footerusers";
import HeaderUsers from "../HeaderUsers";
import { CartContext } from "./CartContext";
import { Modal, Button, Form, Spinner } from "react-bootstrap"; // Sử dụng modal từ react-bootstrap
import { toast, ToastContainer } from "react-toastify";
import { Lightbox } from "react-modal-image"; // Sử dụng thư viện Lightbox để phóng to ảnh
import Countdown from "react-countdown";

const CuahangChitiet = () => {
  const { id } = useParams(); // Lấy ID sản phẩm từ URL
  const [sanPham, setSanPham] = useState(null); // Thông tin sản phẩm
  const [chiTiet, setChiTiet] = useState(null); // Chi tiết sản phẩm
  const [danhGia, setDanhGia] = useState([]); // Danh sách đánh giá của sản phẩm
  const [tab, setTab] = useState("chiTiet"); // Quản lý tab hiển thị (chi tiết hoặc bài viết)
  const { addToCart } = useContext(CartContext); // Hàm thêm sản phẩm vào giỏ hàng từ context

  const [soSao, setSoSao] = useState(0); // Số sao được chọn khi viết đánh giá
  const [showModal, setShowModal] = useState(false); // Hiển thị modal nhập đánh giá
  const [hoTen, setHoTen] = useState(""); // Họ tên của khách hàng
  const [tieude, setTieude] = useState(""); // Tiêu đề đánh giá của khách hàng
  const [noiDung, setNoiDung] = useState(""); // Nội dung đánh giá
  const [hinhanhPhu, setHinhanhPhu] = useState([]); // Danh sách hình ảnh phụ của sản phẩm
  const [largeImage, setLargeImage] = useState(null); // Hình ảnh lớn để hiển thị khi click vào
  const [dangtai, setDangtai] = useState(false);
  useEffect(() => {

    layThongTinSanPham();

  }, [id]);
  // Lấy thông tin sản phẩm và chi tiết
  const layThongTinSanPham = async () => {
    const response = await fetch(`${process.env.REACT_APP_BASEURL}/api/sanpham/${id}`);
    const data = await response.json();
    console.log("Dữ liệu sản phẩm:", data); // Kiểm tra dữ liệu
    setSanPham(data);
    setChiTiet(data.chiTiet); // Đảm bảo đúng thuộc tính nếu API trả về theo snake_case
    console.log("Hình ảnh phụ:", data.images); // Kiểm tra dữ liệu của images
    setHinhanhPhu(data.images); // Đảm bảo rằng images có dữ liệu
  };


  // Hàm mở modal để viết đánh giá
  const moModalVietDanhGia = (soSao) => {
    setSoSao(soSao); // Lưu số sao mà khách hàng chọn
    setShowModal(true); // Hiển thị modal
  };

  // Hàm gửi đánh giá
  const guiDanhGia = async () => {
    if (!hoTen.trim()) {
      toast.error("Họ tên không được bỏ trống!", { position: "top-right", autoClose: 3000 });
      return;
    }
    if (!tieude.trim()) {
      toast.error("Tiêu đề không được bỏ trống!", { position: "top-right", autoClose: 3000 });
      return;
    }
    if (!noiDung.trim()) {
      toast.error("Nội dung không được bỏ trống!", { position: "top-right", autoClose: 3000 });
      return;
    }

    const danhGiaMoi = {
      sanphams_id: id,
      ho_ten: hoTen,
      tieude: tieude,
      so_sao: soSao,
      noi_dung: noiDung,
    };

    try {
      const response = await fetch(`${process.env.REACT_APP_BASEURL}/api/danhgiakhachhang`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(danhGiaMoi),
      });

      if (response.ok) {
        toast.success("Đánh giá của bạn đã được gửi!", { position: "top-right", autoClose: 3000 });
        setShowModal(false);
        setHoTen("");
        setTieude("");
        setNoiDung("");
        setSoSao(0);

        // Refetch the product details including the updated reviews
        layThongTinSanPham();
      } else {
        toast.warning("Có lỗi xảy ra, vui lòng thử lại!", { position: "top-right", autoClose: 3000 });
      }
    } catch (error) {
      console.error("Lỗi khi gửi đánh giá:", error);
    }
  };
  if (dangtai) {
    return (
      <div className="text-center mt-5">
        <Spinner animation="border" variant="primary" />
        <p>Đang tải dữ liệu...</p>
      </div>
    );
  }

  if (!sanPham) {
    return <div>Không tìm thấy sản phẩm.</div>;
  }
  // Renderer cho Countdown
  const countdownRenderer = ({ days, hours, minutes, seconds, completed }) => {
    if (completed) {
      return <span>Khuyến mãi đã kết thúc</span>;
    } else {
      return (
        <span>
          Còn lại: {days} ngày {hours} giờ {minutes} phút {seconds} giây
        </span>
      );
    }
  };

  const sale = sanPham.sanphamSales?.find((sale) => sale.trangthai === "Đang áp dụng");
  const isSaleActive = sale !== undefined;

  return (
    <>
      <div>
        <HeaderUsers />

        {/* Hiển thị thông tin sản phẩm */}
        <div className="container-fluid page-header py-5">
          <h1 className="text-center text-white display-6">Chi Tiết Sản Phẩm</h1>
        </div>

        <div className="container-fluid py-5 mt-5">
          <div className="container py-5">
            <div className="row g-4 mb-5">
              <div className="col-lg-8 col-xl-9">
                <div className="row g-4">
                  <div className="col-lg-6">
                    <div className="border rounded">
                      <img
                        src={`${process.env.REACT_APP_BASEURL}/${sanPham.hinhanh}`}
                        className="img-fluid rounded square-image"
                        alt={sanPham.tieude}
                        style={{ cursor: 'pointer' }} // Thêm con trỏ chỉ tay
                        onClick={() => setLargeImage(`${process.env.REACT_APP_BASEURL}/${sanPham.hinhanh}`)} // Mở lightbox khi click vào ảnh
                      />
                    </div>
                    <div className="mt-3">
                      <h5>Hình ảnh khác của sản phẩm:</h5>
                      <div className="d-flex flex-wrap">
                        {hinhanhPhu.map((img, index) => (
                          <img
                            key={index}
                            src={`${process.env.REACT_APP_BASEURL}/${img.hinhanh}`}
                            className="img-thumbnail me-2"
                            alt={`Hình ảnh phụ ${index + 1}`}
                            style={{ width: '100px', height: '100px', cursor: 'pointer' }} // Thêm con trỏ chỉ tay
                            onClick={() => setLargeImage(`${process.env.REACT_APP_BASEURL}/${img.hinhanh}`)} // Mở lightbox khi click vào ảnh phụ
                          />
                        ))}
                      </div>
                    </div>
                  </div>
                  <div className="col-lg-6">
                    <h4 className="fw-bold mb-3">{sanPham.tieude}</h4>
                    <p className="mb-3">Danh Mục: {sanPham.danhmucsanphamName}</p>
                    {isSaleActive ? (
                      <div>
                        <p className="text-muted mb-2" style={{ textDecoration: "line-through" }}>
                          Giá gốc: {parseFloat(sanPham.giatien).toLocaleString("vi-VN", { minimumFractionDigits: 3 })}{" "}/ vnđ  ({sanPham.don_vi_tinh})


                        </p>
                        <p className="text-danger fw-bold mb-2">
                          Giá khuyến mãi: {parseFloat(sale.giasale).toLocaleString("vi-VN", { minimumFractionDigits: 3 })}{" "}/ vnđ  ({sanPham.don_vi_tinh})
                        </p>
                        <p className="text-warning">
                          <Countdown date={new Date(sale.thoigianketthuc)} renderer={countdownRenderer} />
                        </p>
                      </div>
                    ) : (
                      <h5 className="fw-bold mb-3">{parseFloat(sanPham.giatien).toLocaleString("vi-VN", { minimumFractionDigits: 3 })}{" "} vnđ / {sanPham.don_vi_tinh}</h5>
                    )}

                    {/* Kiểm tra trạng thái Hết hàng */}
                    {sanPham.trangthai === "Hết hàng" || (isSaleActive && new Date(sale.thoigianketthuc) <= new Date()) ? (
                      <p className="text-danger fw-bold">
                        {sanPham.trangthai === "Hết hàng" ? "Sản phẩm hiện đang hết hàng" : ""}
                      </p>
                    ) : (
                      <button
                        onClick={() => addToCart(sanPham)}
                        className="btn border border-secondary rounded-pill px-3 text-primary"
                      >
                        <i className="fa fa-shopping-bag me-2 text-primary" /> Thêm vào giỏ hàng
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* Lightbox để hiển thị hình ảnh lớn */}
            {largeImage && (
              <Lightbox
                large={largeImage}
                onClose={() => setLargeImage(null)} // Đóng lightbox khi nhấn nút đóng
              />
            )}

            {/* Tabs để chọn xem chi tiết sản phẩm, bài viết hoặc đánh giá */}
            <div className="d-flex justify-content-start mb-3">
              <button
                className={`btn ${tab === 'chiTiet' ? 'btn-primary' : 'btn-light'} me-2`}
                onClick={() => setTab("chiTiet")}
              >
                Xem Chi Tiết
              </button>
              <button
                className={`btn ${tab === 'baiViet' ? 'btn-primary' : 'btn-light'} me-2`}
                onClick={() => setTab("baiViet")}
              >
                Bài Viết về {sanPham.tieude}
              </button>
              <button
                className={`btn ${tab === 'danhGia' ? 'btn-primary' : 'btn-light'}`}
                onClick={() => setTab("danhGia")}
              >
                Xem Đánh Giá
              </button>
            </div>

            {/* Hiển thị chi tiết sản phẩm */}
            {tab === "chiTiet" && chiTiet && (
              <div className="container border p-4 rounded">
                <h4 className="fw-bold">Chi Tiết Sản Phẩm</h4>
                <p><strong>Mô tả chung:</strong> {chiTiet.mo_ta_chung || 'Không có thông tin'}</p>
                <p><strong>Hình dáng:</strong> {chiTiet.hinh_dang || 'Không có thông tin'}</p>
                <p><strong>Công dụng:</strong> {chiTiet.cong_dung || 'Không có thông tin'}</p>
                <p><strong>Xuất xứ:</strong> {chiTiet.xuat_xu || 'Không có thông tin'}</p>
                <p><strong>Khối lượng:</strong> {chiTiet.khoi_luong || 'Không có thông tin'}</p>
                <p><strong>Bảo quản:</strong> {chiTiet.bao_quan || 'Không có thông tin'}</p>
                <p><strong>Thành phần dinh dưỡng:</strong> {chiTiet.thanh_phan_dinh_duong || 'Không có thông tin'}</p>
                <p><strong>Ngày thu hoạch:</strong> {chiTiet.ngay_thu_hoach || 'Không có thông tin'}</p>
                <p><strong>Hương vị:</strong> {chiTiet.huong_vi || 'Không có thông tin'}</p>
                <p><strong>Nồng độ đường:</strong> {chiTiet.nong_do_duong || 'Không có thông tin'}</p>


              </div>
            )}

            {/* Hiển thị bài viết */}
            {tab === "baiViet" && chiTiet && (
              <div className="container border p-4 rounded">
                <h4 className="fw-bold">Bài Viết Đánh Giá</h4>
                {chiTiet.bai_viet ? (
                  <div dangerouslySetInnerHTML={{ __html: chiTiet.bai_viet }} />
                ) : (
                  <p>Sản phẩm không có bài viết</p>
                )}
              </div>
            )}

            {/* Hiển thị danh sách đánh giá */}
            {tab === "danhGia" && (
              <div>
                <div className="mt-4">
                  <h4 className="fw-bold">Viết Đánh Giá của bạn</h4>
                  <p>Chọn số sao:</p>
                  {[1, 2, 3, 4, 5].map((soSaoItem) => (
                    <span
                      key={soSaoItem}
                      className={`fa fa-star ${soSao >= soSaoItem ? "text-warning" : ""}`}
                      style={{ cursor: "pointer" }}
                      onClick={() => moModalVietDanhGia(soSaoItem)}
                    />
                  ))}
                </div>
                {sanPham.danhgiakhachhangs && sanPham.danhgiakhachhangs.length > 0 ? (
                  <div className="container border p-4 rounded mt-4">
                    <h4 className="fw-bold">Đánh Giá Sản Phẩm</h4>
                    {sanPham.danhgiakhachhangs.map((dg, index) => (
                      <div key={index} className="mb-3">
                        <h4>Họ và tên:  <b> {dg.ho_ten}</b></h4>
                        <h5>Tiêu đề: <b>{dg.tieude}</b></h5>
                        <p>
                          {Array(dg.so_sao)
                            .fill()
                            .map((_, i) => (
                              <span key={i} className="fa fa-star text-warning"></span>
                            ))}
                          {Array(5 - dg.so_sao)
                            .fill()
                            .map((_, i) => (
                              <span key={i} className="fa fa-star"></span>
                            ))}
                        </p>
                        <p> Nội dung: <b>{dg.noi_dung}</b></p>
                        <p>
                          Ngày tạo: <b>{new Date(dg.created_at).toLocaleDateString("vi-VN")}</b>
                        </p>

                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="container border p-4 rounded mt-4">
                    <p>Chưa có đánh giá nào cho sản phẩm này.</p>
                  </div>
                )}
              </div>
            )}

            {/* Modal viết đánh giá */}
            <Modal
              show={showModal}
              onHide={() => {
                setShowModal(false); // tắt modal khi ấn hủy 
                setSoSao(0);
              }}
            >
              <Modal.Header closeButton>
                <Modal.Title>Viết Đánh Giá</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <Form>
                  <Form.Group className="mb-3">
                    <Form.Label>Họ và tên</Form.Label>
                    <Form.Control
                      type="text"
                      value={hoTen}
                      onChange={(e) => setHoTen(e.target.value)}
                      placeholder="Nhập họ và tên của bạn"
                      required
                    />
                  </Form.Group>
                  <Form.Group className="mb-3">
                    <Form.Label>Tiêu đề đánh giá</Form.Label>
                    <Form.Control
                      type="text"
                      value={tieude}
                      onChange={(e) => setTieude(e.target.value)}
                      placeholder="Nhập tiêu đề đánh giá của bạn"
                      required
                    />
                  </Form.Group>
                  <Form.Group className="mb-3">
                    <Form.Label>Nội dung đánh giá</Form.Label>
                    <Form.Control
                      as="textarea"
                      rows={3}
                      value={noiDung}
                      onChange={(e) => setNoiDung(e.target.value)}
                      placeholder="Nhập nội dung đánh giá"
                      required
                    />
                  </Form.Group>
                </Form>
              </Modal.Body>
              <Modal.Footer>
                <Button variant="secondary" onClick={() => {
                  setShowModal(false);
                  setSoSao(0);
                }}>
                  Hủy
                </Button>
                <Button variant="primary" onClick={guiDanhGia}>
                  Gửi đánh giá
                </Button>
              </Modal.Footer>
            </Modal>
          </div>
        </div>

        <Footerusers />
        <ToastContainer />
      </div>
    </>
  );
};

export default CuahangChitiet;
