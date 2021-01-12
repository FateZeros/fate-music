import React, { Suspense } from 'react'
import { BrowserRouter, Switch } from 'react-router-dom'

import Layout from 'components/layout'

const App = () => {
  return (
    <BrowserRouter>
      <Layout>
        <Suspense fallback={<div>加载中...</div>}>
          <Switch />
        </Suspense>
      </Layout>
    </BrowserRouter>
  )
}

export default App
