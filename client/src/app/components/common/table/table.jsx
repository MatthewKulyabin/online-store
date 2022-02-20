import React from 'react';
import PropTypes from 'prop-types';

import { TableHead } from '.';
import TableBody from './tableBody';

const Table = ({ columns, data, children, className, ...rest }) => {
  const getDivClasses = () => `table ${className}`;
  return (
    <table className={getDivClasses()} {...rest}>
      {children || (
        <>
          <TableHead {...{ columns }} />
          <TableBody {...{ columns, data }} />
        </>
      )}
    </table>
  );
};

Table.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]),
  className: PropTypes.string,
  columns: PropTypes.object,
  data: PropTypes.array,
};

export default Table;
