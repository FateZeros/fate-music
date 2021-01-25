import React from 'react'
import cn from 'classnames'

import { ReducerContext } from 'reducers'
import useClickAway from 'hooks/useClickAway'

import QrLogin from './qr-login'
import PhoneLogin from './phone-login'
import styles from './index.module.scss'

const { useContext, useRef, useState, useEffect } = React

const Login = () => {
  const loginRef = useRef<HTMLDivElement | null>(null)
  useClickAway(loginRef, () => handleCloseLogin())

  const [state, dispatch] = useContext(ReducerContext)
  const { showLoginModal } = state.login

  const [loginType, setLoginType] = useState<string>(' ')

  useEffect(
    () => {
      if (showLoginModal) {
        setLoginType('phoneLogin')
      }
    },
    [showLoginModal]
  )

  const handleChangeLoginType = () => {
    setLoginType('phoneLogin')
  }

  const handleCloseLogin = () => {
    dispatch({ type: 'HIDE_LOGIN' })
  }

  return (
    showLoginModal && (
      <div
        className={cn(
          showLoginModal && styles['show-login-wrap'],
          styles['login-wrap']
        )}
        ref={ref => (loginRef.current = ref)}
      >
        <div className={styles['login-close-row']}>
          <div className={styles['login-close']} onClick={handleCloseLogin} />
        </div>
        <div className={styles['login-content']}>
          {
            {
              qrLogin: <QrLogin />,
              phoneLogin: <PhoneLogin />
            }[loginType]
          }
        </div>
        <div className={styles['login-type-row']}>
          <div
            className={styles['login-type-change']}
            onClick={() => handleChangeLoginType()}
          >
            {
              {
                qrLogin: '选择其他登录方式'
              }[loginType]
            }
          </div>
        </div>
      </div>
    )
  )
}

export default Login
