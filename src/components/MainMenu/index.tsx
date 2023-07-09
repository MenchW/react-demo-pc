import { useLocation, useNavigate } from 'react-router-dom'
import type { MenuProps } from 'antd';
import { Menu } from 'antd';
import React from 'react';
import routers from '@/router';


type MenuItem = Required<MenuProps>['items'][number];


const filterRoute = (routes: any): MenuItem[] => {
    return routes.filter((f: any) => {
        return !f.hidden || (f.hidden && f.children)
    }).map((route: any) => {
        const { label, icon } = route.meta || {};
        let item: any = {
            key: route.path,
            icon: icon || 'default-icon',
            label: label || 'default-label',
        }
        route.children ? item.children = filterRoute(route.children) : ''
        return item
    })

}
// const sideItem: MenuItem[] = filterRoute(routers)
const sideItem: MenuItem[] = [
    {
        key: '/home',
        icon: '',
        label: "home"
    },
    {
        key: '/about',
        icon: '',
        label: "about"
    }
]


const BaseLayoutMenu: React.FC = () => {
    const navigate = useNavigate();
    const location = useLocation()
    console.log('------', location);


    const handleMenuClick: MenuProps['onClick'] = ({ key }) => navigate(key);

    return (
        <Menu
            mode="inline"
            // defaultSelectedKeys={['/home']}
            // defaultOpenKeys={['/']}
            style={{ height: '100%', borderRight: 0 }}
            items={sideItem}
            onClick={handleMenuClick}
        />
    )
};

export default BaseLayoutMenu;
