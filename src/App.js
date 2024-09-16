import { BrowserRouter as Router, Route, Routes } from "react-router-dom";



import Dashboard from './component/admin/page/Dashboard';

import Profile2 from './component/admin/page/Profile2';
import Profile3 from './component/admin/page/Profile3';
import HomeUsers from './component/users/page/HomeUsers';
import Shop from './component/users/page/Shop';
import Checkout from './component/users/page/Checkout';
import Shopdetail from './component/users/page/Shopdetail';
import Cart from './component/users/page/cart';
import Testimonial from './component/users/page/Testimonial';
import ErrorPage from './component/users/page/ErrorPage';
import ProfileAdmin from "./component/admin/page/ProfileAdmin";
import Sanpham from './component/admin/page/Sanpham';
import Product from "./component/api";


function App() {
  
  return (
     

    <>
      {/* Wrap your app with BrowserRouter */}
      <Router>
        {/* Your Routes go here */}
        <Routes>
          {/* start admin */}
          <Route path="/admin/Dashboard" element={<Dashboard />} />
          <Route path="/admin/profile" element={<Sanpham />} />
          <Route path="/admin/profile2" element={<Profile2 />} />
          <Route path="/admin/profile3" element={<Profile3 />} />
          <Route path="/admin/ProfileAdmin" element={<ProfileAdmin/>}/>
          {/* end admin */}
          <Route path="/" element={<HomeUsers />} />
          <Route path="/shop" element={<Shop />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/shop-detail" element={<Shopdetail/>}/>
          <Route path="/cart" element={<Cart/>}/>
          <Route path="/Testimonial" element={<Testimonial/>}/>
          <Route path="/page404" element={<ErrorPage/>}/>
          <Route path="/hi" element={<Product/>}/>
        </Routes>
      </Router>
    </>
  );
}

export default App;
