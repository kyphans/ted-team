import React, { useState } from 'react';
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  QuestionCircleOutlined,
  HomeOutlined,
  UsergroupAddOutlined,
  LogoutOutlined,
  SettingOutlined,
  IdcardOutlined,
  LinkOutlined,
} from '@ant-design/icons';
import { Layout, Menu, Grid, theme, Avatar, Image } from 'antd';
import './styles.scss';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { tw } from '../../common/utils/classUtil';
import { UserLocalStorageDataType } from '../../types/user.types';

interface MenuItem {
  key: string;
  icon: JSX.Element;
  label: string;
  path: string;
  onClick?: () => void;
}

const { Header, Sider, Content, Footer } = Layout;

const DefaultLayout = () => {
  const [collapsed, setCollapsed] = useState(false);
  const navigate = useNavigate();
  const { logout: authLogout, user } = useAuth();
  const userData: UserLocalStorageDataType = !!user && JSON.parse(user);

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
      key: 'collaborators',
      icon: <UsergroupAddOutlined />,
      label: 'Collaborators',
      path: '/collaborators',
    },
    {
      key: 'orgchart',
      icon: <IdcardOutlined />,
      label: 'Org Chart',
      path: '/orgchart',
    },
    {
      key: 'url-shortener',
      icon: <LinkOutlined />,
      label: 'URL Shortener',
      path: '/url-shortener',
    },
    {
      key: 'test',
      icon: <QuestionCircleOutlined />,
      label: 'test',
      path: '/test',
    },
    {
      key: 'setting',
      icon: <SettingOutlined />,
      label: 'Setting',
      path: '/setting',
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
  const triggerBtnSider = isScreenLg ? null : (
    <img className="animate-ring" style={{ width: '50px' }} src="/favicon.ico" alt="SVG Image" />
  );
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
        className={tw(`
          [&_.ant-layout-sider-zero-width-trigger]:bg-white
          [&_.ant-layout-sider-zero-width-trigger]:w-[85px]
          [&_.ant-layout-sider-zero-width-trigger]:h-[60px]
          [&_.ant-layout-sider-zero-width-trigger]:end-[-85px]
          [&_.ant-layout-sider-zero-width-trigger]:top-[2px]
          [&_.ant-layout-sider-zero-width-trigger]:cursor-none
          [&_.ant-layout-sider-zero-width-trigger]:after:relative
          default-layout-sider h-screen`)}
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
          <span>{import.meta.env.VITE_APP_TITLE || 'MyApp'}</span>
        </div>
        <Menu theme="dark" mode="inline" selectedKeys={[selectedKey]} onClick={handleMenuItemClick} items={itemsMenu} />
      </Sider>
      <Layout className="default-layout-site-layout bg-[#eaecf1]">
        <Header style={{ padding: 0, background: colorBgContainer }}>
          <div className="flex justify-end  align-middle mr-5">
            <div>
              <Avatar
                className="[&_.ant-image-mask-info]:hidden"
                size={44}
                icon={<Image width={44} src={`${import.meta.env.VITE_API_URL}${userData?.info?.avatar}`} />}
              />
            </div>
            {isScreenLg && <div className="px-2 font-medium">{userData?.info?.fullName}</div>}
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
        <Content className="default-layout-content bg-[#eaecf1]">
          <Outlet />
          <Footer style={{ padding: '20px 0 0 0', background: '#eaecf1', textAlign: 'center', color: '#777' }}>
            Copyright©tedteam.com. All Rights Reserved
          </Footer>
        </Content>
      </Layout>
    </Layout>
  );
};

export default DefaultLayout;
