import React from 'react';
import PropTypes from 'prop-types';

const DialogsPanelCard = ({ u, onClick, chosedDialog }) => {
  return (
    <a
      onClick={() => onClick(u._id)}
      className={`card border-0 text-reset btn p-0 ${
        u._id === chosedDialog ? 'bg-primary' : 'bg-light'
      }`}
    >
      <div className="card-body">
        <div className="row gx-5">
          <div className="col-auto">
            <div className="avatar avatar-online">
              <img
                src={u.image}
                alt="#"
                className="rounded-circle"
                width="50"
              />
            </div>
          </div>

          <div className="col">
            <div className="d-flex align-items-center mb-3">
              <h5 className="me-auto mb-0">{u.name}</h5>
            </div>
          </div>
        </div>
      </div>
    </a>
  );
};

DialogsPanelCard.propTypes = {
  u: PropTypes.object,
  onClick: PropTypes.func,
  chosedDialog: PropTypes.string,
};

export default DialogsPanelCard;
