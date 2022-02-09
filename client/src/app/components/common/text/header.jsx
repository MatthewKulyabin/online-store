import React from 'react';
import PropTypes from 'prop-types';

const Header = ({ children, className = '', size, ...rest }) => {
  const getHeader = () => {
    switch (size) {
      case 1:
        return <h1>{children}</h1>;
      case 2:
        return <h2>{children}</h2>;
      case 3:
        return <h3>{children}</h3>;
      case 4:
        return <h4>{children}</h4>;
      case 5:
        return <h5>{children}</h5>;
      case 6:
        return <h6>{children}</h6>;

      default:
        return <h1>{children}</h1>;
    }
  };
  return getHeader();
};

Header.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]),
  className: PropTypes.string,
  size: PropTypes.number,
};

export default Header;
