import React from 'react';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';

import { getCurrentUserData, getUserById } from '../../../store/user';
import { deleteMessage, getDialogMessages } from '../../../store/message';
import Comment from '../comments/comment';
import { Container, Flex } from '../../common/containers';

const Dialog = ({ chosedDialog }) => {
  const dispatch = useDispatch();

  const currentUser = useSelector(getCurrentUserData());
  const chosedUser = useSelector(getUserById(chosedDialog));
  const messages = useSelector(getDialogMessages(chosedUser._id));

  const handleDeleteMessage = (id) => {
    dispatch(deleteMessage(id));
  };

  return (
    <Container className="overflow-auto" style={{ height: 500 }}>
      {messages.map(
        (m) =>
          (m.receiverId === currentUser._id && (
            <Flex key={m._id} className="justify-content-start">
              <Comment
                content={m.text}
                userId={chosedUser._id}
                created_at={m.publish_date}
                _id={m._id}
                onRemove={() => console.log('Unauthorized')}
                message={true}
              />
            </Flex>
          )) || (
            <Flex key={m._id} className="justify-content-end">
              <Comment
                content={m.text}
                userId={currentUser._id}
                created_at={m.publish_date}
                _id={m._id}
                onRemove={(id) => handleDeleteMessage(id)}
                message={true}
              />
            </Flex>
          )
      )}
    </Container>
  );
};

Dialog.propTypes = {
  chosedDialog: PropTypes.string,
};

export default Dialog;
