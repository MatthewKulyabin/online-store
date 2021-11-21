import React from 'react';
import PropTypes from 'prop-types';

const InputGroup = ({ children, className }) => {
  const getDivClasses = () =>
    className[0] === '-'
      ? `input-group${className}`
      : `input-group ${className}`;

  return <div className={getDivClasses()}>{children}</div>;
};

InputGroup.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]),
  className: PropTypes.string,
};

export default InputGroup;
