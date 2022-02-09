import axios from 'axios';
import { toast } from 'react-toastify';

import localStorageService from '../services/localStorage.service';
import configFile from '../config.json';
import authService from '../services/auth.service';

axios.defaults.baseURL = configFile.apiEndPoint;

axios.interceptors.request.use(
  async (config) => {
    const expiresDate = localStorageService.getTokenExpiresDate();
    const refreshToken = localStorageService.getRefreshToken();
    const isExpired = refreshToken && expiresDate < Date.now();

    if (isExpired) {
      const data = await authService.refreshToken();

      localStorageService.setTokens(data);
    }
    const accessToken = localStorageService.getAccessToken();
    if (accessToken) {
      config.headers = {
        ...config.headers,
        Authorization: `Bearer ${accessToken}`,
      };
    }

    return config;
  },
  (error) => Promise.reject(error)
);

axios.interceptors.response.use(
  (res) => {
    console.log(res);
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

const httpService = {
  get: axios.get,
  post: axios.post,
  put: axios.put,
  delete: axios.delete,
};

export default httpService;
