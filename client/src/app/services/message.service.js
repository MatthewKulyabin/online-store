import httpService from './http.service';

const messageEndPoint = 'message/';

const messageService = {
  get: async () => {
    const { data } = await httpService.get(messageEndPoint);
    return data;
  },

  post: async (payload) => {
    const { data } = await httpService.post(messageEndPoint, payload);
    return data;
  },

  delete: async (id) => {
    const { data } = await httpService.delete(messageEndPoint + id);
    return data;
  },
};

export default messageService;
