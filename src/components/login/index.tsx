import React from 'react'
import cn from 'classnames'

import { ReducerContext } from 'reducers'
import useClickAway from 'hooks/useClickAway'

import styles from './index.module.scss'

const { useContext, useRef } = React

const Login = () => {
  const loginRef = useRef<HTMLDivElement | null>(null)
  useClickAway(loginRef, () => onClickAway())

  const [state, dispatch] = useContext(ReducerContext)
  const { showLoginModal } = state.login

  const onClickAway = () => {
    dispatch({ type: 'HIDE_LOGIN' })
  }

  return (
    <div
      className={cn(
        showLoginModal && styles['show-login-wrap'],
        styles['login-wrap']
      )}
      ref={ref => (loginRef.current = ref)}
    >
      111
    </div>
  )
}

export default Login
