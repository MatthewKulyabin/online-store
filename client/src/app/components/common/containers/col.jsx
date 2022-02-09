import React from 'react';
import PropTypes from 'prop-types';

const Col = ({ className, children, ...rest }) => {
  const getDivClasses = () =>
    (className &&
      (className[0] === '-' ? `col${className}` : `col ${className}`)) ||
    'col';
  return (
    <div className={getDivClasses()} {...rest}>
      {children}
    </div>
  );
};

Col.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]),
  className: PropTypes.string,
};

export default Col;
