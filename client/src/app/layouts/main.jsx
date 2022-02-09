import React, { useEffect } from 'react';

import Loader from '../components/common/loader';
import Categories from '../components/ui/categories';
import { ProductList } from '../components/ui/product';
import Search from '../components/ui/search';
import Sort from '../components/ui/sort';
import { useProduct } from '../hooks/useProduct';
import { Col, Row } from '../components/common/containers';
import Pagination from '../components/common/pagination';
import { usePagination } from '../hooks/usePagination';
import { useSelector } from 'react-redux';
import { getCategoryState } from '../store/category';

const Main = () => {
  const { products, finalProductsList, searchProduct } = useProduct();
  const { entities: categories } = useSelector(getCategoryState());
  const { paginatedData, paginate, pagesCount, updatePage, page } =
    usePagination();

  useEffect(() => {
    paginate(finalProductsList, 3);
  }, [finalProductsList, page]);

  const handlePageUpdate = (page) => {
    updatePage(page);
  };

  return paginatedData.length ? (
    <>
      <Search onSearch={searchProduct} />
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
  ) : (
    <Loader />
  );
};

export default Main;
