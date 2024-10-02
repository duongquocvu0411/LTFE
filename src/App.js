import { BrowserRouter as Router, Route, Routes } from "react-router-dom"; 
import Dashboard from './component/admin/page/Dashboard';
import HomeUsers from './component/users/page/HomeUsers';
import Shop from './component/users/page/Shop';
import Checkout from './component/users/page/Checkout';
import Shopdetail from './component/users/page/Shopdetail';
import Cart from './component/users/page/cart';
import ErrorPage from './component/users/page/ErrorPage';
import ProfileAdmin from "./component/admin/page/ProfileAdmin";
import Sanpham from './component/admin/page/Sanpham';
import Danhsachsanpham from './component/admin/page/Danhsachsanpham';
import Testimonial from "./component/users/page/Testimonial";
import { CartProvider } from "./component/users/page/CartContext";
import ProtectedRoute from './component/routerbaove/ProtectedRoute';
import LoginAdmin from "./component/admin/page/LoginAdmin";
import DiaChiChiTiet from "./component/admin/page/DiaChiChiTiet";
import LienHe from "./component/users/page/LienHe";
import LienHeAdmin from "./component/admin/page/LienHeAdmin";
function App() {
  return (
    <>
      {/* Wrap your app with CartProvider */}
      <CartProvider>
        {/* Wrap your app with BrowserRouter */}
        <Router>
          <Routes>
            {/* Admin Routes */}
            <Route path="/admin/Login" element={<LoginAdmin />} />
            <Route 
              path="/admin/Dashboard" 
              element={
                <ProtectedRoute>
                  <Dashboard />
                </ProtectedRoute>
              } 
            />
            <Route
              path="/admin/diachichitiet"
              element={
                <ProtectedRoute>
                  <DiaChiChiTiet/>
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
                  <Danhsachsanpham />
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
            {/* User Routes */}
            <Route path="/" element={<HomeUsers />} />
            <Route path="/shop" element={<Shop />} />
            <Route path="/checkout" element={<Checkout />} />
            <Route path="/shop-detail" element={<Shopdetail />} />
            <Route path="/shop/:id" element={<Shopdetail/>} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/Testimonial" element={<Testimonial />} />
            <Route path="/page404" element={<ErrorPage />} />
            <Route path="/lienhe" element={<LienHe/>}/>
            
            {/* Wildcard route for 404 */}
            <Route path="*" element={<ErrorPage />} />
          </Routes>
        </Router>
      </CartProvider>
    </>
  );
}

export default App;
