import httpService from './http.service';

const productEndPoint = 'product/';

const productService = {
  get: async () => {
    const { data } = await httpService.get(productEndPoint);
    return data;
  },

  delete: async (id) => {
    const { data } = await httpService.delete(productEndPoint + id);
    return data;
  },

  post: async (content) => {
    const { data } = await httpService.post(productEndPoint, content);
    return data;
  },

  put: async (id, content) => {
    const { data } = await httpService.put(productEndPoint + id, content);
    return data;
  },
};

export default productService;
