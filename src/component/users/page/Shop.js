import React, { useContext, useEffect, useState } from "react";
import Footerusers from "../Footerusers";
import axios from "axios";
import HeaderUsers from "../HeaderUsers";
import { CartContext } from "./CartContext";
import { Link } from "react-router-dom";

const Shop = () => {
  const [danhMuc, setDanhMuc] = useState([]);
  const [sanPham, setSanPham] = useState([]);
  const [danhMucDuocChon, setDanhMucDuocChon] = useState("");
  const { addToCart } = useContext(CartContext);

  // Pagination
  const [trangHienTai, setTrangHienTai] = useState(1);
  const sanPhamMoiTrang = 8;

  // Fetch categories and products
  useEffect(() => {
    fetchDanhMuc();
    fetchSanPham();
  }, [danhMucDuocChon]);

  const fetchDanhMuc = async () => {
    try {
      const response = await axios.get('http://127.0.0.1:8000/api/danhsachsanpham');
      setDanhMuc(response.data);
    } catch (error) {
      console.error('Error fetching categories:', error);
    }
  };

  const fetchSanPham = async () => {
    try {
      const url = danhMucDuocChon
        ? `http://127.0.0.1:8000/api/products?danhsachsanpham_id=${danhMucDuocChon}`
        : 'http://127.0.0.1:8000/api/products';
      const response = await axios.get(url);
      setSanPham(response.data);
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };

  // Pagination logic
  const indexOfLastProduct = trangHienTai * sanPhamMoiTrang;
  const indexOfFirstProduct = indexOfLastProduct - sanPhamMoiTrang;
  const sanPhamHienTai = sanPham.slice(indexOfFirstProduct, indexOfLastProduct);
  const tongSoTrang = Math.ceil(sanPham.length / sanPhamMoiTrang);
  const thayDoiTrang = (soTrang) => setTrangHienTai(soTrang);

  return (
    <div>
      <HeaderUsers />

      {/* Page Header */}
      <div className="container-fluid page-header py-5">
        <h1 className="text-center text-white display-6">Shop</h1>
        <ol className="breadcrumb justify-content-center mb-0">
          <li className="breadcrumb-item"><Link to="/">Home</Link></li>
          <li className="breadcrumb-item active text-white">Shop</li>
        </ol>
      </div>

      {/* Shop Section */}
      <div className="container-fluid fruite py-5">
        <div className="container py-5">
          <h1 className="mb-4">Fresh Fruits Shop</h1>
          <div className="d-flex justify-content-end mb-4">
            <div className="bg-light ps-3 py-3 rounded d-flex align-items-center">
              <label htmlFor="fruits" className="me-2">Sort by category:</label>
              <select
                id="fruits"
                className="border-0 form-select-sm bg-light"
                value={danhMucDuocChon}
                onChange={(e) => setDanhMucDuocChon(e.target.value)}
              >
                <option value="">All Categories</option>
                {danhMuc.map((dm) => (
                  <option key={dm.id} value={dm.id}>
                    {dm.name}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Product List */}
          <div className="row g-4">
            {sanPhamHienTai.map((sp) => (
              <div key={sp.id} className="col-md-6 col-lg-4 col-xl-3 d-flex">
                <div className="rounded position-relative fruite-item card h-100 w-100">
                  <div className="fruite-img card-img-top">
                    <Link to={`/shop/${sp.id}`}>
                      <img
                        src={`http://127.0.0.1:8000/storage/${sp.image}`}
                        className="img-fluid w-100 rounded-top"
                        alt={sp.title}
                        style={{ height: 250, objectFit: 'cover' }}
                      />
                    </Link>
                    {/* Kiểm tra trạng thái Hết hàng */}
                      {sp.status === 'Hết hàng' && (
                        <div
                          className="position-absolute top-50 start-50 translate-middle d-flex align-items-center justify-content-center bg-dark bg-opacity-50"
                          style={{ zIndex: 1, padding: '5px 10px', borderRadius: '5px' }}
                        >
                          <span className="text-white small fw-bold">Hết hàng</span>
                        </div>
                      )}
                  </div>
                  <div className="text-white bg-secondary px-3 py-1 rounded position-absolute" style={{ top: 10, left: 10 }}>
                    Fruits
                  </div>
                  <div className="card-body d-flex flex-column rounded-bottom">
                    <h4>{sp.title}</h4>
                    <div className="d-flex justify-content-between">
                      <p className="text-dark fs-5 fw-bold mb-0">{sp.price} vnđ / kg</p>
                      {/* Ẩn nút Thêm vào giỏ nếu sản phẩm hết hàng */}
                {sp.status !== 'Hết hàng' && (
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

          {/* Pagination */}
          <div className="d-flex justify-content-center mt-5">
            <nav aria-label="Page navigation">
              <ul className="pagination">
                <li className={`page-item ${trangHienTai === 1 ? 'disabled' : ''}`}>
                  <button className="page-link" onClick={() => thayDoiTrang(trangHienTai - 1)}>«</button>
                </li>
                {[...Array(tongSoTrang)].map((_, i) => (
                  <li key={i} className={`page-item ${trangHienTai === i + 1 ? 'active' : ''}`}>
                    <button className="page-link" onClick={() => thayDoiTrang(i + 1)}>
                      {i + 1}
                    </button>
                  </li>
                ))}
                <li className={`page-item ${trangHienTai === tongSoTrang ? 'disabled' : ''}`}>
                  <button className="page-link" onClick={() => thayDoiTrang(trangHienTai + 1)}>»</button>
                </li>
              </ul>
            </nav>
          </div>
        </div>
      </div>

      <Footerusers />
    </div>
  );
};

export default Shop;
