import React from 'react';
import Sidebar from './../Sidebar';
import Header from '../Header';
import Footer from '../Footer';


const Dashboard = () => {
  return (
    <>
    <div>
    <Header/>
        <div className="d-flex">
          <Sidebar/>
          
          <div className="flex-grow-1 p-4">
            <h2> Hello admin </h2>
        </div>
      </div>
      <Footer/>
      </div>
      

    </>
  );
};

export default Dashboard;
