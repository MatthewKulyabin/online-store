import React from 'react';
import PropTypes from 'prop-types';

const Text = ({ children, className = '', ...rest }) => {
  return (
    <span className={className} {...rest}>
      {children}
    </span>
  );
};

Text.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]),
  className: PropTypes.string,
};

export default Text;
