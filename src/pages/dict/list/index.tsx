import { useEffect } from 'react';
import useBreadCrumb from '@/hooks/useBreadCrumb';

const Page = () => {
  const breadCrumb = useBreadCrumb();
  useEffect(() => {
    breadCrumb?.update({
      list: ['字典管理', '字典列表'],
      title: '字典列表',
    });
  }, []);
  return <span>dict</span>;
};
Page.pageConfig = {
  // 可选，配置准入权限，若不配置则代表所有角色都可以访问
  auth: ['字典列表'],
};
export default Page;
