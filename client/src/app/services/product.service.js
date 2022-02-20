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
    const payload = new FormData();

    const photo = content.photo;
    delete content.photo;

    const json = JSON.stringify(content);
    const blob = new Blob([json], {
      type: 'application/json',
    });

    payload.append('photo', photo);
    payload.append('content', blob);

    const { data } = await httpService.post(productEndPoint, payload, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });

    return data;
  },

  patch: async (id, content) => {
    const payload = new FormData();

    const photo = content.photo;
    delete content.photo;

    const json = JSON.stringify(content);
    const blob = new Blob([json], {
      type: 'application/json',
    });

    payload.append('photo', photo);
    payload.append('content', blob);

    const { data } = await httpService.patch(productEndPoint + id, payload, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return data;
  },
};

export default productService;
