import { createSlice } from '@reduxjs/toolkit';

import messageService from '../services/message.service';

const messageSlice = createSlice({
  name: 'message',
  initialState: {
    entities: [],
    isLoading: true,
    error: null,
  },
  reducers: {
    messagesRequested: (state) => {
      state.isLoading = true;
    },
    messagesReceived: (state, action) => {
      state.entities = action.payload.sort(
        (a, b) => new Date(a.publish_date) - new Date(b.publish_date)
      );
      state.isLoading = false;
    },
    messagesRequestFailed: (state, action) => {
      state.error = action.payload;
      state.isLoading = false;
    },

    messageCreated: (state, action) => {
      state.entities.push(action.payload);
    },
    messageCreatedFailed: (state, action) => {
      state.error = action.payload;
    },

    messageDeleted: (state, action) => {
      state.entities = state.entities.filter((p) => p._id !== action.payload);
    },
    messageDeletedFailed: (state, action) => {
      state.error = action.payload;
    },
  },
});

const { reducer: messageReducer, actions } = messageSlice;
const {
  messagesRequested,
  messagesReceived,
  messagesRequestFailed,

  messageCreated,
  messageCreatedFailed,

  messageDeleted,
  messageDeletedFailed,
} = actions;

export const loadMessagesList = (data) => async (dispatch) => {
  dispatch(messagesRequested());
  try {
    const { content } = await messageService.get(data);
    dispatch(messagesReceived(content));
  } catch (error) {
    dispatch(messagesRequestFailed(error));
  }
};

export const createMessage = (data) => async (dispatch) => {
  try {
    const { content } = await messageService.post(data);
    dispatch(messageCreated(content));
  } catch (error) {
    dispatch(messageCreatedFailed(error));
  }
};

export const deleteMessage = (id) => async (dispatch) => {
  try {
    const { content } = await messageService.delete(id);
    dispatch(messageDeleted(content));
  } catch (error) {
    dispatch(messageDeletedFailed(error));
  }
};

export const getMessageState = () => (state) => state.message;
export const getDialogMessages = (chosedUserId) => (state) =>
  state.message.entities.filter(
    (m) => (m.receiverId === chosedUserId || m.senderId === chosedUserId) && m
  );

export default messageReducer;
