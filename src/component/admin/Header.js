import React from 'react';

const Header = () => {
  return (
    <nav className="navbar navbar-expand navbar-light bg-light h-25">
      <a className="navbar-brand" href="/">AdminLTE</a>
      <ul className="navbar-nav ml-auto">
        <li className="nav-item">
          <a className="nav-link" href="/profile">Profile</a>
        </li>
      </ul>
    </nav>
  );
};

export default Header;
