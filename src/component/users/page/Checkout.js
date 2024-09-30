import React, { useContext, useEffect, useState } from "react";
import Footerusers from "../Footerusers";
import axios from "axios";
import HeaderUsers from "../HeaderUsers";
import { CartContext } from "./CartContext";

const Checkout= () => {
  
  const [thanhpho, setThanhpho] = useState([]);
  const { giohang } = useContext(CartContext);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Fetch data from API
    const fetchCities = async () => {
      try {
        const response = await axios.get("https://esgoo.net/api-tinhthanh/1/0.htm");
        
        // Kiểm tra dữ liệu trả về
        console.log(response.data);

        // Đặt dữ liệu từ response.data.data vào state
        if (response.data && Array.isArray(response.data.data)) {
          setThanhpho(response.data.data);
        } else {
          console.error("Dữ liệu không phải là mảng.");
        }
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };
    fetchCities();
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  // Tính tổng giá trị của giỏ hàng
  const tongTienGioHang = giohang.reduce((tong, item) => tong + item.price * item.soLuong, 0);
return (
    
    <>
    
       <div>
       <HeaderUsers/>

  {/* Modal Search End */}
  {/* Single Page Header start */}
  <div className="container-fluid page-header py-5">
    <h1 className="text-center text-white display-6">Checkout</h1>
    <ol className="breadcrumb justify-content-center mb-0">
      <li className="breadcrumb-item"><a href="#">Home</a></li>
      <li className="breadcrumb-item"><a href="#">Pages</a></li>
      <li className="breadcrumb-item active text-white">Checkout</li>
    </ol>
  </div>
  {/* Single Page Header End */}
  {/* Checkout Page Start */}
  <div className="container-fluid py-5">
    <div className="container py-5">
      <h1 className="mb-4">Billing details</h1>
      <form action="#">
        <div className="row g-5">
          <div className="col-md-12 col-lg-6 col-xl-7">
            <div className="row">
              <div className="col-md-12 col-lg-6">
                <div className="form-item w-100">
                  <label className="form-label my-3">First Name<sup>*</sup></label>
                  <input type="text" className="form-control" />
                </div>
              </div>
              <div className="col-md-12 col-lg-6">
                <div className="form-item w-100">
                  <label className="form-label my-3">Last Name<sup>*</sup></label>
                  <input type="text" className="form-control" />
                </div>
              </div>
            </div>
            <div className="form-item">
              <label className="form-label my-3">Address <sup>*</sup></label>
              <input type="text" className="form-control" placeholder="House Number Street Name" />
            </div>
            <div className="form-item">
      <label className="form-label my-3">Town/City<sup>*</sup></label>
      <select className="form-control">
        <option value="" disabled selected>Select your town/city</option>
        {thanhpho.length > 0 ? (
          thanhpho.map((city) => (
            <option key={city.id} value={city.id}>
              {city.name}
            </option>
          ))
        ) : (
          <option value="" disabled>No cities available</option>
        )}
      </select>
    </div>
            <div className="form-item">
              <label className="form-label my-3">Mobile<sup>*</sup></label>
              <input type="tel" className="form-control" />
            </div>
            <div className="form-item">
              <label className="form-label my-3">Email Address<sup>*</sup></label>
              <input type="email" className="form-control" />
            </div>
            
            <hr />
            
            <div className="form-item">
              <textarea name="text" className="form-control" spellCheck="false" cols={30} rows={11} placeholder="Oreder Notes (Optional)" defaultValue={""} />
            </div>
          </div>
          {/* product */}
          <div className="col-md-12 col-lg-6 col-xl-5">
            <div className="table-responsive">
              <table className="table">
                <thead>
                  <tr>
                    <th scope="col">Products</th>
                    <th scope="col">Name</th>
                    <th scope="col">Price</th>
                    <th scope="col">Quantity</th>
                    <th scope="col">Total</th>
                  </tr>
                </thead>
                <tbody>
                        {giohang && giohang.length > 0 ? (
                          giohang.map((sanPham, index) => (
                            <tr key={index}>
                              <th scope="row">
                                <div className="d-flex align-items-center mt-2">
                                  <img
                                    src={`http://127.0.0.1:8000/storage/${sanPham.image}`}
                                    className="img-fluid rounded-circle"
                                    style={{ width: 90, height: 90 }}
                                    alt={sanPham.title}
                                  />
                                </div>
                              </th>
                              <td className="py-5">{sanPham.title}</td>
                              <td className="py-5">${sanPham.price}</td>
                              <td className="py-5">{sanPham.soLuong}</td> {/* Hiển thị số lượng */}
                              <td className="py-5">${sanPham.price * sanPham.soLuong}</td> {/* Tính tổng */}
                            </tr>
                          ))
                        ) : (
                          <tr>
                            <td colSpan="5" className="text-center">Giỏ hàng của bạn trống</td>
                          </tr>
                        )}
                        <tr>
                          <td colSpan="4" className="text-right fw-bold">Tổng cộng:</td>
                          <td className="py-5">$ <b>{tongTienGioHang}</b></td> {/* Hiển thị tổng giá trị giỏ hàng */}
                        </tr>
                      </tbody>
              </table>
            </div>
            <div className="row g-4 text-center align-items-center justify-content-center pt-4">
              <button type="button" className="btn border-secondary py-3 px-4 text-uppercase w-100 text-primary">Place Order</button>
            </div>
          </div>
        </div>
      </form>
    </div>
  </div>
  {/* Checkout Page End */}
  <Footerusers/>
</div>


    </>
)
}
export default Checkout;
