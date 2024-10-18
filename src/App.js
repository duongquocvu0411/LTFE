import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import ProfileAdmin from "./component/admin/page/ProfileAdmin";
import Sanpham from './component/admin/page/Sanpham';

import { CartProvider } from "./component/users/page/CartContext";
import ProtectedRoute from './component/routerbaove/ProtectedRoute';
import LoginAdmin from "./component/admin/page/LoginAdmin";
import DiaChiChiTiet from "./component/admin/page/DiaChiChiTiet";
import LienHe from "./component/users/page/LienHe";
import LienHeAdmin from "./component/admin/page/LienHeAdmin";
import Khachhangs from "./component/admin/page/Khachhang";
import Tracuu from "./component/users/page/Tracuu";

import Giohang from "./component/users/page/Giohang";
import Thanhtoan from "./component/users/page/Thanhtoan";
import Cuahang from "./component/users/page/Cuahang";
import TrangchuNguoidung from "./component/users/page/TrangchuNguoidung";
import Trangloi from "./component/users/page/Trangloi";
import CuahangChitiet from "./component/users/page/CuahangChitiet";
import Gioithieu from "./component/users/page/Gioithieu";
import TrangChuAdmin from "./component/admin/page/TrangchuAdmin";
import Danhmucsanpham from "./component/admin/page/Danhmucsanpham";
function App() {
  return (

    <div >

      <CartProvider> 

        <Router>
          <Routes>

            {/* Admin Routes */}
            <Route path="/admin/login" element={<ProtectedRoute congkhai={true}><LoginAdmin /></ProtectedRoute>} />


            <Route
              path="/admin/diachichitiet"
              element={
                <ProtectedRoute>
                  <DiaChiChiTiet />
                </ProtectedRoute>
              }
            />
            <Route
              path="/admin/sanpham"
              element={
                <ProtectedRoute>
                  <Sanpham />
                </ProtectedRoute>
              }
            />
            <Route
              path="/admin/ProfileAdmin"
              element={
                <ProtectedRoute>
                  <ProfileAdmin />
                </ProtectedRoute>
              }
            />
            <Route
              path="/admin/danhmucsanpham"
              element={
                <ProtectedRoute>
                  <Danhmucsanpham />
                </ProtectedRoute>
              }
            />
            <Route
              path="/admin/lienhe"
              element={
                <ProtectedRoute>
                  <LienHeAdmin />
                </ProtectedRoute>
              }
            />
            <Route
              path="/admin/khachhang"
              element={
                <ProtectedRoute>
                  <Khachhangs />
                </ProtectedRoute>
              }
            />

             <Route
              path="/admin/Trangchu"
              element={
                <ProtectedRoute>
                  <TrangChuAdmin />
                </ProtectedRoute>
              }
            />

            {/* Router người dùng */}
            <Route path="/" element={<TrangchuNguoidung />} />
            <Route path="/shop" element={<Cuahang />} />
            <Route path="/checkout" element={<Thanhtoan />} />
            <Route path="/shop/:id" element={<CuahangChitiet />} />
            <Route path="/cart" element={<Giohang />} />
            <Route path="/Testimonial" element={<Gioithieu />} />
            <Route path="/page404" element={<Trangloi />} />
            <Route path="/lienhe" element={<LienHe />} />
            <Route path="/tracuu" element={<Tracuu />} />

            {/* chuyển người dùng đến trang ErrorPage nếu dùng đường truyền router sai */}
            <Route path="*" element={<Trangloi />} />
          </Routes>
        </Router>
      </CartProvider>
    </div>
  );
}

export default App;
