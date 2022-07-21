import { useState, useEffect } from 'react';
import ProLayout, { PageContainer, WaterMark } from '@ant-design/pro-layout';
import { ConfigProvider, Dropdown, Menu, Space, Avatar } from 'antd';
import { MenuUnfoldOutlined, MenuFoldOutlined } from '@ant-design/icons';
import { useHistory, createBrowserHistory } from 'ice';
import zhCN from 'antd/lib/locale/zh_CN';
import store from '@/store';
import { LayoutProps } from '@/types';
import { iconUrl, Icon } from '@/util';
import AppBreadcrumb from '@/components/breadcrumb';
import './index.less';

const { listen } = createBrowserHistory(); // 创建实例，用于监听浏览器会退前进
export default ({ children }) => {
  const history = useHistory();
  const [, breadcrumbDispatcher]: any = store.useModel('breadcrumb');
  const [uiState, uiDispatchers] = store.useModel('ui');
  const [userState] = store.useModel('user'); // 获取 user model
  const { pathname, navTheme, title, layout }: LayoutProps = uiState;
  const setPathName = () => {
    const path = location.hash.substr(1);
    const index = location.hash.substr(1).indexOf('?'); // 去除参数
    uiDispatchers.update({
      pathname: index === -1 ? path : path.substring(0, index),
    });
  };
  useEffect(() => {
    setPathName(); // 同步左侧菜单
    // 监听路径改变，菜单联动
    const removeListener = listen(setPathName);
    return () => {
      // 注销remove
      removeListener();
    };
  }, []);
  const [collapsed, setCollapsed] = useState(false);
  const { userName, userAvatar, orgName, menus } = userState;
  const logout = () => {
    // 退出逻辑
    localStorage.removeItem('token');
    uiDispatchers.update({
      status: 'login', // 跳转登录
    });
  };
  return (
    <ConfigProvider locale={zhCN}>
      <WaterMark
        {...{
          rotate: -20,
          content: userName,
          fontColor: 'rgba(0,0,0,.05)',
          fontSize: 16,
          gapY: 70,
          zIndex: 999,
        }}
      >
        <ProLayout
          iconfontUrl={iconUrl}
          location={{ pathname }}
          collapsed={collapsed}
          fixSiderbar
          title={title}
          logo={<Icon type="icon-zichanguanli" style={{ fontSize: 20 }} />}
          navTheme={navTheme}
          {...layout}
          menuDataRender={() => menus}
          onCollapse={setCollapsed}
          menuItemRender={(item: any, dom) => (
            <a
              onClick={() => {
                history.push(item.path);
                // 这个地方不能依赖于监听，因为监听是原生事件，原生事件中调用hooks会不同步
                setPathName();
                let list = [];
                const bread = item.locale.split('.');
                if (bread.length > 2) {
                  // 二级菜单,设置面包屑
                  list = bread.filter((i) => i !== 'menu').map((menu) => menu);
                }
                breadcrumbDispatcher.update({
                  list,
                  title: item.name,
                });
              }}
            >
              {dom}
            </a>
          )}
          headerContentRender={() => {
            return (
              <div
                onClick={() => setCollapsed(!collapsed)}
                style={{
                  cursor: 'pointer',
                  fontSize: 18,
                }}
              >
                {collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
              </div>
            );
          }}
          rightContentRender={() => (
            <div className="app-right-header">
              <Space>
                <Icon type="icon-yiwenshuoming" style={{ marginRight: 12 }} />
                <Icon type="icon-erweima" style={{ marginRight: 12 }} />
                <Avatar size={32} src={userAvatar} />
                <Dropdown
                  placement="bottom"
                  overlay={
                    <Menu>
                      <Menu.Item
                        onClick={logout}
                        icon={
                          <Icon
                            type="icon-tuichudenglu"
                            style={{ fontSize: 18 }}
                          />
                        }
                      >
                        退出登录
                      </Menu.Item>
                    </Menu>
                  }
                >
                  <a
                    style={{
                      marginLeft: 12,
                      whiteSpace: 'nowrap',
                      fontWeight: 'bold',
                    }}
                  >
                    {orgName} | {userName}
                  </a>
                </Dropdown>
              </Space>
            </div>
          )}
        >
          <PageContainer
            {...AppBreadcrumb.options()}
            breadcrumbRender={() => {
              return <AppBreadcrumb />;
            }}
          >
            {children}
          </PageContainer>
        </ProLayout>
      </WaterMark>
    </ConfigProvider>
  );
};
