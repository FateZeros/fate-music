import React from 'react'
import cn from 'classnames'

import * as loginApis from 'apis/login'
import useAsyncRequest from 'hooks/useAsyncRequest'
import { ReducerContext } from 'reducers'
import useClickAway from 'hooks/useClickAway'

import styles from './index.module.scss'

const { useEffect, useContext, useRef } = React
/**
 * 登录后 - 个人信息展示
 */
const UserInfo = () => {
  const [state, dispatch] = useContext(ReducerContext)
  const { showUserInfoModal } = state.login

  const userInfoRef = useRef<HTMLDivElement | null>(null)
  useClickAway(userInfoRef, () => dispatch({ type: 'HIDE_USER_INFO' }))

  const [, logout] = useAsyncRequest(loginApis.logout)

  const handleLogout = async () => {
    const res = await logout()
    console.log(res, '退出登录')
  }

  return (
    <div
      className={cn(showUserInfoModal && styles['show-user-info'], styles.wrap)}
      ref={ref => (userInfoRef.current = ref)}
    >
      <div className={styles['info-circle']}>1</div>
      <div className={styles['info-center']}>2</div>
      <div className={styles['info-self']}>3</div>
      <div className={styles['login-out']}>
        <div className={styles['info-row']}>
          <div className={styles['info-row-title']} onClick={handleLogout}>
            退出登录
          </div>
        </div>
      </div>
    </div>
  )
}

export default UserInfo
