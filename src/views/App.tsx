import React from 'react'
import { BrowserRouter } from 'react-router-dom'

const App = () => {
  return (
    <BrowserRouter>
      {process.env.NODE_ENV}
      {process.env.REACT_APP_NODE_ENV}
    </BrowserRouter>
  )
}

export default App
