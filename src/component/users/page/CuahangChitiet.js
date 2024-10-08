import React, { useContext, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom"; // Import useParams để lấy tham số từ URL
import Footerusers from "../Footerusers";
import HeaderUsers from "../HeaderUsers";
import { CartContext } from "./CartContext";

const CuahangChitiet = () => {
  const { id } = useParams(); // Lấy ID sản phẩm từ URL
  const [sanPham, setSanPham] = useState(null); // State lưu trữ thông tin sản phẩm
  const [chiTiet, setChiTiet] = useState(null); // State lưu trữ thông tin chi tiết sản phẩm
  const { addToCart } = useContext(CartContext); // Hàm thêm sản phẩm vào giỏ hàng từ context

  useEffect(() => {
    // Hàm gọi API lấy thông tin sản phẩm và chi tiết
    const layThongTinSanPham = async () => {
      try {
        const response = await fetch(`${process.env.REACT_APP_BASEURL}/api/products/${id}`);
        const data = await response.json();
        setSanPham(data); // Lưu thông tin sản phẩm vào state

        // Lấy chi tiết sản phẩm từ API
        if (data.chitiet) {
          setChiTiet(data.chitiet); // Lưu chi tiết sản phẩm vào state
        }
      } catch (error) {
        console.error("Lỗi khi lấy thông tin sản phẩm:", error);
      }
    };

    layThongTinSanPham();
  }, [id]); // Gọi lại hàm khi component mount hoặc khi ID thay đổi

  if (!sanPham) {
    return <div>Đang tải...</div>; // Hiển thị trạng thái loading khi đang lấy dữ liệu
  }

  return (
    <>
      <div>
        <HeaderUsers />

        {/* Single Page Header start */}
        <div className="container-fluid page-header py-5">
          <h1 className="text-center text-white display-6">Chi Tiết Sản Phẩm</h1>
        </div>
        {/* Single Page Header End */}

        {/* Chi Tiết Sản Phẩm Start */}
        <div className="container-fluid py-5 mt-5">
          <div className="container py-5">
            <div className="row g-4 mb-5">
              <div className="col-lg-8 col-xl-9">
                <div className="row g-4">
                  <div className="col-lg-6">
                    <div className="border rounded">
                      <img
                        src={`${process.env.REACT_APP_BASEURL}/storage/${sanPham.image}`}
                        className="img-fluid rounded square-image" /* Thêm lớp 'square-image' */
                        alt={sanPham.title}
                        data-bs-toggle="modal"
                        data-bs-target="#imageModal"
                      />
                      {/* Modal hiển thị hình ảnh */}
                      <div className="modal fade" id="imageModal" tabIndex="-1" aria-labelledby="imageModalLabel" aria-hidden="true">
                        <div className="modal-dialog modal-dialog-centered">
                          <div className="modal-content">
                            <div className="modal-body">
                              <img
                                src={`${process.env.REACT_APP_BASEURL}/storage/${sanPham.image}`}
                                className="img-fluid square-image"
                                alt={sanPham.title}
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col-lg-6">
                    <h4 className="fw-bold mb-3">{sanPham.name}</h4>
                    <p className="mb-3">Danh Mục: {sanPham.danhsachsanpham?.name}</p>
                    <h5 className="fw-bold mb-3">{sanPham.price} vnđ / {sanPham.don_vi_tinh}</h5>

                    

                    {/* Kiểm tra trạng thái Hết hàng */}
                    {sanPham.status === 'Hết hàng' ? (
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

            {/* Hiển thị chi tiết sản phẩm */}
            {chiTiet && (
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
          </div>
        </div>
        {/* Chi Tiết Sản Phẩm End */}
        <Footerusers />
      </div>
    </>
  );
}

export default CuahangChitiet;
