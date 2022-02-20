import React from 'react';

import { useHistory } from 'react-router';
import { Button } from './text';

const BackHistoryButton = () => {
  const history = useHistory();

  return (
    <Button className="btn-primary mb-5" onClick={() => history.goBack()}>
      <i className="bi bi-caret-left"></i>
      Back
    </Button>
  );
};

export default BackHistoryButton;
