import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import Dashboard from "./component/admin/page/Dashboard";
import Profile from "./component/admin/page/Profile";

import Profile2 from "./component/admin/page/Profile2";
import Profile3 from './component/admin/page/Profile3';
import HeadersUsers from './component/users/HeaderUsers';

import Shop from "./component/users/Shop";
import Checkout from "./component/users/Checkout";

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
        </Routes>
      </Router>
    </>
  );
}

export default App;
