import React, { useCallback, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { changeJoiErrorMessage } from '../../../core/utils';
import { useSelector } from 'react-redux';
import { getUserAuthStatus } from '../../../store/user';

const FormComponent = ({
  defaultData,
  children,
  onSubmit,
  validatorConfig,
}) => {
  const [data, setData] = useState({});
  const [errors, setErrors] = useState({});

  const authError = useSelector(getUserAuthStatus());

  useEffect(() => {
    if (authError?.login) {
      setErrors({
        email: authError.login,
        password: authError.login,
      });
    }
    if (authError?.signUp) {
      setErrors({ email: authError.signUp });
    }
  }, [authError]);

  useEffect(() => {
    setData(defaultData || {});
  }, [defaultData]);

  useEffect(() => {
    if (Object.keys(data).length > 0) {
      validate(data);
    }
  }, [data]);

  const validate = useCallback(
    (data) => {
      const errors = {};

      const validation = validatorConfig.validate(data, {
        abortEarly: false,
      }).error;
      validation &&
        validation.details.map(
          (err) =>
            (errors[err.path] = changeJoiErrorMessage(err.message, err.path))
        );
      setErrors(errors);
      return Object.keys(errors).length === 0;
    },
    [validatorConfig, setErrors]
  );

  const handleChange = useCallback(
    (target) => {
      setData((prev) => ({
        ...prev,
        [target.name]: target.value,
      }));
    },
    [setData]
  );

  const handleSubmit = (e) => {
    e.preventDefault();
    const isValid = validate();
    if (!isValid) return;
    onSubmit(data);
  };

  const handleKeyDown = useCallback((e) => {
    if (e.keyCode === 13) {
      e.preventDefault();
      const form = e.target.form;
      const indexField = Array.prototype.indexOf.call(form, e.target);
      form.elements[indexField + 1].focus();
    }
  }, []);

  const clonedElements = React.Children.map(children, (child) => {
    const childType = typeof child.type;
    let config = {};

    if (childType === 'object') {
      if (!child.props.name) {
        throw new Error(
          'Name property is required for field components',
          child
        );
      }

      config = {
        ...child.props,
        onChange: handleChange,
        value: data[child.props.name],
        error: errors[child.props.name],
        onKeyDown: handleKeyDown,
      };
    }
    if (childType === 'function') {
      if (child.props.type === 'submit') {
        config = { ...child.props, disabled: Object.keys(errors).length };
      }
    }

    return React.cloneElement(child, config);
  });

  return <form onSubmit={handleSubmit}>{clonedElements}</form>;
};

FormComponent.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]),
  onSubmit: PropTypes.func,
  defaultData: PropTypes.object,
  validatorConfig: PropTypes.object,
};

export default FormComponent;
