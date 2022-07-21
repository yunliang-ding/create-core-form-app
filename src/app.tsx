/* eslint-disable no-console */
/* eslint-disable no-param-reassign */
/* eslint-disable prefer-promise-reject-errors */
import { runApp, config, request } from 'ice';
import { notification } from 'antd';
import NoAuthority from '@/pages/403';
import ErrorBoundary from '@/pages/error-boundary';

const appConfig: any = {
  request: {
    withFullResponse: false,
    baseURL: config.baseURL,
    timeout: 1000 * 60,
    withCredentials: true,
    maxContentLength: 5000,
    validateStatus(status) {
      return status >= 200 && status < 510;
    },
    // 拦截器
    interceptors: {
      request: {
        onConfig: (requestConfig) => {
          requestConfig.headers = {
            token: '123abc',
          };
          return requestConfig;
        },
        onError: (error) => {
          return Promise.reject({
            returnCode: '500',
            returnMsg: error,
            returnData: {},
          });
        },
      },
      response: {
        onConfig: (response) => {
          // 对响应数据做点什么
          const {
            data: { code, msg },
          } = response;
          if (code === 200) {
            return response;
          }
          if ([10002].includes(code)) {
            // 退出逻辑
            localStorage.removeItem('token');
            setTimeout(() => {
              location.reload();
            }, 300);
          } else if (code !== 200) {
            notification.error({
              message: '提示',
              description: msg || '接口异常',
            });
          }
          return response;
        },
        onError: (error) => {
          // 对响应错误做点什么
          return Promise.reject({
            returnCode: '500',
            returnMsg: error,
            returnData: {},
          });
        },
      },
    },
  },
  app: {
    rootId: 'ice-container',
    spmA: 'a21gdo',
    // 是否开启 ErrorBoundary，默认为 false
    errorBoundary: true,
    // 自定义错误边界的 fallback UI
    ErrorBoundaryFallback: (props) => <ErrorBoundary {...props} />,
    // 自定义错误的处理事件
    onErrorBoundaryHander: (error: Error, componentStack: string) => {
      console.log('onErrorBoundaryHander', error, componentStack);
    },
    // 获取权限
    getInitialData: async () => {
      const auth = {}; // 权限集合
      const recursion = (menuList, auths) => {
        menuList?.forEach((menu) => {
          if (menu.children?.length > 0) {
            recursion(menu.children, auths);
          } else {
            auths[menu.name] = true;
          }
        });
      };
      try {
        const { code, data } = await request('/api/userInfo');
        if (code === 200) {
          recursion(data.menus, auth);
          localStorage.setItem('userInfo', JSON.stringify(data));
        }
      } catch (error) {
        console.log(error);
      }
      return {
        auth,
      };
    },
  },
  auth: {
    NoAuthFallback: <NoAuthority />,
  },
  router: {
    type: 'hash',
    fallback: <div>loading...</div>,
  },
};
runApp(appConfig);
