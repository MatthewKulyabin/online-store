import { createSlice } from '@reduxjs/toolkit';

import productService from '../services/product.service';

const productSlice = createSlice({
  name: 'product',
  initialState: {
    entities: [],
    filteredEntities: [],
    sortedEntities: [],
    searchedEntity: [],
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

    productFiltered: (state, action) => {
      if (action.payload === '0') {
        state.filteredEntities = [];
        return;
      }
      state.sortedEntities = [];

      state.filteredEntities = state.entities.filter(
        (p) => p.categoryId === action.payload
      );
    },
    productSorted: (state, action) => {
      state.filteredEntities = [];
      let { item, order } = action.payload;

      item = item[0].toLowerCase() + item.slice(1);

      const arr = JSON.parse(JSON.stringify(state.entities));
      state.sortedEntities = arr.sort((a, b) => {
        if (typeof a[item] === 'string') {
          return order === 'asc'
            ? a[item].localeCompare(b[item])
            : b[item].localeCompare(a[item]);
        }
        return order === 'asc' ? a[item] - b[item] : b[item] - a[item];
      });
    },
    productSearched: (state, action) => {
      const text = action.payload.toLowerCase();
      const foundedProd = state.entities.find(
        (prod) => prod.name.toLowerCase() === text
      );

      if (foundedProd) {
        state.searchedEntity = [foundedProd];
      } else {
        state.searchedEntity = [];
      }
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

  productSorted,
  productFiltered,
  productSearched,
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
    console.dir(error);
    dispatch(productDeletedFailed(error));
  }
};

export const createProduct = (data) => async (dispatch) => {
  try {
    const { content } = await productService.post(data);
    dispatch(productCreated(content));
  } catch (error) {
    console.dir(error);
    dispatch(productCreatedFailed(error));
  }
};

export const updateProduct = (id, data) => async (dispatch) => {
  try {
    const { content } = await productService.patch(id, data);
    dispatch(productUpdated(content));
  } catch (error) {
    dispatch(productUpdatedFailed(error));
  }
};

export const sortProducts =
  (item, order = 'asc') =>
  (dispatch) => {
    dispatch(productSorted({ item, order }));
  };

export const filterProducts = (id) => (dispatch) => {
  dispatch(productFiltered(id));
};

export const searchProduct = (text) => (dispatch) => {
  dispatch(productSearched(text));
};

export const getProductState = () => (state) => state.product;
export const getProductById = (id) => (state) =>
  state.product.entities.find((p) => p._id === id);
export const getFilteredProducts = (categoryId) => (state) =>
  state.product.entities.filter((p) => p.categoryId === categoryId);

export default productReducer;
