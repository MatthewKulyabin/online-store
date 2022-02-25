import React from 'react';
import PropTypes from 'prop-types';

const Card = ({ className, children, ...rest }) => {
  const getDivClasses = () =>
    (className &&
      (className[0] === '-' ? `card${className}` : `card ${className}`)) ||
    'card';
  return (
    <div className={getDivClasses()} {...rest}>
      {children}
    </div>
  );
};

Card.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]),
  className: PropTypes.string,
};

export default Card;
