import React from 'react';
import PropTypes from 'prop-types';
import { useEffect } from 'react/cjs/react.development';
import { useDispatch, useSelector } from 'react-redux';

import Loader from '../../common/loader';
import { getMessageState, loadMessagesList } from '../../../store/message';

const MessageLoader = ({ children }) => {
  const dispatch = useDispatch();

  const { isLoading: messageLoadingStatus } = useSelector(getMessageState());

  useEffect(() => {
    dispatch(loadMessagesList());
  }, []);

  if (messageLoadingStatus) {
    return <Loader />;
  }

  return <>{children}</>;
};

MessageLoader.propTypes = {
  children: PropTypes.oneOfType(
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node
  ),
};

export default MessageLoader;
