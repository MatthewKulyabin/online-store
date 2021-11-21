import React from 'react';

import Loader from '../components/common/loader';
import Categories from '../components/ui/categories';
import { ProductList } from '../components/ui/product';
import Search from '../components/common/search';
import Sort from '../components/common/sort';
import { useProduct } from '../hooks/useProduct';
import { useCategory } from '../hooks/useCategory';
import { Col, Row } from '../components/common/containers';

const Main = () => {
  const { isLoadingP, products } = useProduct();
  const { isLoadingC, categories } = useCategory();

  return !isLoadingP && !isLoadingC ? (
    <>
      <Search />
      <Row>
        <Categories {...{ categories }} />
        <Col className="-md-8">
          <Sort />
          <ProductList {...{ products }} />
        </Col>
      </Row>
    </>
  ) : (
    <Loader />
  );
};

export default Main;
