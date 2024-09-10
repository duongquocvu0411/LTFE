import React from 'react';
import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <nav className="navbar navbar-expand navbar-light bg-light h-25">
      <Link className="navbar-brand" to="/admin/Dashboard">AdminLTE</Link>
      <ul className="navbar-nav ml-auto">
        <li className="nav-item">
          <Link className="nav-link" to="/admin/profile">Profile</Link>
        </li>
      </ul>
    </nav>
  );
};

export default Header;
