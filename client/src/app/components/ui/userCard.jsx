import React from 'react';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';

import { getCurrentUserId } from '../../store/user';
import history from '../../core/history';

const UserCard = ({ user }) => {
  const currentUserId = useSelector(getCurrentUserId());

  const handleClick = () => {
    history.push(history.location.pathname + '/edit');
  };

  return (
    <div className="card mb-3">
      <div className="card-body">
        {currentUserId === user._id && (
          <button
            className="position-absolute top-0 end-0 btn btn-light btn-sm"
            onClick={handleClick}
          >
            <i className="bi bi-gear"></i>
          </button>
        )}
        <div className="d-flex flex-column align-items-center text-center position-relative">
          <img src={user.image} className="rounded-circle" width="150" />
          <div className="mt-3">
            <h4>{user.name}</h4>
          </div>
        </div>
      </div>
    </div>
  );
};
UserCard.propTypes = {
  user: PropTypes.object,
};

export default UserCard;
