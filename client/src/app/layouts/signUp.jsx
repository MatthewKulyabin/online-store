import React from 'react';

import Joi from 'joi';
import FormComponent, { TextField } from '../components/common/form';
import { Col, Row } from '../components/common/containers';
import { Button, Paragraph, Anchor } from '../components/common/text';
import { createUser } from '../store/user';
import { useDispatch } from 'react-redux';

const SignUp = () => {
  const dispatch = useDispatch();

  const validatorConfig = Joi.object({
    name: Joi.string().min(3).required(),
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
    repeatPassword: Joi.required()
      .valid(Joi.ref('password'))
      .error((error) => {
        error[0].message = `"Password Repeat" should match with password`;
        return error;
      }),
  });

  const handleSubmit = (data) => {
    delete data.repeatPassword;
    dispatch(createUser(data));
  };

  return (
    <Row className="justify-content-center">
      <Col className="-md-4 mb-3">
        <FormComponent
          validatorConfig={validatorConfig}
          onSubmit={handleSubmit}
          defaultData={{
            name: '',
            email: '',
            password: '',
          }}
        >
          <TextField name="name" label="Name" autoFocus />
          <TextField name="email" label="Email" autoFocus />
          <TextField name="password" label="Password" type="password" />
          <TextField
            name="repeatPassword"
            label="Repeat Password"
            type="password"
          />
          <Button
            className="btn-primary"
            style={{ width: '100%' }}
            type="submit"
          >
            Login
          </Button>
          <Paragraph className="mt-3">
            Already Have an Account?
            <Anchor to="/login"> Login</Anchor>
          </Paragraph>
        </FormComponent>
      </Col>
    </Row>
  );
};

export default SignUp;
