import React from 'react';
import PropTypes from 'prop-types';

const Container = ({ children, className }) => {
  const getDivClasses = () => `container ${className}`;
  return <div className={getDivClasses()}>{children}</div>;
};

Container.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]),
  className: PropTypes.string,
};

export default Container;
