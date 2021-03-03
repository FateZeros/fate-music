import React from 'react'

import { ReducerContext } from 'reducers'
import { getUserInfo } from 'utils/auth'

import NormalSetting from './normal-setting'
import MsgSetting from './msg-setting'
import ShortcutKeySetting from './shortcut-key-setting'
import styles from './index.module.scss'

const { useContext, useEffect, useState, Fragment } = React

const Setting = () => {
  const [_, dispatch] = useContext(ReducerContext)

  // 用户是否已登录
  const [userLogged, setUserLogged] = useState(false)

  useEffect(() => {
    const { token } = getUserInfo() as any
    if (token) {
      setUserLogged(true)
    }
    // eslint-disable-next-line
  }, [])

  const handleLogin = () => {
    dispatch({ type: 'SHOW_LOGIN' })
  }

  return (
    <div className={styles.wrap}>
      <div className={styles['login-row']}>
        {userLogged ? (
          <Fragment>
            <div className={styles['login-info1']}>
              <div>账号</div>
            </div>
            <div className={styles['login-info2']}>
              <div className={styles['bind-account-btn']}>绑定账号</div>
              <div className={styles['update-user-btn']}>修改个人信息</div>
            </div>
          </Fragment>
        ) : (
          <Fragment>
            <div className={styles['login-tips']}>登录后，即享高品质音乐</div>
            <div className={styles['login-row-content']}>
              <div className={styles['login-btn']} onClick={handleLogin}>
                登录
              </div>
            </div>
          </Fragment>
        )}
      </div>
      <div className={styles['login-row']}>
        <NormalSetting />
      </div>
      <div className={styles['login-row']}>
        <MsgSetting />
      </div>
      <div className={styles['login-row']}>
        <ShortcutKeySetting />
      </div>
    </div>
  )
}

export default Setting
