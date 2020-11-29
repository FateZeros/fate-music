import React from 'react'
import { BrowserRouter } from 'react-router-dom'

import Layout from 'components/layout'

const App = () => {
  return (
    <BrowserRouter>
      <Layout />
    </BrowserRouter>
  )
}

export default App
