import React from 'react';

import { useParams } from 'react-router';
import { useProduct } from '../../../hooks/useProduct';
import Product from '../../ui/product/product';

const ProductPage = () => {
  const params = useParams();
  const productId = params.id;

  const { getProduct } = useProduct();

  const product = getProduct(productId);

  return <Product {...{ product }} imageStyle={{ height: '100%' }} />;
};

export default ProductPage;
