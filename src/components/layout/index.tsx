import React from 'react'
import Header from './header'
import Sidebar from './sidebar'
import MusicPlayer from 'components/music-player'

import styles from './index.module.scss'

const Layout: React.FC = ({ children }) => {
  return (
    <div>
      <Header />
      <div className={styles['music-container']}>
        <Sidebar />
        <div className={styles['music-content']}>{children}</div>
      </div>
      <MusicPlayer />
    </div>
  )
}

export default Layout
