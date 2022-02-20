import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

import { getCurrentUserData } from '../../store/user';

const NavProfile = () => {
  const currentUser = useSelector(getCurrentUserData());
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen((prev) => !prev);
  };

  if (!currentUser) return 'Loading...';

  return (
    <div className="dropdown">
      <div
        className="btn dropdown-toggle d-flex align-items-center"
        onClick={toggleMenu}
      >
        <div className="me-2 text-primary">{currentUser.name}</div>
        <img
          src={currentUser.image}
          alt="avatar"
          height={40}
          className="img-responsive rounded-circle"
        />
      </div>
      <div className={`w-100 dropdown-menu ${isOpen ? 'show' : ''}`}>
        <Link to={`/user/${currentUser._id}`} className="dropdown-item">
          Profile
        </Link>
        <Link to="/logout" className="dropdown-item">
          Log Out
        </Link>
      </div>
    </div>
  );
};

export default NavProfile;
