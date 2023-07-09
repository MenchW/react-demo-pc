import { lazy } from "react"
import { Navigate } from 'react-router-dom'
// const BaseLayout = lazy(() => import('@/pages/layout'))
import BaseLayout from '@/pages/layout'
const Home = lazy(() => import('@/pages/Home'))
const About = lazy(() => import('@/pages/About'))

const routers = [
    {
        path: '/',
        element: <Navigate to="/home" replace />,
        hidden: true,
    },
    {
        path: '/',
        element: <BaseLayout />,
        hidden: true,
        meta: {
            icon: 'UserOutlined',
            label: '主页'
        },
        children: [
            {
                path: '/home',
                element: <Home />,
                meta: {
                    icon: 'UserOutlined',
                    label: '主页'
                }
            },
            {
                path: '/about',
                element: <About />,
                meta: {
                    icon: 'UserOutlined',
                    label: 'about'
                }
            },
        ]
    },
    // 404 页面
    {
        path: '*',
        element: <Navigate to="/home" replace />,
        hidden: true,
    },

]

export default routers
