import React from 'react';
import PropTypes from 'prop-types';

import TableBody from './tableBody';
import Loader from '../../common/loader';
import { useProduct } from '../../../hooks/useProduct';
import { useCategory } from '../../../hooks/useCategory';
import { Col } from '../../common/containers';
import { Table, TableHead } from '../../common/table';
import configFile from '../../../config.json';

const AdminTable = ({ onChoseId }) => {
  const { isLoadingP } = useProduct();
  const { isLoadingC } = useCategory();

  return (
    (!isLoadingP && !isLoadingC && (
      <Col className="-md-8">
        <Table
          className="table-bordered border-primary"
          style={{ width: '100%', marginLeft: '5%', marginRight: '5%' }}
        >
          <TableHead data={configFile.tableHeadData} />
          <TableBody {...{ onChoseId }} />
        </Table>
      </Col>
    )) || <Loader />
  );
};

AdminTable.propTypes = {
  products: PropTypes.array,
  categories: PropTypes.array,
  choseId: PropTypes.number,
  onChoseId: PropTypes.func,
};

export default AdminTable;
