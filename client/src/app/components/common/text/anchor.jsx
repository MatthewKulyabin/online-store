import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

const Anchor = ({ to, children, className = '', ...rest }) => {
  return (
    <Link to={to} className={className} {...rest}>
      {children}
    </Link>
  );
};

Anchor.propTypes = {
  to: PropTypes.oneOfType([PropTypes.object, PropTypes.string, PropTypes.func]),
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]),
  className: PropTypes.string,
};

export default Anchor;
