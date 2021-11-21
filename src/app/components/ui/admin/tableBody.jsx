import React from 'react';
import PropTypes from 'prop-types';

import Delete from '../../common/icons/delete';
import Edit from '../../common/icons/edit';
import { useCategory } from '../../../hooks/useCategory';
import { useProduct } from '../../../hooks/useProduct';
import { useState } from 'react/cjs/react.development';

const TableBody = ({ onChoseId }) => {
  const [choseProductId, setChoseProductId] = useState();
  const { products, deleteProduct } = useProduct();
  const { getCategory } = useCategory();

  const handleClick = (event, productId) => {
    const targetType = event.target.dataset.type;
    if (targetType === 'edit') {
      // Cancel chosed product
      if (choseProductId === productId) {
        setChoseProductId();
        onChoseId();
        return;
      }
      setChoseProductId(productId);
      onChoseId(productId);
    }

    targetType === 'delete' && deleteProduct(productId);
  };

  return (
    <tbody>
      {products.map((product) => (
        <tr key={product._id}>
          <th
            scope="row"
            className={
              (product._id === choseProductId && 'bg-primary text-white') || ''
            }
          >
            {product._id}
          </th>
          <td>{product.name}</td>
          <td>{getCategory(product.categoryId).name}</td>
          <td>{product.price}</td>
          <td>{product.count}</td>
          <td>
            <img
              src={product.photo}
              className="img-fluid rounded-start"
              alt="..."
              width={100}
            />
          </td>
          <td>
            <Edit
              width="30px"
              onClick={(event) => handleClick(event, product._id)}
            />
            <Delete
              width="30px"
              onClick={(event) => handleClick(event, product._id)}
            />
          </td>
        </tr>
      ))}
    </tbody>
  );
};

TableBody.propTypes = {
  products: PropTypes.array,
  categories: PropTypes.array,
  choseId: PropTypes.number,
  onChoseId: PropTypes.func,
};

export default TableBody;
