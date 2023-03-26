import React, { useState, ReactNode, useEffect } from 'react';
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  UploadOutlined,
  HomeOutlined,
  UsergroupAddOutlined,
} from '@ant-design/icons';
import { Layout, Menu, Grid, theme } from 'antd';
import './styles.scss';
import { Link, useLocation, useNavigate } from 'react-router-dom';

interface LayoutProps {
  children: ReactNode;
}
interface MenuItem {
  key: string;
  icon: JSX.Element;
  label: string;
  path: string;
}

const { Header, Sider, Content } = Layout;
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
];

const DefaultLayout = ({ children }: LayoutProps) => {
  const [collapsed, setCollapsed] = useState(false);
  const navigate = useNavigate();

  // get path and set selectedKey for Menu
  const location = useLocation();
  const [selectedKey, setSelectedKey] = useState(
    itemsMenu.find((_item) => location.pathname.startsWith(_item.path))?.key || 'home',
  );
  useEffect(() => {
    const item = itemsMenu.find((_item) => location.pathname.startsWith(_item.path));
    const key = item ? item.key : 'home';
    setSelectedKey(key);
  }, [location]);

  const {
    token: { colorBgContainer },
  } = theme.useToken();

  // Custom Sider for mobile
  const { lg } = Grid.useBreakpoint();
  const styleSider = lg ? 'unset' : 'absolute';
  const isScreenLg = lg ?? true; // check nullish for lg
  const triggerBtnSider = isScreenLg ? null : false;
  const onBreakpoint = (broken: boolean) => {
    setCollapsed(broken);
  };

  const handleMenuClick = ({ key }: { key: string }): void => {
    const { path } = itemsMenu.find((item) => item.key === key) || {};
    if (path) {
      navigate(path);
    }
  };

  return (
    <Layout className="default-layout">
      <Sider
        className="default-layout-sider"
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
        <Menu theme="dark" mode="inline" selectedKeys={[selectedKey]} onClick={handleMenuClick} items={itemsMenu} />
      </Sider>
      <Layout className="site-layout">
        <Header style={{ padding: 0, background: colorBgContainer }}>
          {isScreenLg &&
            React.createElement(collapsed ? MenuUnfoldOutlined : MenuFoldOutlined, {
              className: 'trigger',
              onClick: () => setCollapsed(!collapsed),
            })}
        </Header>
        <Content className="default-layout-content" style={{ background: colorBgContainer }}>
          {children}
        </Content>
      </Layout>
    </Layout>
  );
};

export default DefaultLayout;
