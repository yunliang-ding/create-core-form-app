export default {
  // 定义 model 的初始 state
  state: {
    list: [], // 面包屑
    title: '', // 大标题
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
};
