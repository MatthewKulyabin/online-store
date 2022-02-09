import React from 'react';
import PropTypes from 'prop-types';

import { BackgroundCard } from '../common/containers';
import { Button, Header } from '../common/text';

const Total = ({ price }) => {
  const totalData = {
    header: <Header size={3}>Total Price: {price}$</Header>,
    body: (
      <>
        <Button className="btn-light text-primary" style={{ width: '100%' }}>
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
};

export default Total;
