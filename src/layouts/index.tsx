import { useEffect } from 'react';
import Layout from './layout';
import Login from '@/components/login';
import Loading from '@/components/loading';
import Error from '@/components/error';
import NoPermissions from '@/pages/403';
import store from '@/store';

export default (props: any) => {
  const [, userDispatchers] = store.useModel('user');
  const [uiState] = store.useModel('ui');
  useEffect(() => {
    userDispatchers.fetchUserInfo();
  }, []);
  if (uiState.status === 'loading') {
    return <Loading />;
  } else if (uiState.status.startsWith('login')) {
    return <Login />;
  } else if (uiState.status === 'error') {
    return <Error />;
  } else if (uiState.status === 'noPermissions') {
    return <NoPermissions />;
  }
  return <Layout {...props} />;
};
