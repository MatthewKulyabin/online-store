import React from 'react';

import Joi from 'joi';
import FormComponent, { TextField, SelectImageField } from '../../common/form';
import { Col, Row } from '../../common/containers';
import { Button } from '../../common/text';
import { useDispatch } from 'react-redux';
import BackHistoryButton from '../../common/backButton';
import { updateUser } from '../../../store/user';

const UserEditPage = () => {
  const dispatch = useDispatch();

  const validatorConfig = Joi.object({
    name: Joi.string().min(3).required(),
    photo: Joi.required(),
  });

  const handleSubmit = (data) => {
    dispatch(updateUser(data));
  };

  return (
    <Row className="justify-content-center">
      <Col className="-md-4 mb-3">
        <BackHistoryButton />
        <FormComponent
          validatorConfig={validatorConfig}
          onSubmit={handleSubmit}
          defaultData={{
            name: '',
          }}
        >
          <TextField name="name" label="Name" autoFocus />
          <SelectImageField name="photo" label="Photo" />
          <Button
            className="btn-primary"
            style={{ width: '100%' }}
            type="submit"
          >
            Edit
          </Button>
        </FormComponent>
      </Col>
    </Row>
  );
};

export default UserEditPage;
