import React, { useState } from 'react';
import PropTypes from 'prop-types';
import BtnGroup from '../common/containers/btnGroup';
import { useProduct } from '../../hooks/useProduct';
import Arrow from '../common/icons/arrow';

const Sort = ({ data }) => {
  const [order, setOrder] = useState('Asc');
  const { sortProducts } = useProduct();

  const handleTransferData = () => {
    const newData = data
      .map((item) => {
        return {
          text: item.toLowerCase(),
          icon: '',
        };
      })
      .filter((item) => {
        return (
          item.text.indexOf('id') === -1 &&
          item.text.indexOf('photo') === -1 &&
          item
        );
      })
      .map((item) => {
        item.text.indexOf('_') !== -1 &&
          (item.text = item.text
            .split('')
            .map((symbol) => (symbol === '_' && ' ') || symbol)
            .join(''));
        item.text = item.text[0].toUpperCase() + item.text.slice(1);
        return item;
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
    order === 'Asc' ? sortProducts(item, 'asc') : sortProducts(item, 'desc');
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
