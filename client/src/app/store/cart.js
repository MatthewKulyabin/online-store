import { createSlice } from '@reduxjs/toolkit';

const CART = 'cart';

const cartSlice = createSlice({
  name: 'cart',
  initialState: {
    entities: [],
    isLoading: true,
  },
  reducers: {
    cartReceived: (state, action) => {
      state.entities = action.payload;
      state.isLoading = false;
    },

    cartDeleted: (state, action) => {
      state.entities = state.entities.filter((c) => c._id !== action.payload);
    },

    cartUpdated: (state, action) => {},
  },
});

const { reducer: cartReducer, actions } = cartSlice;
const { cartReceived, cartDeleted, cartUpdated } = actions;

export const loadCartList = () => (dispatch) => {
  const content = JSON.parse(localStorage.getItem(CART)) || [];
  dispatch(cartReceived(content));
};

export const deleteCart = (id) => (dispatch, getState) => {
  let content = JSON.parse(localStorage.getItem(CART));
  content = content.filter((c) => c._id !== id);

  dispatch(cartDeleted(id));
  localStorage.setItem(CART, JSON.stringify(content));
};

export const updateCart = (data) => (dispatch) => {
  const content = JSON.parse(localStorage.getItem(CART)) || [];
  content.push(data);

  dispatch(cartUpdated(data));
  localStorage.setItem(CART, JSON.stringify(content));
};

export const getCartState = () => (state) => state.cart;

export default cartReducer;
