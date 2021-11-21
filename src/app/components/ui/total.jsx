import React from 'react';

const Total = () => {
  return (
    <div className="card text-white bg-primary" style={{ marginLeft: '5%' }}>
      <div className="card-header">
        <h3>Total Price: </h3>
      </div>
      <div className="card-body">
        <button
          className="btn btn-light text-primary"
          style={{ width: '100%' }}
        >
          Buy
        </button>
      </div>
    </div>
  );
};

export default Total;
