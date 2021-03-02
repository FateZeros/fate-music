import React from 'react'

import { ReducerContext } from 'reducers'
// import { getUserInfo } from 'utils/auth'

import styles from './index.module.scss'

const { useContext } = React

const Setting = () => {
  const [_, dispatch] = useContext(ReducerContext)

  const handleLogin = () => {
    dispatch({ type: 'SHOW_LOGIN' })
  }

  return (
    <div className={styles.wrap}>
      <div className={styles['login-row']}>
        <div className={styles['login-tips']}>登录后，即享高品质音乐</div>
        <div className={styles['login-row-content']}>
          <div className={styles['login-btn']} onClick={handleLogin}>
            登录
          </div>
        </div>
      </div>
    </div>
  )
}

export default Setting
