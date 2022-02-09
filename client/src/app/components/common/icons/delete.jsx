import React from 'react';
import PropTypes from 'prop-types';

const Delete = ({ size, onClick }) => {
  return (
    <i
      data-type="delete"
      className="bi bi-trash"
      style={{ fontSize: size, cursor: 'pointer' }}
      {...{ onClick }}
    ></i>
  );
};

Delete.propTypes = {
  size: PropTypes.string,
  onClick: PropTypes.func,
};

export default Delete;
