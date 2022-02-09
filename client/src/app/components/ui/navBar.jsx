import React from 'react';
import { useLocation } from 'react-router';
import { useEffect, useState } from 'react/cjs/react.development';

import Nav from '../common/containers/nav';
import { Anchor } from '../common/text';
import configFile from '../../config.json';

const NavBar = () => {
  const location = useLocation();
  const [active, setActive] = useState(location.pathname);

  useEffect(() => {
    setActive(location.pathname);
  }, [location.pathname, active]);

  const getAnchorClasses = (path) =>
    'flex-sm-fill text-sm-center nav-link' + (active === path ? ' active' : '');

  return (
    <Nav
      className="nav-pills flex-column flex-sm-row"
      style={{ marginBottom: '2%' }}
    >
      {configFile.navPaths.map((path, idx) => (
        <Anchor key={idx} to={path[1]} className={getAnchorClasses(path[1])}>
          {path[0]}
        </Anchor>
      ))}
    </Nav>
  );
};

export default NavBar;
