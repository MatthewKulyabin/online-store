import React from 'react';
import PropTypes from 'prop-types';

import Product from './product';

const ProductList = ({ products }) => {
  return (
    <div style={{ marginRight: '5%', width: '100%' }}>
      {products.map((product) => (
        <Product key={product._id} {...{ product }} />
      ))}
    </div>
  );
};

ProductList.propTypes = {
  products: PropTypes.array,
};

export default ProductList;
