import React from 'react';
import PropTypes from 'prop-types';

const Button = ({ name, className, ...rest }) => {
  console.log('asdasdadsadsadsadsadsads');
  const getButtonClasses = () => `btn ${className}`;
  return (
    <button className={getButtonClasses()} {...rest}>
      {name}
    </button>
  );
};

Button.propTypes = {
  name: PropTypes.string,
  className: PropTypes.string,
};

export default Button;
