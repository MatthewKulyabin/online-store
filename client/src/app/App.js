import React from 'react';
import { Route, Switch } from 'react-router';

import Cart from './layouts/cart';
import Login from './layouts/login';
import Main from './layouts/main';
import NavBar from './components/ui/navBar';
import ProductPage from './components/page/productPage';
import SignUp from './layouts/signUp';
import { Container } from './components/common/containers';
import AdminPage from './components/page/adminPage/adminPage';
import { PaginationProvider } from './hooks/usePagination';
import AppLoader from './components/ui/hoc/appLoader';
import ProtectedRouteIsAdmin from './components/common/protectedRouteIsAdmin';
import LogOut from './layouts/logOut';
import ProtectedRouteIsUser from './components/common/protectedRouteIsUser';
import UserPage from './components/page/userPage';
import UserEditPage from './components/page/userEditPage';

const App = () => {
  return (
    <Container className="mt-5 gutters-sm">
      <NavBar />
      <AppLoader>
        <PaginationProvider>
          <Switch>
            <ProtectedRouteIsAdmin path="/admin" component={AdminPage} />
            <ProtectedRouteIsUser
              path="/user/:userId/edit"
              component={UserEditPage}
            />
            <ProtectedRouteIsUser path="/user/:userId" component={UserPage} />

            <Route path="/login" component={Login} />
            <Route path="/signup" component={SignUp} />
            <Route path="/logout" component={LogOut} />

            <Route path="/cart" component={Cart} />
            <Route path="/:id" component={ProductPage} />

            <Route path="/" component={Main} />
          </Switch>
        </PaginationProvider>
      </AppLoader>
    </Container>
  );
};

export default App;
