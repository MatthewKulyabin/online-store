import React from 'react';

import Joi from 'joi';
import FormComponent, { TextField } from '../components/common/form';
import { Col, Row } from '../components/common/containers';
import { Button, Paragraph, Anchor } from '../components/common/text';
import { useDispatch } from 'react-redux';
import { login } from '../store/user';

const Login = () => {
  const dispatch = useDispatch();

  const validatorConfig = Joi.object({
    email: Joi.string()
      .email({ tlds: { allow: false } })
      .required(),
    password: Joi.string()
      .pattern(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/)
      .required()
      .error((error) => {
        error[0].code === 'string.pattern.base' &&
          (error[0].message =
            '"password" should contain at least one capital letter, one digit, one !@#$%^&*');
        return error;
      }),
  });

  const handleSubmit = (data) => {
    dispatch(login(data));
  };

  return (
    <Row className="justify-content-center">
      <Col className="-md-4 mb-3">
        <FormComponent
          validatorConfig={validatorConfig}
          onSubmit={handleSubmit}
          defaultData={{ email: '', password: '' }}
        >
          <TextField name="email" label="Email" autoFocus />
          <TextField name="password" label="Password" type="password" />
          <Button
            className="btn-primary"
            style={{ width: '100%' }}
            type="submit"
          >
            Login
          </Button>
          <Paragraph className="mt-3">
            Do Not Have an Account?
            <Anchor to="/signup"> SignUp</Anchor>
          </Paragraph>
        </FormComponent>
      </Col>
    </Row>
  );
};

export default Login;
