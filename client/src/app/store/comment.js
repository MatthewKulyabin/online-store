import { createSlice } from '@reduxjs/toolkit';

import commentService from '../services/comment.service';

const commentSlice = createSlice({
  name: 'comment',
  initialState: {
    entities: [],
    isLoading: true,
    error: null,
  },
  reducers: {
    commentsRequested: (state) => {
      state.isLoading = true;
    },
    commentsReceived: (state, action) => {
      state.entities = action.payload;
      state.isLoading = false;
    },
    commentsRequestFailed: (state, action) => {
      state.error = action.payload;
      state.isLoading = false;
    },

    commentCreated: (state, action) => {
      state.entities.push(action.payload);
    },
    commentCreatedFailed: (state, action) => {
      state.error = action.payload;
    },

    commentDeleted: (state, action) => {
      state.entities = state.entities.filter((c) => c._id !== action.payload);
    },
    commentDeletedFailed: (state, action) => {
      state.error = action.payload;
    },
  },
});

const { reducer: commentReducer, actions } = commentSlice;
const {
  commentsRequested,
  commentsReceived,
  commentsRequestFailed,

  commentCreated,
  commentCreatedFailed,

  commentDeleted,
  commentDeletedFailed,
} = actions;

export const loadCommentsList = (productId) => async (dispatch) => {
  dispatch(commentsRequested());
  try {
    const { content } = await commentService.get(productId);
    dispatch(commentsReceived(content));
  } catch (error) {
    dispatch(commentsRequestFailed(error));
  }
};

export const createComment = (data) => async (dispatch) => {
  try {
    const { content } = await commentService.post(data);
    dispatch(commentCreated(content));
  } catch (error) {
    dispatch(commentCreatedFailed(error));
  }
};

export const deleteComment = (id) => async (dispatch) => {
  try {
    const { content } = await commentService.delete(id);
    dispatch(commentDeleted(content));
  } catch (error) {
    dispatch(commentDeletedFailed(error));
  }
};

export const getCommentState = () => (state) => state.comment;
export const getCommentById = (id) => (state) =>
  state.comment.entities.find((c) => c._id === id);

export default commentReducer;
