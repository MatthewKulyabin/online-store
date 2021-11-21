import React from 'react';

const Loader = () => {
  return (
    <div
      className="spinner-border text-primary"
      role="status"
      style={{ position: 'absolute', left: '50%', top: '50%' }}
    >
      <span className="visually-hidden">Loading...</span>
    </div>
  );
};

export default Loader;
