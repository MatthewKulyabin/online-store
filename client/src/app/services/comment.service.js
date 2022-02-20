import httpService from './http.service';

const commentEndPoint = 'comment/';

const commentService = {
  get: async (productId) => {
    const { data } = await httpService.get(commentEndPoint, {
      params: {
        equalTo: productId,
        orderBy: 'productId',
      },
    });
    return data;
  },
  post: async (payload) => {
    const { data } = await httpService.post(commentEndPoint, payload);
    return data;
  },
  delete: async (commentId) => {
    const { data } = await httpService.delete(commentEndPoint + commentId);
    return data;
  },
};

export default commentService;
