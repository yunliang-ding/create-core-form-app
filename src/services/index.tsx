import { request } from 'ice';

export const userInfo = () => {
  return request.get('api/userInfo');
};
