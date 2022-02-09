import { createSlice } from '@reduxjs/toolkit';
import history from '../core/history';

import authService from '../services/auth.service';
import { setTokens } from '../services/localStorage.service';

const userSlice = createSlice({
  name: 'user',
  initialState: {
    entity: {},
    isLoading: true,
    error: null,
  },
  reducers: {
    // userRequested: (state) => {
    //   state.isLoading = true;
    // },
    // userReceived: (state, action) => {
    //   state.entities = action.payload;
    //   state.isLoading = false;
    // },
    // userRequestFailed: (state, action) => {
    //   state.error = action.payload;
    //   state.isLoading = false;
    // },
    authRequested: (state) => {
      state.error = null;
    },
    authRequestSuccess: (state, action) => {
      state.auth = action.payload;
      state.isLoggedIn = true;
    },
    authRequestFailed: (state, action) => {
      state.error = action.payload;
    },
  },
});

const { reducer: userReducer, actions } = userSlice;
const { authRequested, authRequestSuccess, authRequestFailed } = actions;

export const createUser = (payload) => async (dispatch) => {
  try {
    dispatch(authRequested());
    const { content } = await authService.register(payload);
    setTokens(content);
    history.push('/main');
    dispatch(authRequestSuccess({ userId: content.localId }));
  } catch (error) {
    authRequestFailed(error);
  }
};

// export const getuserState = () => (state) => state.user;
// export const getuserById = (id) => (state) =>
//   state.user.entities.find((c) => c._id === id);

export default userReducer;
