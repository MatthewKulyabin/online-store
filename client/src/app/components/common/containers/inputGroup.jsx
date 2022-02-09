import React from 'react';
import PropTypes from 'prop-types';

const InputGroup = ({ children, className, ...rest }) => {
  const getDivClasses = () =>
    (className &&
      (className[0] === '-'
        ? `input-group${className}`
        : `input-group ${className}`)) ||
    'input-group';

  return (
    <div className={getDivClasses()} {...rest}>
      {children}
    </div>
  );
};

InputGroup.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]),
  className: PropTypes.string,
};

export default InputGroup;
