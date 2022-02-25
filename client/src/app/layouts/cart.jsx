import React, { useEffect } from 'react';

import { ProductList } from '../components/ui/product';
import Search from '../components/ui/search';
import Total from '../components/ui/total';
import { Col, Row } from '../components/common/containers';
import { Anchor, Header } from '../components/common/text';
import Pagination from '../components/common/pagination';
import { usePagination } from '../hooks/usePagination';
import { useDispatch, useSelector } from 'react-redux';
import {
  deleteCart,
  getCartPrice,
  getCartState,
  searchCart,
} from '../store/cart';
import { getProductState, updateProduct } from '../store/product';

const Cart = () => {
  const dispatch = useDispatch();

  const cartPrice = useSelector(getCartPrice());

  const { entities: cart, searchedEntity: searchedCart } = useSelector(
    getCartState()
  );
  const { entities: products } = useSelector(getProductState());

  const { paginatedData, paginate, pagesCount, updatePage, page } =
    usePagination();

  useEffect(() => {
    if (searchedCart.length) {
      paginate(searchedCart, 3);
      return;
    }
    paginate(cart, 3);
  }, [cart, searchedCart, page]);

  const handlePageUpdate = (page) => {
    updatePage(page);
  };

  const handleBuy = () => {
    cart.forEach((c) => {
      let prevCount = products.find((p) => p._id === c._id).count;
      dispatch(deleteCart(c._id));
      dispatch(
        updateProduct(c._id, {
          count: --prevCount,
        })
      );
    });
  };

  return (
    (cart.length && (
      <>
        <Search onSearch={(text) => dispatch(searchCart(text))} />
        <Row className="g-0">
          <Col className="-sm-6 col-md-8">
            <ProductList products={paginatedData} />
          </Col>
          <Col className="col-6 col-md-4">
            <Total price={cartPrice} onBuy={handleBuy} />
          </Col>
        </Row>
        <Pagination
          {...{ pagesCount, currentPage: page, onClick: handlePageUpdate }}
        />
      </>
    )) || (
      <Header size={5}>
        There is no products in cart yet. Go to
        <Anchor to="/">Main page</Anchor> and choose ones
      </Header>
    )
  );
};

export default Cart;
