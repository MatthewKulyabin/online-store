import React from 'react';
import PropTypes from 'prop-types';
import Joi from 'joi';

import TextAreaField from '../../common/form/textAreaField';
import { Button, Header } from '../../common/text';
import FormComponent from '../../common/form';
import { useDispatch } from 'react-redux';
import { createComment } from '../../../store/comment';
import { createMessage } from '../../../store/message';

const AddCommentForm = ({ productId, message, chosedDialog }) => {
  const dispatch = useDispatch();

  const validatorConfig = Joi.object({
    text: Joi.string().required(),
  });

  const handleSubmit = (data) => {
    !message && dispatch(createComment({ ...data, productId }));
    message && dispatch(createMessage({ ...data, receiverId: chosedDialog }));
  };

  return (
    <>
      <Header size={2}>New comment</Header>
      <FormComponent
        onSubmit={handleSubmit}
        validatorConfig={validatorConfig}
        defaultData={{ text: '' }}
      >
        <TextAreaField name="text" label="Comment" />
        <Button className="btn btn-primary" type="submit">
          Send
        </Button>
      </FormComponent>
    </>
  );
};
AddCommentForm.propTypes = {
  productId: PropTypes.string,
  message: PropTypes.bool,
  chosedDialog: PropTypes.string,
};

export default AddCommentForm;
