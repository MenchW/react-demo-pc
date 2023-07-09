import { useRoutes } from 'react-router-dom'
import { Suspense } from 'react'
import 'antd/dist/antd.css'
import router from '@/router'

function App() {
  const outlet = useRoutes(router)

  return (
    <>
      <Suspense fallback={
        <div style={{ textAlign: "center", marginTop: 200 }}>
          loading.....
        </div>
      }>
        {outlet}
      </Suspense>
    </>
  )
}

export default App
