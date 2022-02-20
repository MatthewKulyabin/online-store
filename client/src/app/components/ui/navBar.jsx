import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router';
import { useSelector } from 'react-redux';

import Nav from '../common/containers/nav';
import { Anchor } from '../common/text';
import configFile from '../../config.json';
import { getUserState } from '../../store/user';
import NavProfile from './navProfile';

const NavBar = () => {
  const location = useLocation();
  const [active, setActive] = useState(location.pathname);
  const { auth: isLoggedIn } = useSelector(getUserState());

  useEffect(() => {
    setActive(location.pathname);
  }, [location.pathname, active]);

  const getAnchorClasses = (path) =>
    'd-flex flex-sm-fill nav-link align-items-center justify-content-center' +
    (active === path ? ' active' : '');

  return (
    <Nav
      className="nav-pills flex-column flex-sm-row"
      style={{ marginBottom: '2%' }}
    >
      {configFile.navPaths.map((path, idx) => {
        if (!isLoggedIn && path[0] === 'Account') {
          return null;
        }
        if (isLoggedIn && path[0] === 'Account') {
          return <NavProfile key={idx} />;
        }
        if (isLoggedIn && path[0] === 'Login/SignUp') {
          return null;
        }
        return (
          <Anchor key={idx} to={path[1]} className={getAnchorClasses(path[1])}>
            {path[0]}
          </Anchor>
        );
      })}
    </Nav>
  );
};

export default NavBar;
