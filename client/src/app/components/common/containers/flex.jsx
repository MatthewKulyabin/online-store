import React from 'react';
import PropTypes from 'prop-types';

const Flex = ({ className, children, ...rest }) => {
  const getDivClasses = () =>
    (className &&
      (className[0] === '-' ? `flex${className}` : `d-flex ${className}`)) ||
    'd-flex';
  return (
    <div className={getDivClasses()} {...rest}>
      {children}
    </div>
  );
};

Flex.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]),
  className: PropTypes.string,
};

export default Flex;
