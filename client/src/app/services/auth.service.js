import httpService from './http.service';
import { getRefreshToken } from './localStorage.service';

const authEndPoint = 'auth/';

const authService = {
  register: async (payload) => {
    const { data } = await httpService.post(authEndPoint + 'signUp', payload);
    return data;
  },
  login: async ({ email, password }) => {
    const { data } = await httpService.post(
      authEndPoint + 'signInWithPassword',
      {
        email,
        password,
        returnSecureToken: true,
      }
    );
    return data;
  },
  refreshToken: async () => {
    const { data } = await httpService.post(authEndPoint + 'token', {
      grant_type: 'refresh_token',
      refresh_token: getRefreshToken(),
    });
    return data;
  },
};

export default authService;
