import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { useParams } from 'react-router';
import {
  deleteComment,
  getCommentState,
  loadCommentsList,
} from '../../../store/comment';
import { getProductById } from '../../../store/product';
import AddCommentForm from '../../ui/comments/addCommentForm';
import Comment from '../../ui/comments/comment';
import { Header } from '../../common/text';
import Product from '../../ui/product/product';

const ProductPage = () => {
  const dispatch = useDispatch();

  const { entities: comments } = useSelector(getCommentState());

  const params = useParams();
  const productId = params.id;

  useEffect(() => {
    dispatch(loadCommentsList(productId));
  }, []);

  const handleCommentRemove = (id) => {
    dispatch(deleteComment(id));
  };

  return (
    <>
      <Product
        product={useSelector(getProductById(productId))}
        imageStyle={{ height: '100%' }}
      />
      <Header size={2}>Comments</Header>
      {(comments.length &&
        comments.map((c) => (
          <Comment
            key={c._id}
            content={c.text}
            userId={c.userId}
            created_at={c.publish_date}
            _id={c._id}
            onRemove={handleCommentRemove}
          />
        ))) || <Header size={6}>There are no comments yet. Be first!</Header>}
      <AddCommentForm {...{ productId }} />
    </>
  );
};

export default ProductPage;
