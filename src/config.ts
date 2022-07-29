export default {
  mock: {
    baseURL: `http://localhost:${process.env.SERVER_PORT}`,
  },
  local: {
    baseURL: 'https://3333-yunliangdin-createcoref-88606m1k583.ws-us54.gitpod.io',
  },
  daily: {
    baseURL: location.origin,
  },
  prod: {
    baseURL: location.origin,
  },
};