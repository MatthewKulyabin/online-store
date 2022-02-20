import React from 'react';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';

import { getCurrentUserData, getUserById } from '../../../store/user';
import { deleteMessage, getDialogMessages } from '../../../store/message';
import Comment from '../comments/comment';

const Dialog = ({ chosedDialog }) => {
  const dispatch = useDispatch();

  const currentUser = useSelector(getCurrentUserData());
  const chosedUser = useSelector(getUserById(chosedDialog));
  const messages = useSelector(getDialogMessages(chosedUser._id));

  const handleDeleteMessage = (id) => {
    dispatch(deleteMessage(id));
  };

  return (
    <div className="container overflow-auto" style={{ height: 500 }}>
      {messages.map(
        (m) =>
          (m.receiverId === currentUser._id && (
            <div key={m._id} className="d-flex justify-content-start">
              <Comment
                content={m.text}
                userId={chosedUser._id}
                created_at={m.publish_date}
                _id={m._id}
                onRemove={() => console.log('Unauthorized')}
                message={true}
              />
            </div>
          )) || (
            <div key={m._id} className="d-flex justify-content-end">
              <Comment
                content={m.text}
                userId={currentUser._id}
                created_at={m.publish_date}
                _id={m._id}
                onRemove={(id) => handleDeleteMessage(id)}
                message={true}
              />
            </div>
          )
      )}
    </div>
  );
  // return (
  //   (
  // <div className="container overflow-auto" style={{ height: 500 }}>
  // <div className="d-flex justify-content-start">
  //   <Comment
  //     content="Content"
  //     userId={users[0]._id}
  //     created_at={new Date().toString()}
  //     _id={new Date().toString()}
  //     onRemove={(data) => console.log(data)}
  //     message={true}
  //   />
  // </div>

  // <div className="d-flex justify-content-end">
  //   <Comment
  //     content="Content"
  //     userId={users[0]._id}
  //     created_at={new Date().toString()}
  //     _id={new Date().toString()}
  //     onRemove={(data) => console.log(data)}
  //     message={true}
  //   />
  // </div>
  //       <div className="d-flex justify-content-end">
  //         <Comment
  //           content="Content"
  //           userId={users[0]._id}
  //           created_at={new Date().toString()}
  //           _id={new Date().toString()}
  //           onRemove={(data) => console.log(data)}
  //           message={true}
  //         />
  //       </div>
  //     </div>
  //   )
  // );
};

Dialog.propTypes = {
  chosedDialog: PropTypes.string,
};

export default Dialog;
