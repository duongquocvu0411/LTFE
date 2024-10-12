import React, { useContext, useEffect, useState } from "react";
import Footerusers from "../Footerusers";
import axios from "axios";
import HeaderUsers from "../HeaderUsers";
import { CartContext } from "./CartContext"; 
import { Link } from "react-router-dom";
import { ToastContainer } from "react-toastify";

const Cuahang = () => {
  // Khởi tạo state `danhMuc` để lưu trữ danh mục sản phẩm
  const [danhMuc, setDanhMuc] = useState([]);
  
  // Khởi tạo state `sanPham` để lưu trữ danh sách sản phẩm
  const [sanPham, setSanPham] = useState([]);
  
  // Khởi tạo state `danhMucDuocChon` để lưu trữ danh mục sản phẩm được chọn
  const [danhMucDuocChon, setDanhMucDuocChon] = useState("");

  // Sử dụng context `CartContext` để lấy hàm `addToCart` nhằm thêm sản phẩm vào giỏ hàng
  const { addToCart } = useContext(CartContext);

  // Pagination (phân trang)
  // Khởi tạo state `trangHienTai` để lưu trữ trang hiện tại, mặc định là trang 1
  const [trangHienTai, setTrangHienTai] = useState(1);
  
  // Số lượng sản phẩm hiển thị trên mỗi trang
  const sanPhamMoiTrang = 8;

  // useEffect: Gọi hàm `fetchDanhMuc` và `fetchSanPham` mỗi khi `danhMucDuocChon` thay đổi
  useEffect(() => {
    fetchDanhMuc();
    fetchSanPham();
  }, [danhMucDuocChon]);

  // Hàm `fetchDanhMuc` để lấy danh sách danh mục sản phẩm từ API
  const fetchDanhMuc = async () => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_BASEURL}/api/danhsachsanpham`);
      setDanhMuc(response.data); // Lưu danh mục vào state `danhMuc`
    } catch (error) {
      console.error('Error fetching categories:', error);
    }
  };

  // Hàm `fetchSanPham` để lấy danh sách sản phẩm từ API
  const fetchSanPham = async () => {
    try {
      // Nếu `danhMucDuocChon` có giá trị, gọi API lấy sản phẩm thuộc danh mục đó, ngược lại lấy tất cả sản phẩm
      const url = danhMucDuocChon
        ? `${process.env.REACT_APP_BASEURL}/api/products?danhsachsanpham_id=${danhMucDuocChon}`
        : `${process.env.REACT_APP_BASEURL}/api/products`;
      const response = await axios.get(url);
      setSanPham(response.data); // Lưu danh sách sản phẩm vào state `sanPham`
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };

  // Pagination logic (Xử lý phân trang)
  // Tính vị trí sản phẩm cuối cùng trên trang hiện tại
  const indexOfLastProduct = trangHienTai * sanPhamMoiTrang;
  
  // Tính vị trí sản phẩm đầu tiên trên trang hiện tại
  const indexOfFirstProduct = indexOfLastProduct - sanPhamMoiTrang;
  
  // Lấy danh sách sản phẩm hiển thị trên trang hiện tại
  const sanPhamHienTai = sanPham.slice(indexOfFirstProduct, indexOfLastProduct);
  
  // Tính tổng số trang
  const tongSoTrang = Math.ceil(sanPham.length / sanPhamMoiTrang);
  
  // Hàm `thayDoiTrang` để thay đổi trang hiện tại
  const thayDoiTrang = (soTrang) => setTrangHienTai(soTrang);

    // Hàm lấy tên danh mục dựa trên id
    const layTenDanhMuc = (idDanhMuc) => {
      const danhMucTimDuoc = danhMuc.find(dm => dm.id === idDanhMuc);
      return danhMucTimDuoc ? danhMucTimDuoc.name : 'Không rõ';
    };
  return (
    <div>
      <HeaderUsers />

      {/* Page Header */}
      <div className="container-fluid page-header py-5">
        <h1 className="text-center text-white display-6">Shop</h1>
        {/* <ol className="breadcrumb justify-content-center mb-0">
          <li className="breadcrumb-item"><Link to="/">Home</Link></li>
          <li className="breadcrumb-item active text-white">Shop</li>
        </ol> */}
      </div>

      {/* Shop Section */}
      <div className="container-fluid fruite py-5">
        <div className="container py-5">
          <h1 className="mb-4">Cửa hàng trái cây tươi</h1>
          <div className="d-flex justify-content-end mb-4">
            <div className="bg-light ps-3 py-3 rounded d-flex align-items-center">
              <label htmlFor="fruits" className="me-2">Sắp xếp theo danh mục:</label>
              <select
                id="fruits"
                className="border-0 form-select-sm bg-light"
                value={danhMucDuocChon} // Giá trị danh mục đang được chọn
                onChange={(e) => setDanhMucDuocChon(e.target.value)} // Cập nhật `danhMucDuocChon` khi người dùng chọn danh mục mới
              >
                <option value="">Tất cả danh mục</option>
                {danhMuc.map((dm) => (
                  <option key={dm.id} value={dm.id}>
                    {dm.name}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Danh sách sản phâm */}
          <div className="row g-4">
            {sanPhamHienTai.map((sp) => (
              <div key={sp.id} className="col-md-6 col-lg-4 col-xl-3 d-flex">
                <div className="rounded position-relative fruite-item card h-100 w-100">
                  <div className="fruite-img card-img-top">
                    <Link to={`/shop/${sp.id}`}>
                      <img
                        src={`${process.env.REACT_APP_BASEURL}/storage/${sp.hinhanh}`}
                        className="img-fluid w-100 rounded-top"
                        alt={sp.tieude}
                        style={{ height: 250, objectFit: 'cover' }}
                      />
                    </Link>
                    {/* Kiểm tra trạng thái Hết hàng và hiển thị thông báo */}
                    {sp.trangthai === 'Hết hàng' && (
                      <div
                        className="position-absolute top-50 start-50 translate-middle d-flex align-items-center justify-content-center bg-dark bg-opacity-50"
                        style={{ zIndex: 1, padding: '5px 10px', borderRadius: '5px' }}
                      >
                        <span className="text-white small fw-bold">Hết hàng</span>
                      </div>
                    )}
                  </div>
                  <div className="text-white bg-secondary px-3 py-1 rounded position-absolute" style={{ top: 10, left: 10 }}>
                  {layTenDanhMuc(sp.danhsachsanpham_id)}
                  </div>
                  <div className="card-body d-flex flex-column rounded-bottom">
                    <h4 className="card-title">{sp.tieude}</h4>
                    <div className="d-flex justify-content-between mt-auto">
                       <p className="text-dark fs-5 fw-bold mb-0">{sp.giatien} vnđ /{sp.don_vi_tinh}</p>
                      {/* Ẩn nút Thêm vào giỏ nếu sản phẩm hết hàng */}
                      {sp.trangthai !== 'Hết hàng' && (
                        <button
                          onClick={() => addToCart(sp)}
                          className="btn border border-secondary rounded-pill px-3 text-primary"
                        >
                          <i className="fa fa-shopping-bag me-2 text-primary" />
                          Thêm vào giỏ
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Phân trang */}
          <div className="d-flex justify-content-center mt-5">
            <nav aria-label="Page navigation">
              <ul className="pagination pagination-sm m-0">
                    {/* Các nút phân trang */}
                <li className={`page-item ${trangHienTai === 1 ? 'disabled' : ''}`}>
                  <button className="page-link" onClick={() => thayDoiTrang(1)}>«</button>
                </li>
                <li className={`page-item ${trangHienTai === 1 ? 'disabled' : ''}`}>
                  <button className="page-link" onClick={() => thayDoiTrang(trangHienTai - 1)}>‹</button>
                </li>
                {[...Array(tongSoTrang)].map((_, i) => (
                  <li key={i} className={`page-item ${trangHienTai === i + 1 ? 'active' : ''}`}>
                    <button className="page-link" onClick={() => thayDoiTrang(i + 1)}>
                      {i + 1}
                    </button>
                  </li>
                ))}
                <li className={`page-item ${trangHienTai === tongSoTrang ? 'disabled' : ''}`}>
                  <button className="page-link" onClick={() => thayDoiTrang(trangHienTai + 1)}>›</button>
                </li>
                <li className={`page-item ${trangHienTai === tongSoTrang ? 'disabled' : ''}`}>
                  <button className="page-link" onClick={() => thayDoiTrang(tongSoTrang)}>»</button>
                </li>
              </ul>
            </nav>
          </div>
        </div>
      </div>

      <Footerusers />
      <ToastContainer />
    </div>
  );
};

export default Cuahang;
