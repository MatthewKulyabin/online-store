import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

import { getCurrentUserData } from '../../store/user';
import { Dropdown, Image } from '../common/containers';
import { Button, Text } from '../common/text';

const NavProfile = () => {
  const currentUser = useSelector(getCurrentUserData());
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen((prev) => !prev);
  };

  if (!currentUser) return 'Loading...';

  return (
    <Dropdown>
      <Button
        className="dropdown-toggle d-flex align-items-center"
        onClick={toggleMenu}
      >
        <Text className="me-2 text-primary">{currentUser.name}</Text>
        <Image
          src={currentUser.image}
          alt="avatar"
          height={40}
          className="img-responsive rounded-circle"
        />
      </Button>
      <Dropdown className={`-menu w-100 ${isOpen ? 'show' : ''}`}>
        <Link to={`/user/${currentUser._id}`} className="dropdown-item">
          Profile
        </Link>
        <Link to="/logout" className="dropdown-item">
          Log Out
        </Link>
      </Dropdown>
    </Dropdown>
  );
};

export default NavProfile;
