import React from 'react'
import Header from './header'
import Sidebar from './sidebar'

import MusicPlayer from 'components/music-player'
import LoginModal from 'components/login'

import styles from './index.module.scss'

const Layout: React.FC = ({ children }) => {
  return (
    <div className={styles['fate-music']}>
      <Header />
      <div className={styles['music-container']}>
        <Sidebar />
        <div className={styles['music-content']}>{children}</div>
      </div>
      <MusicPlayer />
      <LoginModal />
    </div>
  )
}

export default Layout
