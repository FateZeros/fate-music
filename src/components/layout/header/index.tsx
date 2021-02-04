import React from 'react'
import { useHistory } from 'react-router-dom'

import RouteAction from './route-action'
import Navbar from './navbar'
import SearchInput from './search-input'
import ThemeColorSelect from './theme-color-select'
import ROUTES from 'constants/routes'

import styles from './index.module.scss'

const Header = () => {
  const history = useHistory()

  const handleGoSetting = () => {
    history.push(ROUTES.SETTING)
  }

  const handleShowMessage = () => {
    console.log('show message')
  }

  const handleSelectThemeColor = () => {
    console.log('select color')
  }

  const handleFoldClient = () => {
    console.log('fold client')
  }

  return (
    <div className={styles.header}>
      <RouteAction />
      <Navbar />
      <SearchInput />
      <div className={styles['setting-wrap']}>
        <div
          className={styles['setting-icon']}
          onClick={() => handleGoSetting()}
        />
      </div>
      <div className={styles['message-wrap']}>
        <div
          className={styles['message-icon']}
          onClick={() => handleShowMessage()}
        />
        <div className={styles['message-num']}>10</div>
      </div>
      <div className={styles['theme-wrap']}>
        <div
          className={styles['theme-icon']}
          onClick={() => handleSelectThemeColor()}
        />
      </div>
      <div className={styles['fold-wrap']}>
        <div
          className={styles['fold-icon']}
          onClick={() => handleFoldClient()}
        />
      </div>
      <ThemeColorSelect />
    </div>
  )
}

export default Header
