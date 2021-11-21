import React from 'react';
import PropTypes from 'prop-types';

const Product = ({ product }) => {
  return (
    <div className="card mb-4">
      <div className="row g-0">
        <div className="col-md-4">
          <img
            src={product.photo}
            className="img-fluid rounded-start"
            alt="..."
            width={250}
          />
        </div>
        <div className="col-md-8 row">
          <div className="card-body">
            <h5 className="card-title">{product.name}</h5>
            <p className="card-text"></p>
            <p className="card-text">
              <small className="text-muted">Last updated 3 mins ago</small>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

Product.propTypes = {
  product: PropTypes.object,
};

export default Product;
