import React from 'react';
import PropTypes from 'prop-types';

const Edit = ({ size, onClick }) => {
  return (
    <i
      data-type="edit"
      className="bi bi-pen"
      style={{ fontSize: size, cursor: 'pointer' }}
      {...{ onClick }}
    ></i>
  );
};

Edit.propTypes = {
  size: PropTypes.string,
  height: PropTypes.string,
  onClick: PropTypes.func,
};

export default Edit;
