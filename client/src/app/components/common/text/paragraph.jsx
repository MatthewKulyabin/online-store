import React from 'react';
import PropTypes from 'prop-types';

const Paragraph = ({ children, className, ...rest }) => {
  const getParagraphClasses = () => className || '';
  return (
    <p className={getParagraphClasses()} {...rest}>
      {children}
    </p>
  );
};

Paragraph.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]),
  className: PropTypes.string,
};

export default Paragraph;
