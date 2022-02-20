import React from 'react';
import PropTypes from 'prop-types';

import { BackgroundCard } from '../common/containers';
import { Button, Header } from '../common/text';

const Total = ({ price, onBuy }) => {
  const totalData = {
    header: <Header size={3}>Total Price: {price}$</Header>,
    body: (
      <>
        <Button
          className="btn-light text-primary"
          style={{ width: '100%' }}
          onClick={onBuy}
        >
          Buy
        </Button>
      </>
    ),
  };
  return (
    <BackgroundCard
      data={totalData}
      className="text-white bg-primary"
      style={{ marginLeft: '5%' }}
    />
  );
};

Total.propTypes = {
  price: PropTypes.number,
  onBuy: PropTypes.func,
};

export default Total;
