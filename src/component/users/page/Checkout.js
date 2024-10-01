import React, { useContext, useEffect, useState } from "react";
import Footerusers from "../Footerusers";
import HeaderUsers from "../HeaderUsers";
import { CartContext } from "./CartContext";
import { Link } from "react-router-dom";

const Checkout= () => {
  
  const[thanhpho,setThanhpho] = useState("");
  const { giohang } = useContext(CartContext);
  const [sdt,setSdt]= useState('');

 const handleInput = (e) => {
  const newSdt = e.target.value.replace(/[^0-9]/g,'');
  setSdt(newSdt);
 }

 // chọn thành phố
 const handleChonthanhpho = (e) => {

  setThanhpho(e.target.value);
 };
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
      <li className="breadcrumb-item"><Link to="/">Home</Link></li>
      <li className="breadcrumb-item"><Link to="/">Pages</Link></li>
      <li className="breadcrumb-item active text-white">Checkout</li>
    </ol>
  </div>
  {/* Single Page Header End */}
  {/* Checkout Page Start */}
  <div className="container-fluid py-5">
    <div className="container py-5">
      <h1 className="mb-4">Billing details</h1>
      <form >
        <div className="row g-5">
          <div className="col-md-12 col-lg-6 col-xl-7">
            <div className="row">
              <div className="col-md-12 col-lg-6">
                <div className="form-item w-100">
                  <label className="form-label my-3">First Name<sup>*</sup></label>
                  <input type="text" className="form-control" required />
                </div>
              </div>
              <div className="col-md-12 col-lg-6">
                <div className="form-item w-100">
                  <label className="form-label my-3">Last Name<sup>*</sup></label>
                  <input type="text" className="form-control" required/>
                </div>
              </div>
            </div>
            <div className="form-item">
              <label className="form-label my-3">Address <sup>*</sup></label>
              <input type="text" className="form-control" placeholder="House Number Street Name" />
            </div>
            <div className="form-item">
              <label className="form-label my-3">Town/City<sup>*</sup></label>
              <select className="form-control" value={thanhpho} onChange={handleChonthanhpho} required>
                    <option value="" disabled>Select your town/city</option>
                    <option value="Hà Nội">Hà Nội</option>
                    <option value="Hồ Chí Minh">Hồ Chí Minh</option>
                    <option value="Đà Nẵng">Đà Nẵng</option>
                    <option value="Hải Phòng">Hải Phòng</option>
                    <option value="Cần Thơ">Cần Thơ</option>
                    <option value="An Giang">An Giang</option>
                    <option value="Bà Rịa - Vũng Tàu">Bà Rịa - Vũng Tàu</option>
                    <option value="Bắc Giang">Bắc Giang</option>
                    <option value="Bắc Kạn">Bắc Kạn</option>
                    <option value="Bạc Liêu">Bạc Liêu</option>
                    <option value="Bắc Ninh">Bắc Ninh</option>
                    <option value="Bến Tre">Bến Tre</option>
                    <option value="Bình Định">Bình Định</option>
                    <option value="Bình Dương">Bình Dương</option>
                    <option value="Bình Phước">Bình Phước</option>
                    <option value="Bình Thuận">Bình Thuận</option>
                    <option value="Cà Mau">Cà Mau</option>
                    <option value="Cao Bằng">Cao Bằng</option>
                    <option value="Đắk Lắk">Đắk Lắk</option>
                    <option value="Đắk Nông">Đắk Nông</option>
                    <option value="Điện Biên">Điện Biên</option>
                    <option value="Đồng Nai">Đồng Nai</option>
                    <option value="Đồng Tháp">Đồng Tháp</option>
                    <option value="Gia Lai">Gia Lai</option>
                    <option value="Hà Giang">Hà Giang</option>
                    <option value="Hà Nam">Hà Nam</option>
                    <option value="Hà Tĩnh">Hà Tĩnh</option>
                    <option value="Hải Dương">Hải Dương</option>
                    <option value="Hậu Giang">Hậu Giang</option>
                    <option value="Hòa Bình">Hòa Bình</option>
                    <option value="Hưng Yên">Hưng Yên</option>
                    <option value="Khánh Hòa">Khánh Hòa</option>
                    <option value="Kiên Giang">Kiên Giang</option>
                    <option value="Kon Tum">Kon Tum</option>
                    <option value="Lai Châu">Lai Châu</option>
                    <option value="Lâm Đồng">Lâm Đồng</option>
                    <option value="Lạng Sơn">Lạng Sơn</option>
                    <option value="Lào Cai">Lào Cai</option>
                    <option value="Long An">Long An</option>
                    <option value="Nam Định">Nam Định</option>
                    <option value="Nghệ An">Nghệ An</option>
                    <option value="Ninh Bình">Ninh Bình</option>
                    <option value="Ninh Thuận">Ninh Thuận</option>
                    <option value="Phú Thọ">Phú Thọ</option>
                    <option value="Quảng Bình">Quảng Bình</option>
                    <option value="Quảng Nam">Quảng Nam</option>
                    <option value="Quảng Ngãi">Quảng Ngãi</option>
                    <option value="Quảng Ninh">Quảng Ninh</option>
                    <option value="Quảng Trị">Quảng Trị</option>
                    <option value="Sóc Trăng">Sóc Trăng</option>
                    <option value="Sơn La">Sơn La</option>
                    <option value="Tây Ninh">Tây Ninh</option>
              </select>
            </div>
            <div className="form-item">
              <label className="form-label my-3">Mobile<sup>*</sup></label>
              <input type="tel" className="form-control" value={sdt} onInput={handleInput} placeholder="nhập số điện thoại của bạn vào đây " required />

            </div>
            <div className="form-item">
              <label className="form-label my-3">Email Address<sup>*</sup></label>
              <input type="email" className="form-control" required />
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
                        <td className="py-5">{sanPham.soLuong}</td>
                        <td className="py-5">${sanPham.price * sanPham.soLuong}</td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="5" className="text-center">Giỏ hàng của bạn trống</td>
                    </tr>
                  )}
                  <tr>
                    <td colSpan="4" className="text-right fw-bold">Tổng cộng:</td>
                    <td className="py-5">$ <b>{tongTienGioHang}</b></td>
                  </tr>
                </tbody>

              </table>
            </div>
            <div className="row g-4 text-center align-items-center justify-content-center pt-4">
              <button type="submit" className="btn border-secondary py-3 px-4 text-uppercase w-100 text-primary">Place Order</button>
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
