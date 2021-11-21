import React from 'react';
import PropTypes from 'prop-types';

const TableHead = ({ data }) => {
  return (
    <thead>
      <tr>
        {data.map((item, idx) => (
          <th key={idx}>{item}</th>
        ))}
      </tr>
    </thead>
  );
};

TableHead.propTypes = {
  data: PropTypes.array,
};

export default TableHead;
