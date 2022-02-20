import httpService from './http.service';
import localStorageService from './localStorage.service';

const userEndpoint = 'user/';

const userService = {
  get: async () => {
    const { data } = await httpService.get(userEndpoint);
    return data;
  },
  // create: async (payload) => {
  //   const { data } = await httpService.put(userEndpoint + payload._id, payload);
  //   return data;
  // },
  // getCurrentUser: async () => {
  //   const { data } = await httpService.get(
  //     userEndpoint + localStorageService.getUserId()
  //   );
  //   return data;
  // },
  update: async (content) => {
    const payload = new FormData();

    const photo = content.photo;
    delete content.photo;

    const json = JSON.stringify(content);
    const blob = new Blob([json], {
      type: 'application/json',
    });

    payload.append('photo', photo);
    payload.append('content', blob);

    const { data } = await httpService.patch(
      userEndpoint + localStorageService.getUserId(),
      payload,
      {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      }
    );
    return data;
  },
};
export default userService;
