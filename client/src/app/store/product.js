import { createSlice } from '@reduxjs/toolkit';

import productService from '../services/product.service';

const productSlice = createSlice({
  name: 'product',
  initialState: {
    entities: [],
    isLoading: true,
    error: null,
  },
  reducers: {
    productsRequested: (state) => {
      state.isLoading = true;
    },
    productsReceived: (state, action) => {
      state.entities = action.payload;
      state.isLoading = false;
    },
    productsRequestFailed: (state, action) => {
      state.error = action.payload;
      state.isLoading = false;
    },

    productDeleted: (state, action) => {
      state.entities = state.entities.filter((p) => p._id !== action.payload);
    },
    productDeletedFailed: (state, action) => {
      state.error = action.payload;
    },

    productCreated: (state, action) => {
      state.entities.push(action.payload);
    },
    productCreatedFailed: (state, action) => {
      state.error = action.payload;
    },

    productUpdated: (state, action) => {
      const indexToChange = state.entities.findIndex(
        (p) => p._id === action.payload._id
      );
      state.entities[indexToChange] = action.payload;
    },
    productUpdatedFailed: (state, action) => {
      state.error = action.payload;
    },
  },
});

const { reducer: productReducer, actions } = productSlice;
const {
  productsRequested,
  productsReceived,
  productsRequestFailed,

  productDeleted,
  productDeletedFailed,

  productCreated,
  productCreatedFailed,

  productUpdated,
  productUpdatedFailed,
} = actions;

export const loadProductsList = () => async (dispatch) => {
  dispatch(productsRequested());
  try {
    const { content } = await productService.get();
    dispatch(productsReceived(content));
  } catch (error) {
    dispatch(productsRequestFailed(error));
  }
};

export const deleteProduct = (id) => async (dispatch) => {
  try {
    await productService.delete(id);
    dispatch(productDeleted(id));
  } catch (error) {
    dispatch(productDeletedFailed(error));
  }
};

export const createProduct = (data) => async (dispatch) => {
  try {
    const { content } = await productService.post(data);
    dispatch(productCreated(content));
  } catch (error) {
    dispatch(productCreatedFailed(error));
  }
};

export const updateProduct = (id, data) => async (dispatch) => {
  try {
    const { content } = await productService.put(id, data);
    dispatch(productUpdated(content));
  } catch (error) {
    dispatch(productUpdatedFailed(error));
  }
};

export const getProductState = () => (state) => state.product;

export default productReducer;
