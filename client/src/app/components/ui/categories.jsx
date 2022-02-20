import React from 'react';
import PropTypes from 'prop-types';
import { Col, ListGroup } from '../common/containers';
import { useDispatch } from 'react-redux';
import { filterProducts } from '../../store/product';

const Categories = ({ categories }) => {
  const dispatch = useDispatch();

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
    dispatch(filterProducts(category._id));
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
