import React from 'react';
import PropTypes from 'prop-types';

const HideScrollbar = ({ children, className, ...rest }) => {
  const getDivClasses = () =>
    className ? `hide-scrollbar ${className}` : 'hide-scrollbar';
  return (
    <div className={getDivClasses()} {...rest}>
      {children}
    </div>
  );
};

HideScrollbar.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]),
  className: PropTypes.string,
};

export default HideScrollbar;
