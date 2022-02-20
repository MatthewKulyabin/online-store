import React, { useState } from 'react';
import PropTypes from 'prop-types';
import BtnGroup from '../common/containers/btnGroup';
import Arrow from '../common/icons/arrow';
import { useDispatch } from 'react-redux';
import { sortProducts } from '../../store/product';

const Sort = ({ data }) => {
  const dispatch = useDispatch();

  const [order, setOrder] = useState('Asc');

  const handleTransferData = () => {
    const newData = data
      .map((item) => {
        return {
          text: item[0].toUpperCase() + item.slice(1),
          icon: '',
        };
      })
      .filter((item) => {
        return (
          item.text.toLowerCase().indexOf('id') === -1 &&
          item.text.toLowerCase().indexOf('photo') === -1 &&
          item.text.toLowerCase().indexOf('__v') === -1 &&
          item
        );
      });
    newData.push({
      text: order,
      icon:
        order === 'Asc' ? <Arrow direction="up" /> : <Arrow direction="down" />,
    });
    return newData;
  };

  const handleChooseSort = (item) => {
    if (item === 'Asc') {
      setOrder('Desc');
      return;
    }
    if (item === 'Desc') {
      setOrder('Asc');
      return;
    }
    order === 'Asc'
      ? dispatch(sortProducts(item, 'asc'))
      : dispatch(sortProducts(item, 'desc'));
  };

  return (
    <>
      <BtnGroup
        label="Sort"
        data={handleTransferData()}
        onClick={handleChooseSort}
      />
    </>
  );
};

Sort.propTypes = {
  data: PropTypes.array,
};

export default Sort;
