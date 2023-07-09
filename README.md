## 创建项目

```
1. npm init vite
2. Project name: blog-admin-ui
3. Select a framework: » React
4. Select a variant: » TypeScript + SWC
```

## 安装antd
```
npm i antd

// 安装图标
np i @ant-design/icons
```

## 使用antd

在App.tsx中引入样式文件并尝试使用`Button`组件

```
import './App.css'
import 'antd/dist/antd.css'
import { Button } from 'antd'

function App() {

  return (
    <div>
      <Button type='primary'>11</Button>
    </div>
  )
}

export default App
```

## 组件内样式隔离
当我们使用如下方式引入样式将会导致其他组件内同类名样式出现冲突

```
// Home.scss
.box{
    color:red;
}

// Home.tsx
import './index.scss'
function Home() {
    return <div className="box">
        home
    </div>
}

export default Home
```

解决方案: 使用scssModule来区分

```
// index.module.scss
.box{
    color:red;
}

// 使用scss模块化引入
import styles from './index.module.scss'
function Home() {
    return <div className={ styles.box}>
        home
    </div>
}

export default Home
```

## 路由
### 声明方式的差异性
react-router-dom V5版本中使用的是`Routes`,`Route`标签来声明路由,在需要渲染`根路由`的`顶级组件`中使用`Outlet`占位符。然后在根组件 `main.tsx`中引入`router.tsx`并使用该组件。

```
// App.tsx
import 'antd/dist/antd.css'
import { Outlet } from 'react-router-dom'

function App() {
  return (
    <div>
      <Outlet></Outlet>
    </div>
  )
}

export default App
```

```
// router.tsx
import { BrowserRouter, Routes, Route, Link } from "react-router-dom"
import App from '@/App'
import Home from '@/pages/Home'
import About from '@/pages/About'

const BaseRouter = () => (
    <BrowserRouter>
        <Link to="/home">home</Link>
        <Link to="/about">about</Link>

        <Routes>
            <Route path="/" element={<App />}>
                <Route path="/home" element={<Home />}></Route>
                <Route path="/about" element={<About />}></Route>
            </Route>
        </Routes>
    </BrowserRouter>
)

export default BaseRouter
```

```
// main.tsx
import ReactDOM from 'react-dom/client'
import 'reset-css'
import '@/assets/styles/global.scss'
import Router from '@/route/index'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Router />
  </React.StrictMode>,
)
```

而到了V6版本我们可以使用路由表的方式声明路由然后在`根组件中`使用`BrowserRouter`包裹路由`顶级组件`,哪里引入了路由表组件哪里就是顶级组件。在顶级组件中不在使用`Outlet`占位符的方式而是将路由表作为参数传递给`useRouter`,

```
// router.tsx
import { Navigate } from 'react-router-dom'
import Home from '@/pages/Home'
import About from '@/pages/About'

const routers = [
    {
        path: '/home',
        element: <Navigate to="/home" replace />
    },
    {
        path: '/home',
        element: <Home/>
    },
    {
        path: '/about',
        element: <About/>
    },
]

export default routers
```

```
// main.tsx
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import 'reset-css'
import '@/assets/styles/global.scss'
import App from './App.tsx'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>,
)
```

```
// App.tsx
import { useRoutes } from 'react-router-dom'
import 'antd/dist/antd.css'
import router from '@/router'

function App() {
  const outlet = useRoutes(router)
  return (
    <div>
      {outlet}
    </div>
  )
}

export default App

```

### 重定向

v5版本重定向
```
<Routes>
    {/* 将 / 重定向到home */}
    <Route path="/" element={<Navigate to="/home" replace />} />

    {/* 需要鉴权的路由  */}
    <Route path="/" element={<App />} >
        <Route path="/" element={<Home />}></Route>
        <Route path="/home" element={<Home />}></Route>
        <Route path="/about" element={<About />}></Route>
    </Route>
</Routes>
```

v6使用路由表重定向: 同v5版本一样也是利用`Navigate` 进行重定向

```
import { lazy } from "react"
import { Navigate } from 'react-router-dom'

const routers = [
    {
        path: '/home',
        element: <Navigate to="/home" replace />
    },
]

export default routers

```

### 懒加载
使用react-router-dom'提供的`lazy`函数再配合React的`Suspense`异步加载组件就可以轻松实现懒加载。

> v5和v6大差不差都可以用这种方式,只是路由的表现形式不一样

```
// router.tsx
import { lazy } from "react"
import { Navigate } from 'react-router-dom'
const Home = lazy(() => import('@/pages/Home'))
const About = lazy(() => import('@/pages/About'))

const routers = [
    {
        path: '/',
        element: <Navigate to="/home" replace />
    },
    {
        path: '/home',
        element: <Home />
    },
    {
        path: '/about',
        element: <About />
    },
]

export default routers
```

在`顶级组件`或`根组件`中使用`Suspense`组件包裹

```
<BrowserRouter>
    {/* 异步加载组件 */}
    <Suspense fallback={
        <div style={{ textAlign: "center", marginTop: 200 }}>
            加载中.....
        </div>
    }>
        <App />
    </Suspense>
</BrowserRouter>
```

### 嵌套

需要注意的是element对应的是`标签`不是变量名。

```
import { lazy } from "react"
import { Navigate } from 'react-router-dom'
const BaseLayout = lazy(() => import('@/pages/layout'))
const Home = lazy(() => import('@/pages/Home'))
const About = lazy(() => import('@/pages/About'))

const routers = [
    {
        path: '/',
        element: <Navigate to="/home" replace />
    },
    {
        path: '/',
        element: <BaseLayout />,
        children: [
            {
                path: '/home',
                element: <Home />
            },
            {
                path: '/about',
                element: <About />
            },
        ]
    },

]

export default routers
```

### 路由拦截鉴权
有的时候我们需要使用到路由拦截的功能,那么我们可以利用`高阶组件`将第一级`Router`标签的element用`AuthComponents`高阶组件包裹`根路由`渲染组件。
```
<BrowserRouter>
    <Routes>
        <Route
            path="/"
            element={
            <AuthComponents> //鉴权组件
                <App /> // 根路由渲染组件
            </AuthComponents>
            }
        >
            <Route path="home" element={<Home />}></Route>
            <Route path="about" element={<About />}></Route>
        </Route>
    </Routes>
</BrowserRouter>
```
