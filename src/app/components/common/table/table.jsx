import React from 'react';
import PropTypes from 'prop-types';

const Table = ({ children, className, ...rest }) => {
  const getDivClasses = () => `table ${className}`;
  return (
    <table className={getDivClasses()} {...rest}>
      {children}
    </table>
  );
};

Table.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]),
  className: PropTypes.string,
};

export default Table;
