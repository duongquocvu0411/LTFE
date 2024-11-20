import React, { useContext, useEffect, useState } from "react";
import Footerusers from "../Footerusers";
import axios from "axios";
import HeaderUsers from "../HeaderUsers";
import { CartContext } from "./CartContext";
import { Link } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import { Spinner } from "react-bootstrap";
import Countdown from "react-countdown";

const Cuahang = () => {
  const [danhMuc, setDanhMuc] = useState([]);
  const [sanPham, setSanPham] = useState([]);
  const [danhMucDuocChon, setDanhMucDuocChon] = useState("");
  const { addToCart } = useContext(CartContext);
  const [trangHienTai, setTrangHienTai] = useState(1);
  const sanPhamMoiTrang = 8;
  const [dangtai, setDangtai] = useState(false);

  useEffect(() => {
    fetchDanhMuc();
    fetchSanPham();
  }, [danhMucDuocChon]);

  const fetchDanhMuc = async () => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_BASEURL}/api/danhmucsanpham`);
      setDanhMuc(response.data);
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };

  const fetchSanPham = async () => {
    setDangtai(true);
    try {
      const url = danhMucDuocChon
        ? `${process.env.REACT_APP_BASEURL}/api/sanpham/danhmuc/${danhMucDuocChon}`
        : `${process.env.REACT_APP_BASEURL}/api/sanpham`;

      const phanHoi = await axios.get(url);
      setSanPham(phanHoi.data);
    } catch (error) {
      toast.error("Có lỗi khi lấy danh sách sản phẩm", { position: "top-right", autoClose: 3000 });
    } finally {
      setDangtai(false);
    }
  };

  const indexOfLastProduct = trangHienTai * sanPhamMoiTrang;
  const indexOfFirstProduct = indexOfLastProduct - sanPhamMoiTrang;
  const sanPhamHienTai = sanPham.slice(indexOfFirstProduct, indexOfLastProduct);
  const tongSoTrang = Math.ceil(sanPham.length / sanPhamMoiTrang);
  const thayDoiTrang = (soTrang) => setTrangHienTai(soTrang);

  return (
    <div>
      <HeaderUsers />
      <div className="container-fluid page-header py-5">
        <h1 className="text-center text-white display-6">Cửa hàng</h1>
      </div>
      <div className="container-fluid fruite py-5">
        <div className="container py-5">
          <h1 className="mb-4">Cửa hàng trái cây tươi</h1>
          
          {/* Category Dropdown for Filtering */}
          <div className="d-flex justify-content-end mb-4">
            <div className="bg-light ps-3 py-3 rounded d-flex align-items-center">
              <div className="dropdown">
                <button
                  className="btn btn-secondary dropdown-toggle"
                  type="button"
                  id="dropdownCategoryButton"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  {danhMucDuocChon
                    ? danhMuc.find((dm) => dm.id === danhMucDuocChon)?.name || "Danh mục không rõ"
                    : "Tất cả sản phẩm"}
                </button>
                <ul className="dropdown-menu" aria-labelledby="dropdownCategoryButton">
                  <li>
                    <button className="dropdown-item" type="button" onClick={() => setDanhMucDuocChon("")}>
                      Tất cả sản phẩm
                    </button>
                  </li>
                  {danhMuc.map((dm) => (
                    <li key={dm.id}>
                      <button className="dropdown-item" type="button" onClick={() => setDanhMucDuocChon(dm.id)}>
                        {dm.name}
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          <div className="tab-content mt-4">
            <div className="tab-pane fade show p-0 active">
              {dangtai ? (
                <div className="text-center">
                  <Spinner animation="border" variant="primary" />
                  <p>Đang tải dữ liệu...</p>
                </div>
              ) : sanPham.length > 0 ? (
                <>
                  {sanPham.length === 0 ? (
                    <div className="text-center">
                      <p>Không có sản phẩm trong danh mục này.</p>
                    </div>
                  ) : (
                    <div className="row g-4">
                      {sanPhamHienTai.map((sanPham) => {
                        const activeSale = sanPham.sanphamSales?.find(
                          (sale) =>
                            sale.trangthai === "Đang áp dụng" &&
                            new Date(sale.thoigianbatdau) <= new Date() &&
                            new Date(sale.thoigianketthuc) >= new Date()
                        );

                        const saleExpired = sanPham.sanphamSales?.some(
                          (sale) =>
                            sale.trangthai === "Đang áp dụng" &&
                            new Date(sale.thoigianketthuc) < new Date()
                        );

                        return (
                          <div className="col-md-6 col-lg-4 col-xl-3" key={sanPham.id}>
                            <div className="rounded position-relative fruite-item shadow-sm">
                              <div className="fruite-img position-relative">
                                <Link to={`/sanpham/${sanPham.id}`} className="btn btn-link">
                                  <img
                                    src={sanPham.hinhanh}
                                    className="img-fluid w-100 rounded-top"
                                    alt={sanPham.tieude}
                                    style={{ height: 250, objectFit: "cover" }}
                                  />
                                </Link>
                                {sanPham.trangthai === "Hết hàng" && (
                                  <div className="position-absolute top-50 start-50 translate-middle d-flex align-items-center justify-content-center bg-dark bg-opacity-50"
                                    style={{ zIndex: 1, padding: "5px 10px", borderRadius: "5px" }}>
                                    <span className="text-white small fw-bold">Hết hàng</span>
                                  </div>
                                )}
                              </div>
                              <div className="text-white bg-secondary px-2 py-1 rounded position-absolute" style={{ top: 10, left: 10 }}>
                                {sanPham.danhmucsanphamName}
                              </div>
                              <div className="p-3 rounded-bottom">
                                <p className="h5 fw-bold">{sanPham.tieude}</p>
                                <div className="d-flex flex-column align-items-start">
                                  {activeSale ? (
                                    <>
                                      <p className="text-muted mb-1" style={{ textDecoration: "line-through" }}>
                                        {parseFloat(sanPham.giatien).toLocaleString("vi-VN", { minimumFractionDigits: 3 })}{" "}
                                        vnđ / {sanPham.don_vi_tinh}
                                      </p>
                                      <p className="text-danger fw-bold mb-2">
                                        {parseFloat(activeSale.giasale).toLocaleString("vi-VN", { minimumFractionDigits: 3 })}{" "}
                                        vnđ / {sanPham.don_vi_tinh}
                                      </p>
                                      <p className="text-warning mb-2">
                                        <Countdown
                                          date={new Date(activeSale.thoigianketthuc)}
                                          renderer={({ days, hours, minutes, seconds, completed }) =>
                                            completed ? (
                                              <span>Khuyến mãi đã kết thúc</span>
                                            ) : (
                                              <span>
                                                Còn lại: {days} ngày {hours} giờ {minutes} phút {seconds} giây
                                              </span>
                                            )
                                          }
                                        />
                                      </p>
                                    </>
                                  ) : saleExpired ? (
                                    <p className="text-danger fw-bold">Khuyến mãi đã kết thúc</p>
                                  ) : (
                                    <p className="text-dark fs-5 fst-italic mb-0">
                                      {parseFloat(sanPham.giatien).toLocaleString("vi-VN", { minimumFractionDigits: 3 })}{" "}
                                      vnđ / {sanPham.don_vi_tinh}
                                    </p>
                                  )}
                                </div>
                                {/* Add to Cart Button */}
                                {sanPham.trangthai !== "Hết hàng" && !saleExpired && (
                                  <button
                                    onClick={() => addToCart(sanPham)}
                                    className="btn btn-warning w-100 mt-3"
                                  >
                                    Thêm vào giỏ
                                  </button>
                                )}
                              </div>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  )}
                </>
              ) : (
                <div className="text-center">
                  <p>Không có sản phẩm nào trong danh mục này.</p>
                </div>
              )}
            </div>
          </div>

          {/* Pagination */}
          <div className="d-flex justify-content-center mt-4">
            <ul className="pagination">
              <li className="page-item" onClick={() => thayDoiTrang(trangHienTai - 1)}>
                <button className="page-link" disabled={trangHienTai === 1}>
                  Previous
                </button>
              </li>
              {[...Array(tongSoTrang)].map((_, index) => (
                <li key={index} className="page-item" onClick={() => thayDoiTrang(index + 1)}>
                  <button className="page-link">{index + 1}</button>
                </li>
              ))}
              <li className="page-item" onClick={() => thayDoiTrang(trangHienTai + 1)}>
                <button className="page-link" disabled={trangHienTai === tongSoTrang}>
                  Next
                </button>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <Footerusers />
      <ToastContainer />
    </div>
  );
};

export default Cuahang;
