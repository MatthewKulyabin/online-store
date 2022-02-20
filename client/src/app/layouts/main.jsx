import React, { useEffect } from 'react';

import Loader from '../components/common/loader';
import Categories from '../components/ui/categories';
import { ProductList } from '../components/ui/product';
import Search from '../components/ui/search';
import Sort from '../components/ui/sort';
import { Col, Row } from '../components/common/containers';
import Pagination from '../components/common/pagination';
import { usePagination } from '../hooks/usePagination';
import { useDispatch, useSelector } from 'react-redux';
import { getCategoryState } from '../store/category';
import { getProductState, searchProduct } from '../store/product';
import { Header } from '../components/common/text';

const Main = () => {
  const dispatch = useDispatch();

  const {
    isLoading: isLoadingP,
    entities: products,
    filteredEntities: filteredProducts,
    sortedEntities: sortedProducts,
    searchedEntity: searchedProduct,
  } = useSelector(getProductState());
  const { entities: categories } = useSelector(getCategoryState());

  const { paginatedData, paginate, pagesCount, updatePage, page } =
    usePagination();

  useEffect(() => {
    if (searchedProduct.length) {
      paginate(searchedProduct, 3);
      return;
    }
    if (filteredProducts.length) {
      paginate(filteredProducts, 3);
      return;
    }
    if (sortedProducts.length) {
      paginate(sortedProducts, 3);
      return;
    }
    if (paginate) paginate(products, 3);
  }, [products, filteredProducts, sortedProducts, page, searchedProduct]);

  const handlePageUpdate = (page) => {
    updatePage(page);
  };

  return (
    (paginatedData.length && (
      <>
        <Search onSearch={(text) => dispatch(searchProduct(text))} />
        <Row>
          <Categories {...{ categories }} />
          <Col className="-md-8">
            <Sort label="Sort" data={Object.keys(products[0])} />
            <ProductList products={paginatedData} onClick={handlePageUpdate} />
            <Pagination
              {...{ pagesCount, currentPage: page, onClick: handlePageUpdate }}
            />
          </Col>
        </Row>
      </>
    )) ||
    (isLoadingP && <Loader />) || (
      <Header size={2}>There are no products yet</Header>
    )
  );
};

export default Main;
