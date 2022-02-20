import { combineReducers, configureStore } from '@reduxjs/toolkit';
import cartReducer from './cart';
import categoryReducer from './category';
import commentReducer from './comment';
import messageReducer from './message';

import productReducer from './product';
import userReducer from './user';

const rootReducer = combineReducers({
  product: productReducer,
  category: categoryReducer,
  cart: cartReducer,
  user: userReducer,
  comment: commentReducer,
  message: messageReducer,
});

export const createStore = () => configureStore({ reducer: rootReducer });
