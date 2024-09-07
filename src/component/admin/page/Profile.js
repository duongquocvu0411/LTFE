import React from 'react';
import Sidebar from './../Sidebar';
import Footer from './../Footer';
import Header from './../Header';


const Profile = () => {
  return (
    <>
    <div>
    <Header/>
        <div className="d-flex">
          
          <Sidebar/>
          <div className="flex-grow-1 p-4">
            <div className="container">
                      <h1>Profile Page</h1>
                      <p>This is your profile page where you can view your information.</p>
            </div>
        </div>
      </div>
      <Footer/>
      </div>
      

      
    
    </>
  );
};

export default Profile;
