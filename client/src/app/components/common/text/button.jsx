import React from 'react';
import PropTypes from 'prop-types';

const Button = ({ children, className, ...rest }) => {
  const getButtonClasses = () => (className ? `btn ${className}` : 'btn');

  return (
    <button className={getButtonClasses()} {...rest}>
      {children}
    </button>
  );
};

Button.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]),
  className: PropTypes.string,
};

export default Button;
