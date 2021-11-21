import React, { useState } from 'react';

import AdminForm from '../components/ui/admin/adminForm';
import AdminTable from '../components/ui/admin/adminTable';
import { Row } from '../components/common/containers';

const Admin = () => {
  const [choseId, setChoseId] = useState();

  const handleChoseId = (id) => {
    setChoseId(id);
  };

  return (
    <Row className="gutters-sm">
      <AdminForm {...{ choseId }} />
      <AdminTable onChoseId={handleChoseId} />
    </Row>
  );
};

export default Admin;
