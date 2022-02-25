import React from 'react';
import PropTypes from 'prop-types';

import { displayDate } from '../../../core/displayDate';
import { useSelector } from 'react-redux';
import { getCurrentUserId, getUserById } from '../../../store/user';
import { BackGround, Col, Flex, Image, Margin } from '../../common/containers';
import { Button, Paragraph, SmallText } from '../../common/text';
import Remove from '../../common/icons/remove';

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
    <Col className={(message && '-6') || ''}>
      <BackGround className="-light card-body  mb-3">
        <Flex className="flex-start ">
          <Image
            src={user.image}
            className="rounded-circle shadow-1-strong me-3"
            alt="avatar"
            width="65"
            height="65"
          />
          <Flex className="-grow-1 flex-shrink-1">
            <Margin className="mb-4">
              <Flex className="justify-content-between align-items-center">
                <Margin className="b-1 ">
                  {user && user.name}{' '}
                  <SmallText>- {displayDate(created)}</SmallText>
                </Margin>
                {currentUserId === userId && (
                  <Button
                    className="btn-sm text-primary d-flex align-items-center"
                    onClick={() => onRemove(id)}
                  >
                    <Remove />
                  </Button>
                )}
              </Flex>
              <Paragraph className="small mb-0">{content}</Paragraph>
            </Margin>
          </Flex>
        </Flex>
      </BackGround>
    </Col>
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
