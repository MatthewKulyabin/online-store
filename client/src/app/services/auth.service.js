import axios from 'axios';
import { toast } from 'react-toastify';

import configFile from '../config.json';
import { getRefreshToken } from './localStorage.service';

const httpAuth = axios.create({
  baseURL: configFile.apiEndPoint + 'auth/',
});

httpAuth.interceptors.response.use(
  (res) => {
    res.data = { content: res.data };
    return res;
  },
  (error) => {
    const expectedErrors =
      error.response &&
      error.response.status >= 400 &&
      error.response.status < 500;
    if (!expectedErrors) {
      console.error(error);
      toast.error('Something went wrong. Try it later');
    }
    return Promise.reject(error);
  }
);

const authService = {
  register: async (payload) => {
    const { data } = await httpAuth.post('signUp', payload);
    return data;
  },
  login: async ({ email, password }) => {
    const { data } = await httpAuth.post('signInWithPassword', {
      email,
      password,
      returnSecureToken: true,
    });
    return data;
  },
  refreshToken: async () => {
    const { data } = await httpAuth.post('token', {
      grant_type: 'refresh_token',
      refresh_token: getRefreshToken(),
    });
    return data;
  },
};

export default authService;
