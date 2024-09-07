import React from 'react';
import Header from './../Header';
import Footer from './../Footer';
import Sidebar from '../Sidebar';


const Profile2 = () => {
  return (
    <>
    <div>
    <Header/>
        <div className="d-flex">
          
        <Sidebar/>
          <div className="flex-grow-1 p-4">
            <p>ncjkashcuhaskjc</p>
        </div>
      </div>
      <Footer/>
      </div>
      

      <div className="container">
          <h1>Profile Page</h1>
          <p>side2</p>
        </div>
    
    </>
  );
};

export default Profile2;
