import React from 'react';
import PropTypes from 'prop-types';

import { displayDate } from '../../../core/displayDate';
import { useSelector } from 'react-redux';
import { getCurrentUserId, getUserById } from '../../../store/user';

const Comment = ({
  content,
  userId,
  created_at: created,
  _id: id,
  onRemove,
  message,
}) => {
  const currentUserId = useSelector(getCurrentUserId());
  const user = useSelector(getUserById(userId));

  return (
    <div className={(message && 'col-6') || 'col'}>
      <div className="bg-light card-body  mb-3">
        <div className="d-flex flex-start ">
          <img
            src={user.image}
            className="rounded-circle shadow-1-strong me-3"
            alt="avatar"
            width="65"
            height="65"
          />
          <div className="flex-grow-1 flex-shrink-1">
            <div className="mb-4">
              <div className="d-flex justify-content-between align-items-center">
                <p className="mb-1 ">
                  {user && user.name}{' '}
                  <span className="small">- {displayDate(created)}</span>
                </p>
                {currentUserId === userId && (
                  <button
                    className="btn btn-sm text-primary d-flex align-items-center"
                    onClick={() => onRemove(id)}
                  >
                    <i className="bi bi-x-lg"></i>
                  </button>
                )}
              </div>
              <p className="small mb-0">{content}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
Comment.propTypes = {
  content: PropTypes.string,
  userId: PropTypes.string,
  edited_at: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  created_at: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  onRemove: PropTypes.func,
  _id: PropTypes.string,
  message: PropTypes.bool,
};

export default Comment;