import api from '../api/api';

export const userService = {
  getAll: async () => {
    const response = await api.get('/users');
    return response.data;
  },
};
