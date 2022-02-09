import React from 'react';

import Joi from 'joi';
import FormComponent, { TextField } from '../components/common/form';
import { Col, Row } from '../components/common/containers';
import { Button, Paragraph, Anchor } from '../components/common/text';

const Login = () => {
  const validatorConfig = Joi.object({
    login: Joi.string().min(5).max(35).required(),
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

  const handleSubmit = () => {
    console.log('submit');
  };

  return (
    <Row className="justify-content-center">
      <Col className="-md-4 mb-3">
        <FormComponent
          validatorConfig={validatorConfig}
          onSubmit={handleSubmit}
          defaultData={{ login: '', password: '' }}
        >
          <TextField name="login" label="Login" autoFocus />
          <TextField name="password" label="Password" />
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
