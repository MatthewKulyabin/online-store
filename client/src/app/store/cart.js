import { createSlice } from '@reduxjs/toolkit';

const CART = 'cart';

const cartSlice = createSlice({
  name: 'cart',
  initialState: {
    entities: [],
    searchedEntity: [],
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

    cartUpdated: (state, action) => {
      state.entities = action.payload;
    },

    cartSearched: (state, action) => {
      const text = action.payload.toLowerCase();
      const foundedCartProd = state.entities.find(
        (prod) => prod.name.toLowerCase() === text
      );

      if (foundedCartProd) {
        state.searchedEntity = [foundedCartProd];
      } else {
        state.searchedEntity = [];
      }
    },
  },
});

const { reducer: cartReducer, actions } = cartSlice;
const { cartReceived, cartDeleted, cartUpdated, cartSearched } = actions;

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

  dispatch(cartUpdated(content));

  localStorage.setItem(CART, JSON.stringify(content));
};

export const searchCart = (text) => (dispatch) => {
  dispatch(cartSearched(text));
};

export const getCartState = () => (state) => state.cart;

export const getCartPrice = () => (state) =>
  state.cart.entities.reduce((sum, prod) => (sum += prod.price), 0);

export default cartReducer;
