import React from 'react';
import PropTypes from 'prop-types';

const TableHead = ({ columns }) => {
  return (
    <thead>
      <tr>
        {Object.keys(columns).map((column) => (
          <th key={column}>{columns[column].name}</th>
        ))}
      </tr>
    </thead>
  );
};

TableHead.propTypes = {
  columns: PropTypes.object,
};

export default TableHead;
