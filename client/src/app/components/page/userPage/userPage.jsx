import React, { useState } from 'react';
import { useSelector } from 'react-redux';

import UserCard from '../../ui/userCard';
import { getUserById } from '../../../store/user';
import { useParams } from 'react-router';
import { Col, Container, Row } from '../../common/containers';
import DialogsPanel from '../../ui/messenger/dialogsPanel';
import Dialog from '../../ui/messenger/dialog';
import AddCommentForm from '../../ui/comments/addCommentForm';
import { Header } from '../../common/text';
import MessageLoader from '../../ui/hoc/messageLoader';

const UserPage = () => {
  const { userId } = useParams();
  const user = useSelector(getUserById(userId));

  const [chosedDialog, setChosedDialog] = useState();

  const handleChooseDialog = (id) => {
    setChosedDialog(id);
  };

  if (user) {
    return (
      <MessageLoader>
        <Container>
          <Row className="gutters-sm">
            <Col className="-md-4 mb-3">
              <UserCard user={user} />
              <DialogsPanel
                onChooseDialog={handleChooseDialog}
                {...{ chosedDialog }}
              />
            </Col>
            <Col className="-md-8">
              {(chosedDialog && (
                <>
                  <Dialog {...{ chosedDialog }} />
                  <AddCommentForm
                    productId={Date.now().toString()}
                    message={true}
                    {...{ chosedDialog }}
                  />
                </>
              )) || <Header size={2}>Choose Dialog</Header>}
            </Col>
          </Row>
        </Container>
      </MessageLoader>
    );
  } else {
    return <h1>Loading</h1>;
  }
};

export default UserPage;
