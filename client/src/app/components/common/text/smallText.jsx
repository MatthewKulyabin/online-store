import React from 'react';
import PropTypes from 'prop-types';

const SmallText = ({ children, className = '', ...rest }) => {
  return <small className={className}>{children}</small>;
};

SmallText.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]),
  className: PropTypes.string,
};

export default SmallText;
