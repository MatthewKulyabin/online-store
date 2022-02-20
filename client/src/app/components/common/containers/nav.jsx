import React from 'react';
import PropTypes from 'prop-types';

const Nav = ({ children, className = '', ...rest }) => {
  const getNavClasses = () =>
    className[0] === '-' ? `nav${className}` : `nav ${className}`;
  return (
    <nav className={getNavClasses()} {...rest}>
      {children}
    </nav>
  );
};

Nav.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]),
  className: PropTypes.string,
};

export default Nav;
