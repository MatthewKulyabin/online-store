import React from 'react';
import PropTypes from 'prop-types';

const BackGround = ({ children, className, ...rest }) => {
  const getDivClasses = () => (className ? `bg${className}` : 'bg');
  return (
    <div className={getDivClasses()} {...rest}>
      {children}
    </div>
  );
};

BackGround.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]),
  className: PropTypes.string,
};

export default BackGround;
