import React from 'react';
import PropTypes from 'prop-types';

import { Card, Row, Col, Image, Flex } from '../../common/containers';
import { Header } from '../../common/text';

const DialogsPanelCard = ({ u, onClick, chosedDialog }) => {
  return (
    <Card
      onClick={() => onClick(u._id)}
      className={`border-0 text-reset btn p-0 ${
        u._id === chosedDialog ? 'bg-primary' : 'bg-light'
      }`}
    >
      <Card className="-body">
        <Row className="gx-5">
          <Col className="-auto">
            <Image
              src={u.image}
              alt="#"
              className="rounded-circle"
              width="50"
            />
          </Col>

          <Col>
            <Flex className="align-items-center mb-3">
              <Header size={5} className="me-auto mb-0">
                {u.name}
              </Header>
            </Flex>
          </Col>
        </Row>
      </Card>
    </Card>
  );
};

DialogsPanelCard.propTypes = {
  u: PropTypes.object,
  onClick: PropTypes.func,
  chosedDialog: PropTypes.string,
};

export default DialogsPanelCard;
