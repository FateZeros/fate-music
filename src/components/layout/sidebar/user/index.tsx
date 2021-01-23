import React, { useContext, useEffect, useState } from 'react'

import { ReducerContext } from 'reducers'

import styles from './index.module.scss'
import defaultUser from 'assets/image/default-user.png'

const User = () => {
  const [state, dispatch] = useContext(ReducerContext)
  const { showLoginModal } = state.login

  const [showLoginVisible, setShowLogin] = useState(false)

  const handleShowLogin = () => {
    if (showLoginVisible) {
      dispatch({ type: 'HIDE_LOGIN' })
    } else {
      dispatch({ type: 'SHOW_LOGIN' })
    }
  }

  useEffect(
    () => {
      setShowLogin(showLoginModal)
    },
    [showLoginModal]
  )

  return (
    <div className={styles['user-wrap']}>
      <div className={styles['user-img']}>
        <img src={defaultUser} alt="" />
      </div>
      <div className={styles['user-name']} onClick={handleShowLogin}>
        未登录
      </div>
    </div>
  )
}

export default User
