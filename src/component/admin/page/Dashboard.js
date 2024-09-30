import React from 'react';
import Sidebar from './../Sidebar';
import Header from '../Header';
import Footer from '../Footer';



const Dashboard = () => {
  return (
    <>
    <div>
        <Header />
        <div className="d-flex">
          <Sidebar />
          <div className="container mt-4">
      <h2 className="mb-4">Báo cáo doanh thu và lợi nhuận</h2>
      <div className=' text-center '>
        <h1> Hello admin</h1>
      </div>
     
    </div>
        </div>
        <Footer />
      </div>
    </>
  );
};

export default Dashboard;
