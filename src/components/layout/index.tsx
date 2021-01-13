import React from 'react'
import Header from './header'
import Sidebar from './sidebar'

import styles from './index.module.scss'

const Layout: React.FC = ({ children }) => {
  return (
    <div>
      <Header />
      <div className={styles['music-container']}>
        <Sidebar />
        <div className={styles['music-content']}>{children}</div>
      </div>
    </div>
  )
}

export default Layout
