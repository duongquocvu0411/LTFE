import React, { useContext, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom"; // Import useParams để lấy tham số từ URL
import Footerusers from "../Footerusers";
import HeaderUsers from "../HeaderUsers";
import { CartContext } from "./CartContext";

const ChiTietSanPham = () => {
  const { id } = useParams(); // Lấy ID sản phẩm từ URL
  const [sanPham, setSanPham] = useState(null); // State lưu trữ thông tin sản phẩm
  const { addToCart } = useContext(CartContext); // Hàm thêm sản phẩm vào giỏ hàng từ context

  useEffect(() => {
    // Hàm gọi API lấy thông tin sản phẩm
    const layThongTinSanPham = async () => {
      try {
        const response = await fetch(`http://127.0.0.1:8000/api/products/${id}`); // Thay bằng URL API của bạn
        const data = await response.json();
        setSanPham(data); // Lưu thông tin sản phẩm vào state
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
          <ol className="breadcrumb justify-content-center mb-0">
            <li className="breadcrumb-item"><a href="#">Trang Chủ</a></li>
            <li className="breadcrumb-item"><a href="#">Trang</a></li>
            <li className="breadcrumb-item active text-white">Chi Tiết Sản Phẩm</li>
          </ol>
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
                      <a href="#">
                        <img src={`http://127.0.0.1:8000/storage/${sanPham.image}`} className="img-fluid rounded" alt={sanPham.title} /> {/* Dùng ảnh sản phẩm */}
                      </a>
                    </div>
                  </div>
                  <div className="col-lg-6">
                    <h4 className="fw-bold mb-3">{sanPham.name}</h4>
                    <p className="mb-3">Danh Mục: {sanPham.category}</p>
                    <h5 className="fw-bold mb-3">{sanPham.price} $</h5>
                    <div className="d-flex mb-4">
                      {[...Array(5)].map((_, index) => (
                        <i key={index} className={`fa fa-star ${index < sanPham.rating ? 'text-secondary' : ''}`} />
                      ))}
                    </div>
                    <p className="mb-4">{sanPham.description}</p>
                    
                    <button
                      onClick={() => addToCart(sanPham)}
                      className="btn border border-secondary rounded-pill px-3 text-primary">
                      <i className="fa fa-shopping-bag me-2 text-primary" /> Thêm vào giỏ hàng
                    </button>
                  </div>
                  <Link to="/shop" className="btn btn-primary">Trở về</Link>
                  {/* Thêm phần còn lại của code cho đánh giá và thông tin khác ở đây... */}
                </div>
              </div>

              {/* Thêm phần sidebar hoặc sản phẩm nổi bật như trước... */}
            </div>
          </div>
        </div>
        {/* Chi Tiết Sản Phẩm End */}
        <Footerusers />
      </div>
    </>
  );
}

export default ChiTietSanPham;
