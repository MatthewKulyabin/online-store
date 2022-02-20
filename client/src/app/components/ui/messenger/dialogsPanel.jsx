import React from 'react';
import PropTypes from 'prop-types';

import { useDispatch, useSelector } from 'react-redux';
import {
  getCurrentUserId,
  getUserState,
  searchUser,
} from '../../../store/user';
import { Header } from '../../common/text';
import Search from '../search';
import DialogsPanelCard from './dialogsPanelCard';

const DialogsPanel = ({ onChooseDialog, chosedDialog }) => {
  const dispatch = useDispatch();

  const { entities: users, searchedEntity: searchedUser } = useSelector(
    getUserState()
  );
  const currentUserId = useSelector(getCurrentUserId());

  const handleSearch = (text) => {
    dispatch(searchUser(text));
  };

  return (
    users && (
      <div
        className="tab-pane fade h-100 show active"
        id="tab-content-chats"
        role="tabpanel"
      >
        <div className="d-flex flex-column h-100 position-relative">
          <div className="hide-scrollbar">
            <div className="container py-8">
              <div className="mb-8">
                <Header size={2} className="fw-bold m-0">
                  Chats
                </Header>
              </div>

              <Search onSearch={handleSearch} placeholder="Search..." />

              <div className="card-list">
                {(searchedUser.length &&
                  searchedUser.map(
                    (u) =>
                      currentUserId !== u._id && (
                        <DialogsPanelCard
                          key={u._id}
                          {...{ u }}
                          onClick={onChooseDialog}
                          {...{ chosedDialog }}
                        />
                      )
                  )) ||
                  users.map(
                    (u) =>
                      (currentUserId !== u._id && (
                        <DialogsPanelCard
                          key={u._id}
                          {...{ u }}
                          onClick={onChooseDialog}
                          {...{ chosedDialog }}
                        />
                      )) ||
                      null
                  )}
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  );
};

DialogsPanel.propTypes = {
  onChooseDialog: PropTypes.func,
  chosedDialog: PropTypes.string,
};

export default DialogsPanel;
