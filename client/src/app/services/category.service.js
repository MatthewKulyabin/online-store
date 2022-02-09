import httpService from './http.service';

const categoryEndPoint = 'category/';

const categoryService = {
  get: async () => {
    const { data } = await httpService.get(categoryEndPoint);
    return data;
  },
};

export default categoryService;
