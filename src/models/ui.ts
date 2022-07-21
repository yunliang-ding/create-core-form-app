import { LayoutProps } from '@/types';

const initState: LayoutProps = {
  title: 'CoreForm-App',
  navTheme: 'light',
  status: 'loading',
  pathname: '',
  // 一级的菜单是位于顶部
  layout: {
    splitMenus: true,
    layout: 'mix',
    fixedHeader: true,
    // collapsedButtonRender: false,
  },
};

export default {
  // 定义 model 的初始 state
  state: {
    ...initState,
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
