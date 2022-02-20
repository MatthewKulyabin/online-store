import React from 'react';
import PropTypes from 'prop-types';
import { Redirect, Route } from 'react-router-dom';

import { useSelector } from 'react-redux';
import { getCurrentUserId } from '../../store/user';

const ProtectedRouteIsUser = ({ component: Component, children, ...rest }) => {
  const isUser = useSelector(getCurrentUserId());

  return (
    <Route
      {...rest}
      render={(props) => {
        if (!isUser) {
          return (
            <Redirect
              to={{ pathname: '/login', state: { from: props.location } }}
            />
          );
        }
        return Component ? <Component {...props} /> : children;
      }}
    />
  );
};

ProtectedRouteIsUser.propTypes = {
  component: PropTypes.func,
  location: PropTypes.object,
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]),
};

export default ProtectedRouteIsUser;
