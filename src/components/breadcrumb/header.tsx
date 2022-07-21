import store from '@/store';

export default () => {
  const [breadcrumb]: any = store.useModel('breadcrumb');
  return breadcrumb.title
    ? {
        title: breadcrumb.title,
      }
    : {};
};
