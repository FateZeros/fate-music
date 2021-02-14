import React, { useContext } from 'react'
import { useHistory } from 'react-router-dom'

import ROUTES from 'constants/routes'
import { ReducerContext } from 'reducers'
import { getThemeColor } from 'utils/theme'
import * as clientMethods from 'client'

import RouteAction from './route-action'
import Navbar from './navbar'
import SearchInput from './search-input'
import ThemeColorSelect from './theme-color-select'
import styles from './index.module.scss'

const Header = () => {
  const history = useHistory()
  const [, dispatch] = useContext(ReducerContext)

  const handleGoSetting = () => {
    history.push(ROUTES.SETTING)
  }

  const handleShowMessage = () => {
    console.log('show message')
  }

  const handleSelectThemeColor = () => {
    dispatch({
      type: 'SET_COLOR_SELECT_SHOW',
      payload: {
        colorSelectShow: true
      }
    })
  }

  const handleFoldClient = () => {
    clientMethods.sendMinAppMusicPlayer()
  }

  const currentThemeColor = getThemeColor()

  return (
    <div
      className={styles.header}
      style={{ background: `${currentThemeColor}` }}
    >
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
