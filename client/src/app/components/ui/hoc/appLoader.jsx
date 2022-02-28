import React from 'react';
import PropTypes from 'prop-types';
import { useEffect } from 'react/cjs/react.development';
import { useDispatch, useSelector } from 'react-redux';

import { getCategoryState, loadCategoriesList } from '../../../store/category';
import Loader from '../../common/loader';
import { getCartState, loadCartList } from '../../../store/cart';
import { getProductState, loadProductsList } from '../../../store/product';
import { getUserState, loadUsersList } from '../../../store/user';

const AppLoader = ({ children }) => {
  const dispatch = useDispatch();

  const { isLoading: productLoadingStatus } = useSelector(getProductState());
  const { isLoading: categoryLoadingStatus } = useSelector(getCategoryState());
  const { isLoading: cartLoadingStatus } = useSelector(getCartState());
  const { isLoading: userLoadingStatus } = useSelector(getUserState());

  useEffect(() => {
    dispatch(loadUsersList());
    dispatch(loadProductsList());
    dispatch(loadCategoriesList());
    dispatch(loadCartList());
  }, []);

  if (
    productLoadingStatus ||
    categoryLoadingStatus ||
    cartLoadingStatus ||
    userLoadingStatus
  ) {
    return <Loader />;
  }

  return <>{children}</>;
};

AppLoader.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]),
};

export default AppLoader;
