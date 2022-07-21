/* eslint-disable no-param-reassign */
/** 默认展示接口下发的第一个菜单  */
import { Redirect } from 'ice';
import NoAuthority from '@/pages/403';
import store from '@/store';

// 查找指定key
export const recursionFind = (menus: any, path: string) => {
  const targetMenu: any = { menu: {} };
  recursionLoopFind(menus, path, targetMenu);
  return targetMenu.menu;
};

// 递归查找指定key
export const recursionLoopFind = (menus: any, path: string, currentMenu) => {
  for (let i = 0; i < menus.length; i++) {
    const item = menus[i];
    if (item.path === path) {
      currentMenu.menu = item;
      break;
    } else if (item.children) {
      recursionLoopFind(item.children, path, currentMenu);
    }
  }
};

export default () => (props) => {
  const [userState] = store.useModel('user');
  const { path } = props.match;
  const { children } = recursionFind(userState.menus, path);
  if (children?.[0]) {
    return <Redirect to={children[0].path} />;
  } else {
    return <NoAuthority />;
  }
};
