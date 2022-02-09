import React from 'react';
import PropTypes from 'prop-types';

const Container = ({ children, className, ...rest }) => {
  const getDivClasses = () =>
    className ? `container ${className}` : 'container';
  return (
    <div className={getDivClasses()} {...rest}>
      {children}
    </div>
  );
};

Container.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]),
  className: PropTypes.string,
};

export default Container;
