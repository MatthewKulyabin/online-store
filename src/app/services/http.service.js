import axios from 'axios';
import { toast } from 'react-toastify';
import configFile from '../config.json';

axios.defaults.baseURL = configFile.apiEndPoint;

axios.interceptors.response.use(
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

const httpService = {
  get: axios.get,
  post: axios.post,
  put: axios.put,
  delete: axios.delete,
};

export default httpService;
