import store from '@/store';
import { PageContainerProps } from '@ant-design/pro-layout';
import { useEffect } from 'react';

interface UseBreadCrumbProps extends PageContainerProps {
  list?: any[];
  tabList?: any;
  footer?: any;
}

export default (
  // 指定清空的属性、默认全部清空
  destroyProps: UseBreadCrumbProps = {
    tabList: [],
    title: '',
    list: [],
    footer: '',
    extra: [],
  },
) => {
  const [, breadcrumbDispatcher] = store.useModel('breadcrumb');
  useEffect(() => {
    return () => {
      breadcrumbDispatcher.update(destroyProps);
    };
  }, []);
  return {
    update: (options: UseBreadCrumbProps) => {
      breadcrumbDispatcher.update(options);
    },
  };
};
