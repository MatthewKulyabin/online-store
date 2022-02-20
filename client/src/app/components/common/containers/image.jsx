import React from 'react';
import PropTypes from 'prop-types';

const Image = ({ className, ...rest }) => {
  const getImgClasses = () =>
    className && className[0] === '-'
      ? `img${className}`
      : `img ${className}` || 'img';
  return <img className={getImgClasses()} alt="..." {...rest} />;
};

Image.propTypes = {
  className: PropTypes.string,
};

export default Image;
