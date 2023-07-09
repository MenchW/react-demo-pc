import { Outlet, useLocation } from 'react-router-dom'
import { Breadcrumb, Layout, } from 'antd';
import React from 'react';
import './index.scss'
import MainMenu from '@/components/MainMenu'

const { Header, Content, Sider } = Layout;


const BaseLayout: React.FC = () => {
    const location = useLocation()
    console.log('------', location);

    return (
        <Layout className='base-layout'>
            <Header className="header">
                <div className="logo" />
                {/* <Menu theme="dark" mode="horizontal" defaultSelectedKeys={['2']} items={sideItem} /> */}
            </Header>

            <Layout>
                <Sider width={200} className="site-layout-background">
                    {/* <MainMenu /> */}
                </Sider>

                <Layout style={{ padding: '0 24px 24px' }}>
                    <Breadcrumb style={{ margin: '16px 0' }}>
                        <Breadcrumb.Item>Home</Breadcrumb.Item>
                        <Breadcrumb.Item>List</Breadcrumb.Item>
                        <Breadcrumb.Item>App</Breadcrumb.Item>
                    </Breadcrumb>

                    <Content
                        style={{
                            padding: 24,
                            margin: 0,
                            minHeight: 280,
                        }}
                    >
                        {/* 占位符 */}
                        <Outlet />

                    </Content>
                </Layout>

            </Layout>

        </Layout>
    )
};

export default BaseLayout;
