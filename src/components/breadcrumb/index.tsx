import { Breadcrumb } from 'antd';
import store from '@/store';

const AppBreadcrumb: any = () => {
  const [breadcrumb]: any = store.useModel('breadcrumb');
  return (
    <Breadcrumb>
      {breadcrumb.list.map((item: any) => {
        return <Breadcrumb.Item key={item}>{item}</Breadcrumb.Item>;
      })}
    </Breadcrumb>
  );
};

AppBreadcrumb.options = () => {
  const [breadcrumb]: any = store.useModel('breadcrumb');
  return breadcrumb;
};
export default AppBreadcrumb;
