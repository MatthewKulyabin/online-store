import React from 'react';

import { ProductList } from '../components/ui/product';
import Search from '../components/common/search';
import Total from '../components/ui/total';
import Loader from '../components/common/loader';
import { Col, Row } from '../components/common/containers';
import { useProduct } from '../hooks/useProduct';

const Cart = () => {
  const { products } = useProduct();

  return (
    (products && (
      <>
        <Search />
        <Row className="g-0">
          <Col className="-sm-6 col-md-8">
            <ProductList products={products} />
          </Col>
          <Col className="col-6 col-md-4">
            <Total />
          </Col>
        </Row>
      </>
    )) || <Loader />
  );
};

export default Cart;
