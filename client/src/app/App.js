import React, { useEffect } from 'react';

import { loadProductsList } from './store/product';
import { useDispatch } from 'react-redux';
// import { loadCategoriesList } from './store/category';
// import { loadCartList } from './store/cart';

const App = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(loadProductsList());
    // dispatch(loadCategoriesList());
    // dispatch(loadCartList());
  }, []);

  return <div>asdaadsads</div>;
};

export default App;

// import React, { useEffect } from 'react';
// // import { Route, Switch } from 'react-router';

// // import Cart from './layouts/cart';
// // import Login from './layouts/login';
// // import Main from './layouts/main';
// // import NavBar from './components/ui/navBar';
// // import ProductPage from './components/page/productPage';
// // import SignUp from './layouts/signUp';
// // import { ProductProvider } from './hooks/useProduct';
// import { Container } from './components/common/containers';
// // import AdminPage from './components/page/adminPage/adminPage';
// // import { PaginationProvider } from './hooks/usePagination';
// // import { CartProvider } from './hooks/useCart';
// // import { loadProductsList } from './store/product';8
// // import { useDispatch } from 'react-redux';
// // import { loadCategoriesList } from './store/category';
// // import { loadCartList } from './store/cart';
// // import AppLoader from './components/ui/hoc/appLoader';

// const App = () => {
//   // const dispatch = useDispatch();
//   // useEffect(() => {
//   //   dispatch(loadProductsList());
//   //   dispatch(loadCategoriesList());
//   //   dispatch(loadCartList());
//   // }, []);

//   return (
//     // <Container className="mt-5 gutters-sm">
//     //   {/* <NavBar /> */}
//     //   {/* <AppLoader>
//     //     <ProductProvider>
//     //       <CartProvider>
//     //         <PaginationProvider>
//     //           <Switch>
//     //             <Route path="/admin" component={AdminPage} />

//     //             <Route path="/login" component={Login} />
//     //             <Route path="/signup" component={SignUp} />

//     //             <Route path="/cart" component={Cart} />
//     //             <Route path="/:id" component={ProductPage} />

//     //             <Route path="/" component={Main} />
//     //           </Switch>
//     //         </PaginationProvider>
//     //       </CartProvider>
//     //     </ProductProvider>
//     //   </AppLoader> */}
//     // </Container>
//   );
// };

// export default App;
