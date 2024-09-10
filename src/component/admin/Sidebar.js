import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Sidebar = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);

  const handleToggle = () => {
    setIsCollapsed(!isCollapsed);
  };

  return (
    <>
      <div 
        className={`d-flex flex-column bg-dark ${isCollapsed ? 'collapsed' : ''}`} 
        style={{
          width: isCollapsed ? '80px' : '250px', 
          height: '86.5vh',
          height: '88.4vh',

          overflowY: 'auto',  // Enable vertical scrolling
          overflowX: 'hidden', // Disable horizontal scroll
          transition: 'width 0.3s',
          paddingRight: isCollapsed ? '0' : '10px',  // Optional: slight padding adjustment
        }}
      >
        {/* Sidebar Header */}
        <div className="sidebar-header p-4 text-white d-flex justify-content-between align-items-cente r">
          <h4 className={`m-0 ${isCollapsed ? 'd-none' : ''}`}>AdminLTE</h4>
          <button className="btn btn-dark" onClick={handleToggle}>
            <i className={`fas ${isCollapsed ? 'fa-chevron-right' : 'fa-chevron-left'}`}></i>
          </button>
        </div>

        {/* Sidebar Menu */}
        <ul className="nav flex-column list-unstyled components" style={{ marginRight: '-10px' }}>
          <li className="nav-item p-3">
            <Link to="/admin/Dashboard" className="nav-link text-white d-flex align-items-center">
              <i className="fas fa-home"></i>
              <span className={`ms-3 ${isCollapsed ? 'd-none' : ''}`}>Home</span>
            </Link>
          </li>
          <li className="nav-item p-3">
            <Link to="/admin/profile" className="nav-link text-white d-flex align-items-center">
              <i className="fas fa-user"></i>
              <span className={`ms-3 ${isCollapsed ? 'd-none' : ''}`}>Profile</span>
            </Link>
          </li>   <li className="nav-item p-3">
            <Link to="/admin/profile2" className="nav-link text-white d-flex align-items-center">
              <i className="fas fa-user"></i>
              <span className={`ms-3 ${isCollapsed ? 'd-none' : ''}`}>Profile2</span>
            </Link>
          </li> 
            <li className="nav-item p-3">
            <Link to="/admin/profile3" className="nav-link text-white d-flex align-items-center">
              <i className="fas fa-user"></i>
              <span className={`ms-3 ${isCollapsed ? 'd-none' : ''}`}>Profile3</span>
            </Link>
         </li>
          {/* Add more items if needed */}
        </ul>
      </div>
    </>
  );
};

export default Sidebar;
