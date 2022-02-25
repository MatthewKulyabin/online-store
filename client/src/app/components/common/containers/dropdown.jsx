import React from 'react';
import PropTypes from 'prop-types';

const Dropdown = ({ className, children, ...rest }) => {
  const getDivClasses = () =>
    (className &&
      (className[0] === '-'
        ? `dropdown${className}`
        : `dropdown ${className}`)) ||
    'dropdown';
  return (
    <div className={getDivClasses()} {...rest}>
      {children}
    </div>
  );
};

Dropdown.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]),
  className: PropTypes.string,
};

export default Dropdown;
