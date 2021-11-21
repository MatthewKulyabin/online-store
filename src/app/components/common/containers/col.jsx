import React from 'react';
import PropTypes from 'prop-types';

const Col = ({ className, children }) => {
  const getDivClasses = () => `col${className}`;
  return <div className={getDivClasses()}>{children}</div>;
};

Col.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]),
  className: PropTypes.string,
};

export default Col;
