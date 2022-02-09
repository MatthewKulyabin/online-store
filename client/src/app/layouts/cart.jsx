import React, { useEffect } from 'react';

import { ProductList } from '../components/ui/product';
import Search from '../components/ui/search';
import Total from '../components/ui/total';
import { Col, Row } from '../components/common/containers';
import { useCart } from '../hooks/useCart';
import { Anchor, Header } from '../components/common/text';
import Pagination from '../components/common/pagination';
import { usePagination } from '../hooks/usePagination';

const Cart = () => {
  const { finalCartList, getCartPrice, searchCart } = useCart();
  const { paginatedData, paginate, pagesCount, updatePage, page } =
    usePagination();

  useEffect(() => {
    paginate(finalCartList, 3);
  }, [finalCartList, page]);

  const handlePageUpdate = (page) => {
    updatePage(page);
  };

  return (
    (finalCartList.length && (
      <>
        <Search onSearch={searchCart} />
        <Row className="g-0">
          <Col className="-sm-6 col-md-8">
            <ProductList products={paginatedData} />
          </Col>
          <Col className="col-6 col-md-4">
            <Total price={getCartPrice()} />
          </Col>
        </Row>
        <Pagination
          {...{ pagesCount, currentPage: page, onClick: handlePageUpdate }}
        />
      </>
    )) || (
      <Header size={5}>
        There is no products in cart yet. Go to{' '}
        <Anchor to="/">Main page</Anchor> and choose ones
      </Header>
    )
  );
};

export default Cart;
