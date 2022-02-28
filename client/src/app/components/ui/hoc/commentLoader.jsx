import React from 'react';
import PropTypes from 'prop-types';
import { useEffect } from 'react/cjs/react.development';
import { useDispatch, useSelector } from 'react-redux';

import Loader from '../../common/loader';
import { getCommentState, loadCommentsList } from '../../../store/comment';

const CommentLoader = ({ children }) => {
  const dispatch = useDispatch();

  const { isLoading: commentLoadingStatus } = useSelector(getCommentState());

  useEffect(() => {
    dispatch(loadCommentsList());
  }, []);

  if (commentLoadingStatus) {
    return <Loader />;
  }

  return <>{children}</>;
};

CommentLoader.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]),
};

export default CommentLoader;
