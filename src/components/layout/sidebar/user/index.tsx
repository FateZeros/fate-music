import React from 'react'

import { ReducerContext } from 'reducers'
import { getUserInfo } from 'utils/auth'

import styles from './index.module.scss'
import defaultUser from 'assets/image/default-user.png'

const { useContext, useEffect, useState } = React

const User = () => {
  const [state, dispatch] = useContext(ReducerContext)
  const { showLoginModal, token } = state.login

  const [showLoginVisible, setShowLogin] = useState(false)
  // 用户是否已登录
  const [userLogged, setUserLogged] = useState(false)
  const userInfo: any = getUserInfo() || {}

  const handleShowLogin = () => {
    if (userLogged) {
      dispatch({ type: 'SHOW_USER_INFO' })
    } else {
      if (showLoginVisible) {
        dispatch({ type: 'HIDE_LOGIN' })
      } else {
        dispatch({ type: 'SHOW_LOGIN' })
      }
    }
  }

  useEffect(
    () => {
      setShowLogin(showLoginModal)
      if (token || userInfo.token) {
        setUserLogged(true)
      }
    },
    [showLoginModal, token]
  )

  return (
    <div className={styles['user-wrap']}>
      <div className={styles['user-img']}>
        <img
          src={userLogged ? userInfo.profile.avatarUrl : defaultUser}
          alt=""
        />
      </div>
      <div className={styles['user-name']} onClick={handleShowLogin}>
        {userLogged ? userInfo.profile.nickname : '未登录'}
      </div>
    </div>
  )
}

export default User
