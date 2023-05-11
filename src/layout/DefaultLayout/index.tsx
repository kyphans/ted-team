import React, { useState } from 'react';
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  QuestionCircleOutlined,
  HomeOutlined,
  UsergroupAddOutlined,
  LogoutOutlined,
} from '@ant-design/icons';
import { Layout, Menu, Grid, theme, Avatar, Image } from 'antd';
import './styles.scss';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

interface MenuItem {
  key: string;
  icon: JSX.Element;
  label: string;
  path: string;
  onClick?: () => void;
}

const { Header, Sider, Content } = Layout;

const DefaultLayout = () => {
  const [collapsed, setCollapsed] = useState(false);
  const navigate = useNavigate();
  const { logout: authLogout } = useAuth();

  const itemsMenu: MenuItem[] = [
    {
      key: 'home',
      icon: <HomeOutlined />,
      label: 'Home',
      path: '/home',
    },
    {
      key: 'members',
      icon: <UsergroupAddOutlined />,
      label: 'Members',
      path: '/members',
    },
    {
      key: 'test',
      icon: <QuestionCircleOutlined />,
      label: 'test',
      path: '/test',
    },
    {
      key: 'logout',
      icon: <LogoutOutlined />,
      label: 'logout',
      path: '/logout',
      onClick: () => authLogout(),
    },
  ];

  // Get theme UI
  const {
    token: { colorBgContainer },
  } = theme.useToken();

  // Custom Sider for mobile
  const { lg } = Grid.useBreakpoint();
  const styleSider = lg ? 'unset' : 'fixed';
  const isScreenLg = lg ?? true; // check nullish for lg
  const triggerBtnSider = isScreenLg ? null : false;
  const onBreakpoint = (broken: boolean) => {
    setCollapsed(broken);
  };

  // Get location path and set selectedKey for Menu
  const location = useLocation();
  const [selectedKey, setSelectedKey] = useState(() => {
    const item = itemsMenu.find((_item) => location.pathname.startsWith(_item.path));
    return item?.key || 'home';
  });

  const handleMenuItemClick = ({ key }: { key: string }) => {
    const { path } = itemsMenu.find((item) => item.key === key) || {};
    if (path && path !== location.pathname) {
      navigate(path);
      setSelectedKey(key);
    }
  };

  return (
    <Layout className="default-layout">
      <Sider
        className="default-layout-sider h-screen"
        style={{ position: styleSider }}
        trigger={triggerBtnSider}
        collapsible
        collapsed={collapsed}
        collapsedWidth={0}
        breakpoint={'lg'}
        onBreakpoint={onBreakpoint}
        onCollapse={(value) => setCollapsed(value)}
      >
        <div className="logo">
          <span>TED TEAM</span>
        </div>
        <Menu theme="dark" mode="inline" selectedKeys={[selectedKey]} onClick={handleMenuItemClick} items={itemsMenu} />
      </Sider>
      <Layout className="default-layout-site-layout">
        <Header style={{ padding: 0, background: colorBgContainer }}>
          <div className="flex justify-end m-3 mr-5">
            <Avatar
              size={44}
              // icon={
              //   <Image width={64} src="https://drive.google.com/uc?export=view&id=1Qy7R3YjqIwE3ZInTwYNCtL_Fc9CRRwfz" />
              // }
            />
          </div>
          {
            // Only Show trigger Menu button for large screens
            isScreenLg &&
              React.createElement(collapsed ? MenuUnfoldOutlined : MenuFoldOutlined, {
                className: 'trigger',
                onClick: () => setCollapsed(!collapsed),
              })
          }
        </Header>
        <Content className="default-layout-content" style={{ background: 'rgb(231 231 231)' }}>
          <Outlet />
        </Content>
      </Layout>
    </Layout>
  );
};

export default DefaultLayout;
