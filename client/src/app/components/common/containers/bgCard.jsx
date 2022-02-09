import React from 'react';
import PropTypes from 'prop-types';

const BackgroundCard = ({ data, className = '', ...rest }) => {
  const getDivClasses = () =>
    className[0] === '-' ? `card${className}` : `card ${className}`;
  return (
    <div className={getDivClasses()} {...rest}>
      <div className="card-header">{data.header}</div>
      <div className="card-body">{data.body}</div>
    </div>
  );
};

BackgroundCard.propTypes = {
  data: PropTypes.object,
  className: PropTypes.string,
};

export default BackgroundCard;
