import { createSlice } from '@reduxjs/toolkit';
import history from '../core/history';

import authService from '../services/auth.service';
import {
  getUserId,
  removeAuthData,
  setTokens,
} from '../services/localStorage.service';
import userService from '../services/user.service';

const userSlice = createSlice({
  name: 'user',
  initialState: {
    entities: [],
    searchedEntity: [],
    isLoading: true,
    error: null,
    auth: getUserId(),
  },
  reducers: {
    userRequested: (state) => {
      state.isLoading = true;
    },
    userReceived: (state, action) => {
      state.entities = action.payload;
      state.isLoading = false;
    },
    userRequestFailed: (state, action) => {
      state.error = action.payload;
      state.isLoading = false;
    },

    authRequested: (state) => {
      state.error = null;
    },
    authRequestSuccess: (state, action) => {
      state.auth = getUserId();
      state.isLoggedIn = true;
    },
    authRequestFailed: (state, action) => {
      state.error = action.payload;
    },

    userLoggedOut: (state) => {
      state.auth = null;
    },

    userUpdated: (state, action) => {
      const updatedUser = action.payload;
      const index = state.entities.findIndex((u) => u._id === updatedUser._id);
      state.entities[index] = updatedUser;
    },
    userUpdateRequestFailed: (state, action) => {
      state.error = action.payload;
    },

    userSearched: (state, action) => {
      const text = action.payload.toLowerCase();
      const foundedUser = state.entities.find(
        (user) => user.name.toLowerCase() === text
      );

      if (foundedUser) {
        state.searchedEntity = [foundedUser];
      } else {
        state.searchedEntity = [];
      }
    },
  },
});

const { reducer: userReducer, actions } = userSlice;
const {
  authRequested,
  authRequestSuccess,
  authRequestFailed,

  userRequestFailed,
  userReceived,
  userRequested,

  userLoggedOut,

  userUpdated,
  userUpdateRequestFailed,

  userSearched,
} = actions;

export const loadUsersList = () => async (dispatch) => {
  dispatch(userRequested());
  try {
    const { content } = await userService.get();
    dispatch(userReceived(content));
  } catch (error) {
    dispatch(userRequestFailed(error));
  }
};

export const login = (payload) => async (dispatch) => {
  dispatch(authRequested());
  try {
    const { content } = await authService.login(payload);
    setTokens(content);
    dispatch(authRequestSuccess({ userId: content.userId }));
    history.push('/');
  } catch (error) {
    console.dir(error);
    const { code, message } = error.response.data.error;
    if (code === 400) {
      dispatch(authRequestFailed({ login: 'Wrong Password or Error' }));
    } else {
      dispatch(authRequestFailed(message));
    }
  }
};

export const logOut = () => async (dispatch) => {
  removeAuthData();
  history.push('/');
  dispatch(userLoggedOut());
};

export const createUser = (payload) => async (dispatch) => {
  try {
    dispatch(authRequested());
    const { content } = await authService.register(payload);
    setTokens(content);
    history.push('/');
    dispatch(authRequestSuccess({ userId: content.localId }));
  } catch (error) {
    const { code, message } = error.response.data.error;
    if (code === 400) {
      dispatch(authRequestFailed({ signUp: 'Email exists' }));
    } else {
      dispatch(authRequestFailed(message));
    }
  }
};

export const updateUser = (data) => async (dispatch) => {
  try {
    const { content } = await userService.update(data);
    dispatch(userUpdated(content));
    history.push(`/user/${getUserId()}`);
  } catch (error) {
    dispatch(userUpdateRequestFailed(error.message));
  }
};

export const searchUser = (text) => (dispatch) => {
  dispatch(userSearched(text));
};

export const getUserState = () => (state) => state.user;
export const getUserById = (id) => (state) =>
  state.user.entities.find((u) => u._id === id);
export const getCurrentUserData = () => (state) =>
  state.user.entities?.find((u) => u._id === state.user.auth);
export const getCurrentUserId = () => (state) => state.user.auth;
export const getUserAuthStatus = () => (state) => state.user.error;
export const getIsAdmin = () => (state) =>
  state.user.entities.find((u) => u._id === getUserId())?.role === 'admin';

export default userReducer;
