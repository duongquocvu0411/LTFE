import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Footerusers from "../Footerusers";
import HeaderUsers from "../HeaderUsers";
import { CartContext } from "./CartContext";
import { Modal, Button, Form } from "react-bootstrap"; // Sử dụng modal từ react-bootstrap
import { toast, ToastContainer } from "react-toastify";

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
  const [tieude, setTieude] = useState(""); // Họ tên của khách hàng
  const [noiDung, setNoiDung] = useState(""); // Nội dung đánh giá

  useEffect(() => {
    // Lấy thông tin sản phẩm và chi tiết
    const layThongTinSanPham = async () => {
      try {
        const response = await fetch(`${process.env.REACT_APP_BASEURL}/api/products/${id}`);
        const data = await response.json();
        setSanPham(data); // Lưu thông tin sản phẩm
        if (data.chitiet) {
          setChiTiet(data.chitiet); // Lưu chi tiết sản phẩm
        }
      } catch (error) {
        console.error("Lỗi khi lấy thông tin sản phẩm:", error);
      }
    };

    // Lấy đánh giá của sản phẩm
    const layDanhGia = async () => {
      try {
        const response = await fetch(`${process.env.REACT_APP_BASEURL}/api/danhgia?sanphams_id=${id}`);
        const data = await response.json();
        setDanhGia(data); // Lưu danh sách đánh giá
      } catch (error) {
        console.error("Lỗi khi lấy đánh giá sản phẩm:", error);
      }
    };

    layThongTinSanPham();
    layDanhGia();
  }, [id]);

  // Hàm mở modal để viết đánh giá
  const moModalVietDanhGia = (soSao) => {
    setSoSao(soSao); // Lưu số sao mà khách hàng chọn
    setShowModal(true); // Hiển thị modal
  };

  // Hàm gửi đánh giá
  const guiDanhGia = async () => {
    const danhGiaMoi = {
      sanphams_id: id,
      ho_ten: hoTen,
      so_sao: soSao, // Số sao được lấy từ lựa chọn ban đầu
      noi_dung: noiDung,
    };

    try {
      const response = await fetch(`${process.env.REACT_APP_BASEURL}/api/danhgia`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(danhGiaMoi),
      });

      if (response.ok) {
        // Lấy dữ liệu đánh giá mới nhất từ API
        const layDanhGiaMoi = async () => {
          const response = await fetch(`${process.env.REACT_APP_BASEURL}/api/danhgia?sanphams_id=${id}`);
          const data = await response.json();
          setDanhGia(data); // Cập nhật danh sách đánh giá mới nhất
        };

        await layDanhGiaMoi(); // Cập nhật danh sách đánh giá sau khi gửi thành công

        setShowModal(false); // Đóng modal
        //Reset dữ liệu form
        setHoTen("");
        setTieude("");
        setNoiDung("");
        setSoSao(0);

        // hiển thị thông báo
        toast.success('Đánh giá của bạn đã được gửi!', {
          position: 'top-right',
          autoClose: 3000
        })
      } else {
        toast.warning('Có lỗi xảy ra, vui lòng thử lại!', {
          position: 'top-right',
          autoClose: 3000
        })

      }
    } catch (error) {
      console.error("Lỗi khi gửi đánh giá:", error);

    }
  };


  if (!sanPham) {
    return <div>Đang tải...</div>;
  }

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
                        src={`${process.env.REACT_APP_BASEURL}/storage/${sanPham.hinhanh}`}
                        className="img-fluid rounded square-image"
                        alt={sanPham.tieude}
                      />
                    </div>
                  </div>
                  <div className="col-lg-6">
                    <h4 className="fw-bold mb-3">{sanPham.tieude}</h4>
                    <p className="mb-3">Danh Mục: {sanPham.danhsachsanpham?.name}</p>

                    <h5 className="fw-bold mb-3">{sanPham.giatien} vnđ / {sanPham.don_vi_tinh}</h5>

                    {/* Kiểm tra trạng thái Hết hàng */}
                    {sanPham.trangthai === 'Hết hàng' ? (
                      <p className="text-danger fw-bold">Sản phẩm hiện đang hết hàng</p>
                    ) : (
                      <button
                        onClick={() => addToCart(sanPham)}
                        className="btn border border-secondary rounded-pill px-3 text-primary">
                        <i className="fa fa-shopping-bag me-2 text-primary" /> Thêm vào giỏ hàng
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </div>

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
                {/* Nút mở modal chọn sao và viết đánh giá */}
                <div className="mt-4">
                  <h4 className="fw-bold">Viết Đánh Giá của bạn</h4>
                  <p>Chọn số sao:</p>
                  {[1, 2, 3, 4, 5].map((soSaoItem) => (
                    <span
                      key={soSaoItem}
                      className={`fa fa-star ${soSao >= soSaoItem ? 'text-warning' : ''}`}
                      style={{ cursor: "pointer" }}
                      onClick={() => moModalVietDanhGia(soSaoItem)}
                    />
                  ))}
                </div>

                {/* Kiểm tra danh sách đánh giá */}
                {danhGia.length > 0 ? (
                  <div className="container border p-4 rounded mt-4">
                    {/* hiển thị nội dung đánh giá sản phẩm */}
                    <h4 className="fw-bold">Đánh Giá Sản Phẩm</h4>
                    {danhGia.map((dg, index) => (
                      <div key={index} className="mb-3">
                        <h5>{dg.ho_ten}</h5>
                        <p>
                          {/* Array(dg.so_sao).fill().map((_, i) => ...): Hiển thị số ngôi sao đã chọn màu vàng. */}
                          {Array(dg.so_sao)
                            .fill()
                            .map((_, i) => (
                              <span key={i} className="fa fa-star text-warning"></span>
                            ))}
                          {/* 
                          Array(5 - dg.so_sao).fill().map((_, i) => ...): Hiển thị các ngôi sao trống (chưa chọn) */}
                          {Array(5 - dg.so_sao)
                            .fill()
                            .map((_, i) => (
                              <span key={i} className="fa fa-star"></span>
                            ))}
                        </p>
                        <p>{dg.noi_dung}</p>
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
            <Modal show={showModal}
              onHide={() => {
                setShowModal(false); // tắt modald khi ấn hủy 
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
                      placeholder="Nhập họ và tên của bạn"
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
