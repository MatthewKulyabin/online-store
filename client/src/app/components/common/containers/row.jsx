import React from 'react';
import PropTypes from 'prop-types';

const Row = ({ children, className, ...rest }) => {
  const getDivClasses = () => (className ? `row ${className}` : 'row');
  return (
    <div className={getDivClasses()} {...rest}>
      {children}
    </div>
  );
};

Row.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]),
  className: PropTypes.string,
};

export default Row;
