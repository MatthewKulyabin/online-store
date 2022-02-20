import React from 'react';
import PropTypes from 'prop-types';

const Arrow = ({ direction }) => {
  return <i className={`bi bi-arrow-${direction}-short`}></i>;
};

Arrow.propTypes = {
  direction: PropTypes.string,
};

export default Arrow;
