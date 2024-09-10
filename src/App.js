import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import Dashboard from "./component/admin/page/Dashboard";
import Profile from "./component/admin/page/Profile";

import Profile2 from "./component/admin/page/Profile2";
import Profile3 from './component/admin/page/Profile3';
import HeadersUsers from './component/users/HeaderUsers';

import Shop from "./component/users/Shop";
import Checkout from "./component/users/Checkout";
import Shopdetail from "./component/users/Shopdetail";
import Cart from "./component/users/cart";
import Testimonial from "./component/users/Testimonial";
import ErrorPage from "./component/users/ErrorPage";


function App() {
  
  return (
     

    <>
      {/* Wrap your app with BrowserRouter */}
      <Router>
        {/* Your Routes go here */}
        <Routes>
          <Route path="/admin/Dashboard" element={<Dashboard />} />
          <Route path="/admin/profile" element={<Profile />} />
          <Route path="/admin/profile2" element={<Profile2 />} />
          <Route path="/admin/profile3" element={<Profile3 />} />
          <Route path="/" element={<HeadersUsers />} />
          <Route path="/shop" element={<Shop />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/shop-detail" element={<Shopdetail/>}/>
          <Route path="/cart" element={<Cart/>}/>
          <Route path="/Testimonial" element={<Testimonial/>}/>
          <Route path="/page404" element={<ErrorPage/>}/>
        </Routes>
      </Router>
    </>
  );
}

export default App;
