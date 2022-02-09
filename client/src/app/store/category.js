import { createSlice } from '@reduxjs/toolkit';

import categoryService from '../services/category.service';

const categorySlice = createSlice({
  name: 'category',
  initialState: {
    entities: [],
    isLoading: true,
    error: null,
  },
  reducers: {
    categoriesRequested: (state) => {
      state.isLoading = true;
    },
    categoriesReceived: (state, action) => {
      state.entities = action.payload;
      state.isLoading = false;
    },
    categoriesRequestFailed: (state, action) => {
      state.error = action.payload;
      state.isLoading = false;
    },
  },
});

const { reducer: categoryReducer, actions } = categorySlice;
const { categoriesRequested, categoriesReceived, categoriesRequestFailed } =
  actions;

export const loadCategoriesList = () => async (dispatch) => {
  dispatch(categoriesRequested());
  try {
    const { content } = await categoryService.get();
    dispatch(categoriesReceived(content));
  } catch (error) {
    dispatch(categoriesRequestFailed(error));
  }
};

export const getCategoryState = () => (state) => state.category;
export const getCategoryById = (id) => (state) =>
  state.category.entities.find((c) => c._id === id);

export default categoryReducer;
