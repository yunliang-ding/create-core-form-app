/* eslint-disable no-console */
import { getLocalStore } from '@/util';

export default {
  // 定义 model 的初始 state
  state: {
    userId: '',
    userName: '',
    orgName: '',
    userAvatar: '',
    roles: [],
    menus: [], // 菜单
  },
  // 定义改变该模型状态的纯函数
  reducers: {
    update(prevState, payload) {
      return {
        ...prevState,
        ...payload,
      };
    },
  },
  // 定义处理该模型副作用的函数
  effects: (dispatch) => ({
    async fetchUserInfo() {
      try {
        const token = getLocalStore('token');
        if (token === undefined) {
          return dispatch.ui.update({
            status: 'login',
          });
        }
        // 解析userInfo
        const userInfo = getLocalStore('userInfo');
        if (userInfo) {
          dispatch.user.update({
            ...userInfo,
          });
          dispatch.ui.update({
            status: 'success',
          });
          localStorage.removeItem('userInfo'); // clear
        } else {
          dispatch.ui.update({
            status: 'error',
          });
        }
      } catch (error) {
        console.error('error -->', error);
        dispatch.ui.update({
          status: 'error',
        });
      }
    },
  }),
};
