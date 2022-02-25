import React from 'react';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';

import { getCurrentUserId } from '../../store/user';
import history from '../../core/history';
import { Card, Flex, Image, Margin } from '../common/containers';
import { Button, Header } from '../common/text';
import Gear from '../common/icons/gear';

const UserCard = ({ user }) => {
  const currentUserId = useSelector(getCurrentUserId());

  const handleClick = () => {
    history.push(history.location.pathname + '/edit');
  };

  return (
    <Card className="mb-3">
      <Card className="-body">
        {currentUserId === user._id && (
          <Button
            className="position-absolute top-0 end-0 btn-light btn-sm"
            onClick={handleClick}
          >
            <Gear />
          </Button>
        )}
        <Flex className="flex-column align-items-center text-center position-relative">
          <Image src={user.image} className="rounded-circle" width="150" />

          <Margin className="t-3">
            <Header size={4}>{user.name}</Header>
          </Margin>
        </Flex>
      </Card>
    </Card>
  );
};
UserCard.propTypes = {
  user: PropTypes.object,
};

export default UserCard;
