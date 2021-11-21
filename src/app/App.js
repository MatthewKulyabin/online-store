import React from 'react';
import { Switch, Route } from 'react-router';

import Admin from './layouts/admin';
import Cart from './layouts/cart';
import Login from './layouts/login';
import Main from './layouts/main';
import NavBar from './components/ui/navBar';
import ProductPage from './components/page/productPage';
import SignUp from './layouts/signUp';
import { ProductProvider } from './hooks/useProduct';
import CategoryProvider from './hooks/useCategory';
import { Container } from './components/common/containers';

const App = () => {
  return (
    <Container className="mt-5 gutters-sm">
      <NavBar />
      <ProductProvider>
        <CategoryProvider>
          <Switch>
            <Route exact path="/" component={Main} />
            <Route path="/admin" component={Admin} />
            <Route path="/product" component={ProductPage} />
            <Route path="/cart" component={Cart} />
            <Route path="/login" component={Login} />
            <Route path="/signup" component={SignUp} />
          </Switch>
        </CategoryProvider>
      </ProductProvider>
    </Container>
  );
};

export default App;
