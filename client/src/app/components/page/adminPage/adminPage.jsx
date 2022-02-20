import React, { useState } from 'react';
import { useDispatch } from 'react-redux';

import AdminForm from './adminForm';
import AdminTable from './adminTable';
import { Row } from '../../common/containers';
import { deleteProduct } from '../../../store/product';

const AdminPage = () => {
  const dispatch = useDispatch();

  const [choseProductId, setChoseProductId] = useState();
  const [choseId, setChoseId] = useState();

  const handleChoseId = (event, productId) => {
    const targetType = event.target.dataset.type;
    if (targetType === 'edit') {
      // Cancel chosed product
      if (choseProductId === productId) {
        setChoseProductId();
        setChoseId();
        return;
      }
      setChoseProductId(productId);
      setChoseId(productId);
    }

    targetType === 'delete' && dispatch(deleteProduct(productId));
  };

  return (
    <Row className="gutters-sm">
      <AdminForm {...{ choseId }} />
      <AdminTable {...{ choseProductId }} onChoseId={handleChoseId} />
    </Row>
  );
};

export default AdminPage;
