import React from 'react';
import PropTypes from 'prop-types';

import Loader from '../../common/loader';
import { Col, Image } from '../../common/containers';
import { Table } from '../../common/table';
import { Text } from '../../common/text';
import Edit from '../../common/icons/edit';
import Delete from '../../common/icons/delete';
import { useSelector } from 'react-redux';
import { getProductState } from '../../../store/product';
import { getCategoryState } from '../../../store/category';

const AdminTable = ({ choseProductId, onChoseId }) => {
  const { entities: products, isLoading: isLoadingP } = useSelector(
    getProductState()
  );
  const { entities: categories } = useSelector(getCategoryState());

  const columns = {
    _id: {
      path: '_id',
      name: '_id',
      component: (product) => (
        <Text className={choseProductId === product._id ? 'text-primary' : ''}>
          {product._id}
        </Text>
      ),
    },
    name: {
      path: 'name',
      name: 'Name',
      component: (product) => <Text>{product.name}</Text>,
    },
    category: {
      path: 'categoryId',
      name: 'Category',
      component: (product) => (
        <Text>{categories.find((c) => c._id === product.categoryId).name}</Text>
      ),
    },
    price: {
      path: 'price',
      name: 'Price',
      component: (product) => <Text>{product.price}</Text>,
    },
    publish_date: {
      path: 'publish_date',
      name: 'Publish date',
      component: (product) => (
        <Text>{new Date(product.publish_date).toString()}</Text>
      ),
    },
    count: {
      path: 'count',
      name: 'Count',
      component: (product) => <Text>{product.count}</Text>,
    },
    photo: {
      path: 'photo',
      name: 'Photo',
      component: (product) => (
        <Image
          src={product.photo}
          className="img-fluid rounded-start"
          alt="..."
          width={100}
        />
      ),
    },
    actions: {
      name: 'Actions',
      component: (product) => (
        <>
          <Edit
            size="28px"
            onClick={(event) => onChoseId(event, product._id)}
          />
          <Delete
            size="28px"
            onClick={(event) => onChoseId(event, product._id)}
          />
        </>
      ),
    },
  };

  return (
    (!isLoadingP && (
      <Col className="-md-8">
        <Table
          className="table-bordered border-primary"
          style={{ width: '100%', marginLeft: '5%', marginRight: '5%' }}
          columns={columns}
          data={products}
        ></Table>
      </Col>
    )) || <Loader />
  );
};

AdminTable.propTypes = {
  choseProductId: PropTypes.string,
  onChoseId: PropTypes.func,
};

export default AdminTable;
