import React from 'react';
import PropTypes from 'prop-types';

const Margin = ({ className, children, ...rest }) => {
  const getDivClasses = () => (className ? `m${className}` : '');
  return (
    <div className={getDivClasses()} {...rest}>
      {children}
    </div>
  );
};

Margin.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]),
  className: PropTypes.string,
};

export default Margin;
