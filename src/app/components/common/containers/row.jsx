import React from 'react';
import PropTypes from 'prop-types';

const Row = ({ children, className }) => {
  const getDivClasses = () => `row ${className}`;
  return <div className={getDivClasses()}>{children}</div>;
};

Row.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]),
  className: PropTypes.string,
};

export default Row;
