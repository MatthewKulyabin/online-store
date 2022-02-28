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
import {
  Card,
  Container,
  Flex,
  HideScrollbar,
  Margin,
} from '../../common/containers';

const DialogsPanel = ({ onChooseDialog, chosedDialog }) => {
  const dispatch = useDispatch();

  const { entities: users, searchedEntity: searchedUser } = useSelector(
    getUserState()
  );
  const currentUserId = useSelector(getCurrentUserId());

  const handleSearch = (text) => {
    text && dispatch(searchUser(text));
  };

  return (
    users && (
      <div
        className="tab-pane fade h-100 show active"
        id="tab-content-chats"
        role="tabpanel"
      >
        <Flex className="flex-column h-100 position-relative">
          <HideScrollbar>
            <Container className="py-8">
              <Margin className="b-8">
                <Header size={2} className="fw-bold m-0">
                  Chats
                </Header>
              </Margin>

              <Search onSearch={handleSearch} placeholder="Search..." />
              <Card className="-list">
                {(searchedUser.length &&
                  searchedUser.map(
                    (u, idx) =>
                      currentUserId !== u._id && (
                        <DialogsPanelCard
                          key={idx}
                          {...{ u }}
                          onClick={onChooseDialog}
                          {...{ chosedDialog }}
                        />
                      )
                  )) ||
                  users.map(
                    (u, idx) =>
                      (currentUserId !== u._id && (
                        <DialogsPanelCard
                          key={idx}
                          {...{ u }}
                          onClick={onChooseDialog}
                          {...{ chosedDialog }}
                        />
                      )) ||
                      null
                  )}
              </Card>
            </Container>
          </HideScrollbar>
        </Flex>
      </div>
    )
  );
};

DialogsPanel.propTypes = {
  onChooseDialog: PropTypes.func,
  chosedDialog: PropTypes.string,
};

export default DialogsPanel;
