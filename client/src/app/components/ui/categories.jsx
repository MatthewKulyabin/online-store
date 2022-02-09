import React from 'react';
import PropTypes from 'prop-types';
import { Col, ListGroup } from '../common/containers';
import { useProduct } from '../../hooks/useProduct';

const Categories = ({ categories }) => {
  const { filterProductsByCategory } = useProduct();

  const data = categories.map((category) => {
    const newCategory = {
      ...category,
      text: category.name,
    };
    delete newCategory.name;
    return newCategory;
  });

  data.push({ _id: '0', text: 'Show All' });

  const handleChooseCategory = (category) => {
    filterProductsByCategory(category._id);
  };
  return (
    <Col className="-md-4 mb-3">
      <ListGroup {...{ data, onClick: handleChooseCategory }} />
    </Col>
  );
};

Categories.propTypes = {
  categories: PropTypes.array,
};

export default Categories;
