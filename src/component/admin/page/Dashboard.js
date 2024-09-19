import React from 'react';
import Sidebar from './../Sidebar';
import Header from '../Header';
import Footer from '../Footer';
import DanhThu from './Danhthu';


const Dashboard = () => {
  return (
    <>
    <div>
        <Header />
        <div className="d-flex">
          <Sidebar />
          <div className="flex-grow-1 p-4">
            {/* Chèn component DanhThus */}
            <DanhThu />
          </div>
        </div>
        <Footer />
      </div>
    </>
  );
};

export default Dashboard;
