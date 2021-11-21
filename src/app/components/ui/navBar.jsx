import React from 'react';

import { Link } from 'react-router-dom';

const NavBar = () => {
  return (
    <nav
      className="nav nav-pills flex-column flex-sm-row"
      style={{ marginBottom: '2%' }}
    >
      <Link to="/" className="flex-sm-fill text-sm-center nav-link active">
        Main
      </Link>
      {/* <Link to="/cart" className="flex-sm-fill text-sm-center nav-link">
        Cart
      </Link> */}
      <Link to="/admin" className="flex-sm-fill text-sm-center nav-link">
        Admin
      </Link>
      <Link to="/login" className="flex-sm-fill text-sm-center nav-link">
        Login/SignUp
      </Link>
    </nav>
  );
};

export default NavBar;
