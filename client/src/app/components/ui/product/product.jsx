import React from 'react';
import PropTypes from 'prop-types';
import { useMediaQuery } from 'react-responsive';

import { Image, Col, Card, Row } from '../../common/containers';
import {
  Anchor,
  Header,
  Paragraph,
  SmallText,
  Button,
} from '../../common/text';
import { useDispatch, useSelector } from 'react-redux';
import { deleteCart, getCartState, updateCart } from '../../../store/cart';

const Product = ({ product, imageStyle, ...rest }) => {
  const dispatch = useDispatch();

  const { entities: cart } = useSelector(getCartState());
  const isPhone = useMediaQuery({ query: '(max-width: 768px)' });

  const getImageStyle = () => {
    if (isPhone) {
      return { height: '100%' };
    }
    if (imageStyle) {
      return imageStyle;
    }
    return {};
  };

  const handlePostCart = () => {
    dispatch(updateCart(product));
  };

  const handleDeleteCart = () => {
    dispatch(deleteCart(product._id));
  };

  return (
    <Card className="mb-3" {...rest}>
      <Row className="g-0">
        <Col className="-md-3">
          <Anchor to={`/${product._id}`}>
            <Image
              src={product.photo}
              className="-fluid rounded-start image-cover"
              alt="..."
              style={getImageStyle()}
            />
          </Anchor>
        </Col>
        <Col className="-md-6">
          <Card className="-body">
            <Header size={5}>{product.name}</Header>
            <Paragraph className="card-text">Price: {product.price}$</Paragraph>
            <Paragraph className="card-text">Count: {product.count}</Paragraph>
            <Paragraph className="card-text">
              <SmallText className="text-muted">{`Publish Date: ${new Date(
                product.publish_date
              ).toLocaleString()}`}</SmallText>
            </Paragraph>
            <Paragraph className="card-text">
              <SmallText className="text-muted">{`Updated Date: ${new Date(
                product.updatedAt
              ).toLocaleString()}`}</SmallText>
            </Paragraph>
          </Card>
        </Col>
        <Col>
          {cart.find((prod) => prod._id === product._id) ? (
            <Button
              className="btn-danger"
              style={{ width: '100%' }}
              onClick={handleDeleteCart}
            >
              Delete from Cart
            </Button>
          ) : (
            <Button
              className="btn-primary"
              style={{ width: '100%' }}
              onClick={handlePostCart}
            >
              Add to Cart
            </Button>
          )}
        </Col>
      </Row>
    </Card>
  );
};

Product.propTypes = {
  product: PropTypes.object,
  imageStyle: PropTypes.object,
};

export default Product;
