//@ts-check
import { Layout, Menu, Breadcrumb } from 'antd';
import {
    DesktopOutlined,
    HomeOutlined,
    FileOutlined,
    TeamOutlined,
    UserOutlined,
    QuestionCircleOutlined
} from '@ant-design/icons';
import React, { useEffect, useState } from 'react';
import { Outlet, Route, Routes, useLocation, useNavigate } from 'react-router-dom';
import { PrivateRoute } from './Common/PrivateRoute';
import Questions from './Questions';
import Answers from './Answers';
import { Box } from '@chakra-ui/react';

const { Header, Content, Footer, Sider } = Layout;
const { SubMenu } = Menu;

const ROUTE_MAP = {
    '': '1',
    '/': '1',
    '/questions': '2'
};

const Home = ({}) => {
    const [collapsed, setCollapse] = useState(false);
    const { pathname } = useLocation();
    const [defaultSelected, setDefaultSelected] = useState(['1']);
    const navigate = useNavigate();

    useEffect(() => {
        setDefaultSelected([ROUTE_MAP[pathname]]);
        return () => {};
    }, []);

    const onCollapse = (collapsed) => {
        setCollapse(collapsed);
    };
    return (
        <Layout style={{ minHeight: '100vh' }}>
            <Sider collapsible collapsed={collapsed} onCollapse={onCollapse}>
                <div className="logo" />
                <Menu
                    theme="dark"
                    defaultSelectedKeys={defaultSelected}
                    selectedKeys={defaultSelected}
                    onSelect={(info) => {
                        setDefaultSelected(info.selectedKeys);
                    }}
                    mode="inline">
                    <Menu.Item key="1" icon={<HomeOutlined />} onClick={() => navigate('/')}>
                        Home
                    </Menu.Item>
                    <Menu.Item
                        key="2"
                        icon={<QuestionCircleOutlined />}
                        onClick={() => navigate('/questions')}>
                        Questions
                    </Menu.Item>
                    <SubMenu key="sub1" icon={<UserOutlined />} title="User">
                        <Menu.Item key="3">Profile</Menu.Item>
                        <Menu.Item key="4">Settings</Menu.Item>
                        <Menu.Item key="5" onClick={()=> {
                             localStorage.removeItem('user');
                             navigate('/login');
                        }}>Logout</Menu.Item>
                    </SubMenu>
                </Menu>
            </Sider>
            <Layout className="site-layout">
                <Header className="site-layout-background" style={{ padding: 0 }} />
                <Content style={{ margin: '0 16px' }}>
                    {/* <Breadcrumb style={{ margin: '16px 0' }}>
                        <Breadcrumb.Item>User</Breadcrumb.Item>
                        <Breadcrumb.Item>Bill</Breadcrumb.Item>
                    </Breadcrumb> */}
                    <Box width={"full"} height={"full"} display={"flex"}>
                        <Outlet />
                    </Box>
                </Content>
            </Layout>
        </Layout>
    );
};

export default Home;
